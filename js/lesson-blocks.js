// Lesson Interactive Blocks Engine
// Small in-lesson exercises (checkpoints, fill-in-the-blank challenges, predicts,
// ordering, matching, guided steps, prompt labs) rendered inside a "Lab Bench"
// frame. Completion persists to localStorage and awards XP.
//
// Block config schema (authored in course-enrichment.js):
//   { type, id, title?, ...typeSpecificFields }
// Types:
//   checkpoint  : { question, options[], answer, explanation }
//   predict     : { intro?, code, question, options[], answer, explanation }
//   challenge   : { intro?, code (with ___ gaps), blanks: [{a: answer, ci?}], labels?, hints[], success }
//   sort        : { prompt, items: [string], correct: [int indices in right order] }
//   match       : { intro?, pairs: [[left, right]] }
//   steps       : { intro?, steps: [{ t, d }] }
//   promptLab   : { vague, task?, keywords: [..], minFound?, model }

(function () {
  "use strict";

  const STORE_KEY = "ai_course_blocks_done";
  const XP_BY_TYPE = { checkpoint: 10, predict: 10, challenge: 20, sort: 15, match: 15, steps: 15, promptLab: 20 };

  function loadDone() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); }
    catch { return []; }
  }

  const done = new Set(loadDone());

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function announce() {
    document.dispatchEvent(new CustomEvent("lessonblocks:changed", {
      detail: { xp: getXP(), total: getTotalXP(), count: done.size }
    }));
  }

  // Registry of all authored blocks, built once from enrichment data so the
  // nav XP chip can show totals before any stage is mounted.
  let registry = {}; // id -> xp
  function buildRegistry() {
    registry = {};
    const E = window.COURSE_ENRICHMENT;
    if (!E || !E.blocksByLesson) return;
    Object.values(E.blocksByLesson).forEach(blocks => {
      (blocks || []).forEach(b => {
        if (b && b.id) registry[b.id] = b.xp || XP_BY_TYPE[b.type] || 10;
      });
    });
  }

  function getXP() {
    return Array.from(done).reduce((sum, id) => sum + (registry[id] || 10), 0);
  }
  function getTotalXP() {
    return Object.values(registry).reduce((a, b) => a + b, 0);
  }
  function getCount() { return { done: done.size, total: Object.keys(registry).length }; }

  function markDone(id) {
    if (done.has(id)) return;
    done.add(id);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(Array.from(done))); } catch {}
    announce();
  }

  // ---------- shared frame ----------
  function frame(block, kindLabel, bodyHtml) {
    const solved = done.has(block.id);
    return `
      <div class="lab-bench ${solved ? "solved" : ""}" data-block-id="${esc(block.id)}" data-state="${solved ? "solved" : "idle"}">
        <div class="bench-top">
          <span class="bench-led" aria-hidden="true"></span>
          <span class="bench-kind">${esc(kindLabel)}</span>
          <span class="bench-title">${esc(block.title || "")}</span>
          <span class="bench-xp">+${block.xp || XP_BY_TYPE[block.type] || 10} XP</span>
        </div>
        <div class="bench-body">${bodyHtml}</div>
      </div>
    `;
  }

  function solve(bench, block) {
    markDone(block.id);
    bench.classList.add("solved");
    bench.setAttribute("data-state", "solved");
    const banner = bench.querySelector(".bench-done-banner");
    if (banner) banner.hidden = false;
  }

  // ---------- multiple choice core (checkpoint + predict) ----------
  function mcHTML(block, opts) {
    const q = opts.question;
    const pre = opts.pre || "";
    return `
      ${pre}
      <p class="bench-q">${esc(q)}</p>
      <div class="mc-options">
        ${block.options.map((opt, i) => `
          <button type="button" class="mc-option" data-i="${i}"><span class="mc-letter">${String.fromCharCode(65 + i)}</span><span>${esc(opt)}</span></button>
        `).join("")}
      </div>
      <div class="bench-explain" hidden></div>
      <div class="bench-done-banner" hidden>Solved. Nicely done.</div>
    `;
  }

  function wireMC(scope, bench, block, explainPrefix) {
    const explain = bench.querySelector(".bench-explain");
    if (done.has(block.id)) {
      // restore solved view
      bench.querySelectorAll(".mc-option").forEach(btn => {
        btn.disabled = true;
        if (Number(btn.dataset.i) === block.answer) btn.classList.add("correct");
      });
      explain.hidden = false;
      explain.innerHTML = `<strong>${explainPrefix}</strong> ${esc(block.explanation)}`;
      return;
    }
    bench.querySelectorAll(".mc-option").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        if (i === block.answer) {
          btn.classList.add("correct");
          bench.querySelectorAll(".mc-option").forEach(b => { b.disabled = true; });
          explain.hidden = false;
          explain.innerHTML = `<strong>Correct.</strong> ${esc(block.explanation)}`;
          solve(bench, block);
        } else {
          btn.classList.add("wrong");
          btn.disabled = true;
          explain.hidden = false;
          explain.innerHTML = "<strong>Not quite.</strong> This one is eliminated. Try again.";
        }
      });
    });
  }

  function renderCheckpoint(block) {
    return frame(block, "Checkpoint", mcHTML(block, { question: block.question }));
  }

  function wireCheckpoint(bench, block) {
    wireMC(null, bench, block, "Correct.");
  }

  function renderPredict(block) {
    const codePre = `
      <pre class="bench-code"><code>${esc(block.code)}</code></pre>
    `;
    return frame(block, "Predict the output", mcHTML(block, { question: block.question, pre: (block.intro ? `<p class="bench-intro">${esc(block.intro)}</p>` : "") + codePre }));
  }

  function wirePredict(bench, block) {
    wireMC(null, bench, block, "Correct.");
  }

  // ---------- fill-in-the-blank challenge ----------
  function renderChallenge(block) {
    // Split code on ___ and interleave inputs
    const parts = String(block.code).split("___");
    let html = "";
    parts.forEach((seg, i) => {
      html += esc(seg);
      if (i < parts.length - 1) {
        const size = Math.max(6, Math.min(24, ((block.blanks[i] && block.blanks[i].a.length) || 8) + 2));
        html += `<input type="text" class="blank-input" data-blank="${i}" size="${size}" spellcheck="false" autocomplete="off" aria-label="Blank ${i + 1}">`;
      }
    });
    return frame(block, "Code challenge", `
      ${block.intro ? `<p class="bench-intro">${esc(block.intro)}</p>` : ""}
      <pre class="bench-code"><code>${html}</code></pre>
      <div class="challenge-actions">
        <button type="button" class="btn-check">Check answers</button>
        <button type="button" class="btn-hint" hidden>Reveal a hint</button>
        <button type="button" class="btn-show" hidden>Show solution</button>
      </div>
      <div class="hint-area" hidden></div>
      <div class="bench-explain" hidden></div>
      <div class="bench-done-banner" hidden>${esc(block.success || "Solved. That compiles in your brain now.")}</div>
    `);
  }

  function norm(s, ci) {
    s = String(s).trim().replace(/\s+/g, " ");
    return ci ? s.toLowerCase() : s;
  }

  function wireChallenge(bench, block) {
    const inputs = Array.from(bench.querySelectorAll(".blank-input"));
    const checkBtn = bench.querySelector(".btn-check");
    const hintBtn = bench.querySelector(".btn-hint");
    const showBtn = bench.querySelector(".btn-show");
    const hintArea = bench.querySelector(".hint-area");
    const explain = bench.querySelector(".bench-explain");
    let hintIdx = 0;

    if (done.has(block.id)) {
      inputs.forEach((inp, i) => { inp.value = block.blanks[i].a; inp.disabled = true; inp.classList.add("ok"); });
      checkBtn.disabled = true;
      showBtn.hidden = false;
      showBtn.disabled = true;
      bench.querySelector(".bench-done-banner").hidden = false;
      return;
    }

    if (block.hints && block.hints.length) hintBtn.hidden = false;

    hintBtn.addEventListener("click", () => {
      const h = block.hints[hintIdx];
      if (h === undefined) return;
      hintArea.hidden = false;
      const p = document.createElement("p");
      p.innerHTML = `<strong>Hint ${hintIdx + 1} of ${block.hints.length}.</strong> ${esc(h)}`;
      hintArea.appendChild(p);
      hintIdx++;
      if (hintIdx >= block.hints.length) { hintBtn.disabled = true; showBtn.hidden = false; }
    });

    showBtn.addEventListener("click", () => {
      inputs.forEach((inp, i) => { inp.value = block.blanks[i].a; });
      explain.hidden = false;
      explain.innerHTML = "<strong>Solution filled in above.</strong> Type it out yourself once to lock it in.";
    });

    const check = () => {
      let allOk = true;
      inputs.forEach((inp, i) => {
        const ok = norm(inp.value, block.blanks[i].ci) === norm(block.blanks[i].a, block.blanks[i].ci);
        inp.classList.toggle("ok", ok);
        inp.classList.toggle("bad", !ok);
        if (!ok) allOk = false;
      });
      if (allOk) {
        inputs.forEach(inp => { inp.disabled = true; });
        checkBtn.disabled = true;
        solve(bench, block);
      } else {
        explain.hidden = false;
        explain.innerHTML = "<strong>Almost.</strong> The highlighted blanks still differ. Fix them and check again, or reveal a hint.";
      }
    };

    checkBtn.addEventListener("click", check);
    inputs.forEach(inp => inp.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); check(); }
    }));
  }

  // ---------- ordering (click-to-place) ----------
  function renderSort(block) {
    return frame(block, "Order it", `
      <p class="bench-intro">${esc(block.prompt)}</p>
      <ol class="sort-slots" aria-label="Your order"><li class="slot-empty">Click tiles below in the correct order</li></ol>
      <div class="sort-pool"></div>
      <div class="challenge-actions">
        <button type="button" class="btn-check">Check order</button>
        <button type="button" class="btn-reset" hidden>Reset</button>
      </div>
      <div class="bench-explain" hidden></div>
      <div class="bench-done-banner" hidden>Correct order. That sequence is yours now.</div>
    `);
  }

  function wireSort(bench, block) {
    const pool = bench.querySelector(".sort-pool");
    const slots = bench.querySelector(".sort-slots");
    const checkBtn = bench.querySelector(".btn-check");
    const resetBtn = bench.querySelector(".btn-reset");
    const explain = bench.querySelector(".bench-explain");

    const correct = block.correct; // array of original indices, in correct order
    const labels = block.items;

    const buildPool = (orderIdxs) => {
      pool.innerHTML = "";
      orderIdxs.forEach(i => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "sort-tile";
        b.dataset.i = i;
        b.textContent = labels[i];
        pool.appendChild(b);
      });
    };

    let placed = [];
    const renderSlots = () => {
      slots.innerHTML = placed.map((i, n) => `
        <li><button type="button" class="sort-placed" data-pos="${n}"><span class="sort-n">${n + 1}</span> ${esc(labels[i])}</button></li>
      `).join("") || '<li class="slot-empty">Click tiles below in the correct order</li>';
      slots.querySelectorAll(".sort-placed").forEach(btn => {
        btn.addEventListener("click", () => {
          const pos = Number(btn.dataset.pos);
          placed.splice(pos, 1);
          refresh();
        });
      });
    };

    const refresh = () => {
      const remaining = labels.map((_, i) => i).filter(i => !placed.includes(i));
      buildPool(shuffle(remaining));
      renderSlots();
      pool.querySelectorAll(".sort-tile").forEach(tile => {
        tile.addEventListener("click", () => {
          placed.push(Number(tile.dataset.i));
          refresh();
        });
      });
    };

    const check = () => {
      if (placed.length !== labels.length) {
        explain.hidden = false;
        explain.innerHTML = `<strong>Place all ${labels.length} tiles first.</strong>`;
        return;
      }
      const ok = placed.every((v, i) => v === correct[i]);
      if (ok) {
        checkBtn.disabled = true;
        resetBtn.hidden = true;
        solve(bench, block);
      } else {
        explain.hidden = false;
        explain.innerHTML = "<strong>Not the right order yet.</strong> Click a placed tile to send it back and try again.";
        resetBtn.hidden = false;
      }
    };

    checkBtn.addEventListener("click", check);
    resetBtn.addEventListener("click", () => { placed = []; explain.hidden = true; resetBtn.hidden = true; refresh(); });

    if (done.has(block.id)) {
      placed = correct.slice();
      refresh();
      pool.querySelectorAll(".sort-tile").forEach(t => t.remove());
      checkBtn.disabled = true;
    } else {
      refresh();
    }
  }

  // ---------- matching pairs ----------
  function renderMatch(block) {
    return frame(block, "Match pairs", `
      ${block.intro ? `<p class="bench-intro">${esc(block.intro)}</p>` : ""}
      <p class="match-hintline">Pick a term on the left, then its partner on the right.</p>
      <div class="match-grid">
        <div class="match-col match-left"></div>
        <div class="match-col match-right"></div>
      </div>
      <div class="bench-done-banner" hidden>All pairs matched.</div>
    `);
  }

  function wireMatch(bench, block) {
    const leftCol = bench.querySelector(".match-left");
    const rightCol = bench.querySelector(".match-right");
    let selectedLeft = null;
    let matchedCount = 0;

    const rights = shuffle(block.pairs.map((_, i) => i));

    block.pairs.forEach(([term], i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "match-item";
      b.dataset.side = "left";
      b.dataset.i = i;
      b.textContent = term;
      leftCol.appendChild(b);
    });
    rights.forEach(i => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "match-item";
      b.dataset.side = "right";
      b.dataset.i = i;
      b.textContent = block.pairs[i][1];
      rightCol.appendChild(b);
    });

    const finishIfSolved = () => {
      if (matchedCount === block.pairs.length) solve(bench, block);
    };

    if (done.has(block.id)) {
      bench.querySelectorAll(".match-item").forEach(b => {
        b.classList.add("matched");
        b.disabled = true;
      });
      return;
    }

    const onPick = (btn) => {
      if (btn.classList.contains("matched")) return;
      if (btn.dataset.side === "left") {
        if (selectedLeft) selectedLeft.classList.remove("selected");
        selectedLeft = btn.classList.contains("selected") ? null : btn;
        if (selectedLeft) selectedLeft.classList.add("selected");
        return;
      }
      if (!selectedLeft) return;
      if (Number(selectedLeft.dataset.i) === Number(btn.dataset.i)) {
        selectedLeft.classList.remove("selected");
        selectedLeft.classList.add("matched"); selectedLeft.disabled = true;
        btn.classList.add("matched"); btn.disabled = true;
        selectedLeft = null;
        matchedCount++;
        finishIfSolved();
      } else {
        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 400);
      }
    };

    bench.querySelectorAll(".match-item").forEach(b => b.addEventListener("click", () => onPick(b)));
  }

  // ---------- guided steps ----------
  function renderSteps(block) {
    return frame(block, "Walkthrough", `
      ${block.intro ? `<p class="bench-intro">${esc(block.intro)}</p>` : ""}
      <div class="steps-walker">
        ${block.steps.map((s, i) => `
          <div class="step-row ${i === 0 ? "open" : ""}" data-i="${i}">
            <button type="button" class="step-head">
              <span class="step-num">${i + 1}</span>
              <span class="step-t">${esc(s.t)}</span>
            </button>
            <div class="step-body"><p>${esc(s.d)}</p></div>
          </div>
        `).join("")}
      </div>
      <div class="challenge-actions">
        <button type="button" class="btn-steps-done">I've got this</button>
      </div>
      <div class="bench-done-banner" hidden>Walkthrough complete.</div>
    `);
  }

  function wireSteps(bench, block) {
    const rows = Array.from(bench.querySelectorAll(".step-row"));
    rows.forEach(row => {
      row.querySelector(".step-head").addEventListener("click", () => {
        row.classList.toggle("open");
        row.classList.add("visited");
      });
    });
    const doneBtn = bench.querySelector(".btn-steps-done");
    if (done.has(block.id)) {
      doneBtn.disabled = true;
      rows.forEach(r => r.classList.add("visited"));
      bench.querySelector(".bench-done-banner").hidden = false;
      return;
    }
    doneBtn.addEventListener("click", () => {
      rows.forEach(r => r.classList.add("visited"));
      doneBtn.disabled = true;
      solve(bench, block);
    });
  }

  // ---------- prompt lab ----------
  function renderPromptLab(block) {
    return frame(block, "Prompt lab", `
      <p class="bench-intro"><strong>The vague version:</strong></p>
      <blockquote class="prompt-vague">${esc(block.vague)}</blockquote>
      <p class="bench-intro">${esc(block.task || "Rewrite it so an AI coding tool would have everything it needs. Mention at least")} <strong>${block.minFound || 3}</strong> ${esc(`of these ideas: ${block.keywords.join(", ")}.`)}</p>
      <textarea class="prompt-input" rows="4" placeholder="Write your improved prompt here..."></textarea>
      <div class="challenge-actions">
        <button type="button" class="btn-check">Evaluate my prompt</button>
        <button type="button" class="btn-model" hidden>Show a model rewrite</button>
      </div>
      <div class="keyword-report" hidden></div>
      <div class="model-answer" hidden><strong>A strong rewrite:</strong><p>${esc(block.model)}</p></div>
      <div class="bench-done-banner" hidden>Prompt upgraded. That instinct compounds.</div>
    `);
  }

  function wirePromptLab(bench, block) {
    const ta = bench.querySelector(".prompt-input");
    const checkBtn = bench.querySelector(".btn-check");
    const modelBtn = bench.querySelector(".btn-model");
    const report = bench.querySelector(".keyword-report");
    const min = block.minFound || 3;

    if (done.has(block.id)) {
      ta.value = block.model;
      ta.disabled = true;
      checkBtn.disabled = true;
      modelBtn.hidden = false; modelBtn.disabled = true;
      bench.querySelector(".model-answer").hidden = false;
      return;
    }

    modelBtn.addEventListener("click", () => {
      bench.querySelector(".model-answer").hidden = false;
    });

    checkBtn.addEventListener("click", () => {
      const text = ta.value.toLowerCase();
      const found = block.keywords.filter(k => text.includes(k.toLowerCase()));
      const missing = block.keywords.filter(k => !text.includes(k.toLowerCase()));
      report.hidden = false;
      report.innerHTML = `
        <p><strong>${found.length} of ${block.keywords.length} ideas covered.</strong> ${found.length >= min ? "" : `Include at least ${min}.`}</p>
        ${found.length ? `<p class="kw-found">Covered: ${found.map(esc).join(", ")}</p>` : ""}
        ${missing.length && found.length < min ? `<p class="kw-missing">Missing: ${missing.map(esc).join(", ")}</p>` : ""}
      `;
      if (found.length >= min) {
        checkBtn.disabled = true;
        ta.disabled = true;
        modelBtn.hidden = false;
        solve(bench, block);
      }
    });
  }

  // ---------- public API ----------
  const RENDERERS = {
    checkpoint: [renderCheckpoint, wireCheckpoint],
    predict: [renderPredict, wirePredict],
    challenge: [renderChallenge, wireChallenge],
    sort: [renderSort, wireSort],
    match: [renderMatch, wireMatch],
    steps: [renderSteps, wireSteps],
    promptLab: [renderPromptLab, wirePromptLab]
  };

  function mount(container, blocks) {
    if (!container || !Array.isArray(blocks)) return;
    blocks.forEach(block => {
      if (!block || !RENDERERS[block.type]) return;
      const holder = document.createElement("div");
      holder.className = "lesson-block-holder";
      holder.innerHTML = RENDERERS[block.type][0](block);
      container.appendChild(holder);
      const bench = holder.querySelector(".lab-bench");
      try { RENDERERS[block.type][1](bench, block); } catch (err) { /* one broken block must not kill the rest */ console.warn("block wire failed", block.id, err); }
    });
  }

  function init() {
    buildRegistry();
    announce(); // lets app.js sync the chip on load
  }

  window.LESSON_BLOCKS = { mount, getXP, getTotalXP, getCount, init };
})();
