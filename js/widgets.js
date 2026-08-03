// Interactive Concept Laboratory Widgets Suite — Enhanced Edition

window.WIDGET_SUITE = {
  // Render Widget based on Stage Config
  renderWidget(stage, container) {
    container.innerHTML = `
      <div class="interactive-lab">
        <div class="lab-header">
          <div class="lab-title">
            <span class="lab-badge">LABORATORY</span>
            <h3>${stage.widgetTitle || "Interactive Simulator"}</h3>
          </div>
        </div>
        <p class="lab-desc">${stage.widgetDescription || ""}</p>
        <div id="widget-active-content"></div>
      </div>
    `;

    const activeArea = container.querySelector("#widget-active-content");

    switch (stage.widgetType) {
      case "client-server":
        this.renderClientServer(activeArea);
        break;
      case "live-sandbox":
        this.renderLiveSandbox(activeArea);
        break;
      case "css-playground":
        this.renderCssPlayground(activeArea);
        break;
      case "git-simulator":
        this.renderGitSimulator(activeArea);
        break;
      case "api-inspector":
        this.renderApiInspector(activeArea);
        break;
      case "debug-challenge":
        this.renderDebugChallenge(activeArea);
        break;
      case "tokenizer-sim":
        this.renderTokenizerSim(activeArea);
        break;
      case "prompt-transformer":
        this.renderPromptTransformer(activeArea);
        break;
      case "flashcards":
        this.renderFlashcards(activeArea, stage.flashcardData);
        break;
      case "architecture-blueprint":
        this.renderArchitectureBlueprint(activeArea);
        break;
      case "deploy-simulator":
        this.renderDeploySimulator(activeArea);
        break;
      default:
        activeArea.innerHTML = `<p class="text-muted">Interactive playground ready.</p>`;
    }
  },

  // 1. Client-Server Network Simulator
  renderClientServer(el) {
    el.innerHTML = `
      <div class="network-sim-grid">
        <div class="sim-node">
          <h4>Client (Browser)</h4>
          <p class="text-muted" style="font-size:0.8rem; margin-top:0.3rem;" id="client-status">Idle</p>
        </div>
        <div style="text-align:center;">
          <div class="sim-pipe">
            <div class="sim-packet" id="sim-packet" style="left:0;"></div>
          </div>
          <button class="api-btn" id="send-request-btn" style="margin-top:1rem; font-size:0.8rem;">Send HTTP Request</button>
        </div>
        <div class="sim-node">
          <h4>Server & Database</h4>
          <p class="text-muted" style="font-size:0.8rem; margin-top:0.3rem;" id="server-status">Listening on Port 443</p>
        </div>
      </div>
      <div id="sim-log" style="margin-top:1rem; font-family:var(--font-code); font-size:0.82rem; background:var(--bg-dark); padding:0.75rem; border-radius:var(--radius-sm); color:var(--secondary-accent);">
        Log: Click "Send HTTP Request" to simulate request-response lifecycle.
      </div>
    `;

    const packet = el.querySelector("#sim-packet");
    const log = el.querySelector("#sim-log");
    const clientStatus = el.querySelector("#client-status");
    const serverStatus = el.querySelector("#server-status");
    const btn = el.querySelector("#send-request-btn");

    btn.addEventListener("click", () => {
      btn.disabled = true;
      clientStatus.textContent = "1. Resolving DNS & Sending GET /index.html";
      log.textContent = "[CLIENT] Sending GET request over TLS/HTTPS...";
      packet.style.left = "80%";

      setTimeout(() => {
        serverStatus.textContent = "2. Reading HTML file from Disk";
        log.textContent = "[SERVER] HTTP 200 OK — Packaging index.html, style.css, app.js";
        packet.style.background = "#10B981";

        setTimeout(() => {
          packet.style.left = "0%";
          setTimeout(() => {
            clientStatus.textContent = "3. Rendering DOM Tree & Applying CSS";
            serverStatus.textContent = "Listening on Port 443";
            log.textContent = "[BROWSER] Success! Webpage rendered in 42ms.";
            packet.style.background = "var(--secondary-accent)";
            btn.disabled = false;
          }, 1000);
        }, 1000);
      }, 1000);
    });
  },

  // 2. Live HTML/CSS/JS Sandbox
  renderLiveSandbox(el) {
    el.innerHTML = `
      <div class="sandbox-layout">
        <div class="sandbox-editor">
          <div style="font-size:0.8rem; color:var(--text-dim); margin-bottom:0.4rem; font-weight:600;">HTML / CSS / JS EDITOR</div>
          <textarea class="sandbox-textarea" id="sandbox-code"><style>
  body { font-family: sans-serif; padding: 20px; background: #0f172a; color: #fff; text-align: center; }
  button { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; }
  button:hover { background: #4f46e5; }
</style>
<h1>Hello World! 👋</h1>
<p>Edit this code live on the left.</p>
<button onclick="alert('JavaScript Works!')">Click Me</button></textarea>
        </div>
        <div class="sandbox-preview">
          <iframe class="sandbox-iframe" id="sandbox-frame"></iframe>
        </div>
      </div>
    `;

    const textarea = el.querySelector("#sandbox-code");
    const iframe = el.querySelector("#sandbox-frame");

    const updateFrame = () => {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(textarea.value);
      doc.close();
    };

    textarea.addEventListener("input", updateFrame);
    setTimeout(updateFrame, 100);
  },

  // 2b. CSS Flexbox Playground
  renderCssPlayground(el) {
    el.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div>
          <h4 style="margin-bottom:0.75rem; color:var(--text-main);">Flexbox Controls</h4>
          <div style="margin-bottom:0.75rem;">
            <label style="font-size:0.8rem; color:var(--text-muted);">flex-direction:</label>
            <select id="flex-dir" style="width:100%; background:var(--bg-surface); color:#FFF; border:1px solid var(--border-color); padding:0.4rem; border-radius:4px; margin-top:0.2rem;">
              <option value="row">row</option>
              <option value="column">column</option>
              <option value="row-reverse">row-reverse</option>
            </select>
          </div>
          <div style="margin-bottom:0.75rem;">
            <label style="font-size:0.8rem; color:var(--text-muted);">justify-content:</label>
            <select id="flex-jc" style="width:100%; background:var(--bg-surface); color:#FFF; border:1px solid var(--border-color); padding:0.4rem; border-radius:4px; margin-top:0.2rem;">
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>
          <div style="margin-bottom:0.75rem;">
            <label style="font-size:0.8rem; color:var(--text-muted);">align-items:</label>
            <select id="flex-ai" style="width:100%; background:var(--bg-surface); color:#FFF; border:1px solid var(--border-color); padding:0.4rem; border-radius:4px; margin-top:0.2rem;">
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
            </select>
          </div>
          <div style="margin-bottom:0.75rem;">
            <label style="font-size:0.8rem; color:var(--text-muted);">gap:</label>
            <input type="range" id="flex-gap" min="0" max="30" value="10" style="width:100%;">
          </div>
          <div style="background:var(--bg-dark); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.6rem; font-family:var(--font-code); font-size:0.78rem; color:var(--secondary-accent);">
            <div id="css-output">.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px;
}</div>
          </div>
        </div>
        <div>
          <h4 style="margin-bottom:0.75rem; color:var(--text-main);">Live Preview</h4>
          <div id="flex-preview" style="display:flex; flex-direction:row; gap:10px; min-height:200px; background:var(--bg-dark); border:2px dashed var(--border-color); border-radius:var(--radius-md); padding:10px;">
            <div style="background:var(--primary-accent); color:#FFF; padding:1rem; border-radius:6px; font-weight:700; min-width:50px; text-align:center;">1</div>
            <div style="background:var(--secondary-accent); color:#FFF; padding:1.5rem; border-radius:6px; font-weight:700; min-width:50px; text-align:center;">2</div>
            <div style="background:var(--success-accent); color:#FFF; padding:0.75rem; border-radius:6px; font-weight:700; min-width:50px; text-align:center;">3</div>
            <div style="background:var(--warning-accent); color:#000; padding:1.25rem; border-radius:6px; font-weight:700; min-width:50px; text-align:center;">4</div>
          </div>
        </div>
      </div>
    `;

    const preview = el.querySelector("#flex-preview");
    const output = el.querySelector("#css-output");
    const dirSelect = el.querySelector("#flex-dir");
    const jcSelect = el.querySelector("#flex-jc");
    const aiSelect = el.querySelector("#flex-ai");
    const gapInput = el.querySelector("#flex-gap");

    const update = () => {
      const dir = dirSelect.value;
      const jc = jcSelect.value;
      const ai = aiSelect.value;
      const gap = gapInput.value + "px";
      preview.style.flexDirection = dir;
      preview.style.justifyContent = jc;
      preview.style.alignItems = ai;
      preview.style.gap = gap;
      output.textContent = `.container {\n  display: flex;\n  flex-direction: ${dir};\n  justify-content: ${jc};\n  align-items: ${ai};\n  gap: ${gap};\n}`;
    };

    [dirSelect, jcSelect, aiSelect, gapInput].forEach(ctrl => ctrl.addEventListener("input", update));
  },

  // 3. Git Terminal & Branch Visualizer
  renderGitSimulator(el) {
    let commits = [
      { id: "c1", msg: "Initial commit", branch: "main" },
      { id: "c2", msg: "Add profile HTML", branch: "main" }
    ];

    const drawGraph = () => {
      const svg = el.querySelector("#git-svg");
      svg.innerHTML = "";
      const width = Math.max(600, commits.length * 90 + 60);
      svg.setAttribute("viewBox", `0 0 ${width} 140`);
      commits.forEach((c, idx) => {
        const cx = 50 + idx * 90;
        const cy = c.branch === "main" ? 50 : 100;
        
        if (idx > 0) {
          const prevCx = 50 + (idx - 1) * 90;
          const prevCy = commits[idx - 1].branch === "main" ? 50 : 100;
          svg.innerHTML += `<line x1="${prevCx}" y1="${prevCy}" x2="${cx}" y2="${cy}" stroke="#6366F1" stroke-width="3" />`;
        }

        const color = c.branch === "main" ? "#6366F1" : "#06B6D4";
        svg.innerHTML += `
          <circle cx="${cx}" cy="${cy}" r="12" fill="${color}" stroke="#FFF" stroke-width="2" />
          <text x="${cx}" y="${cy + 28}" fill="#9CA3AF" font-size="10" text-anchor="middle">${c.msg.substring(0, 12)}${c.msg.length > 12 ? "..." : ""}</text>
          <text x="${cx}" y="${cy + 40}" fill="#6B7280" font-size="8" text-anchor="middle">${c.branch}</text>
        `;
      });
    };

    el.innerHTML = `
      <div class="git-visualizer-container">
        <svg id="git-svg" class="git-graph-svg"></svg>
        <div class="git-terminal-input">
          <span style="color:var(--primary-accent);">$</span>
          <input type="text" class="git-cmd-input" id="git-input" placeholder="Type a git command..." />
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.75rem;">
          <span class="text-muted" style="font-size:0.75rem;">Quick commands:</span>
          <button class="git-quick-btn" data-cmd='git commit -m "Add navbar"' style="font-size:0.72rem; background:var(--bg-surface-elevated); border:1px solid var(--border-color); color:var(--text-muted); padding:0.2rem 0.5rem; border-radius:4px; cursor:pointer;">commit</button>
          <button class="git-quick-btn" data-cmd='git checkout -b feature-dark' style="font-size:0.72rem; background:var(--bg-surface-elevated); border:1px solid var(--border-color); color:var(--text-muted); padding:0.2rem 0.5rem; border-radius:4px; cursor:pointer;">new branch</button>
          <button class="git-quick-btn" data-cmd='git merge feature-dark' style="font-size:0.72rem; background:var(--bg-surface-elevated); border:1px solid var(--border-color); color:var(--text-muted); padding:0.2rem 0.5rem; border-radius:4px; cursor:pointer;">merge</button>
        </div>
      </div>
    `;

    drawGraph();

    const input = el.querySelector("#git-input");

    const processCommand = (val) => {
      if (val.startsWith("git commit")) {
        const msg = val.split("-m")[1]?.replace(/['"]/g, "").trim() || "Commit";
        const currentBranch = commits[commits.length - 1].branch;
        commits.push({ id: `c${commits.length + 1}`, msg, branch: currentBranch });
        drawGraph();
      } else if (val.includes("checkout -b")) {
        const bName = val.split("-b")[1]?.trim() || "feature";
        commits.push({ id: `c${commits.length + 1}`, msg: `Branch: ${bName}`, branch: bName });
        drawGraph();
      } else if (val.includes("merge")) {
        const currentBranch = commits[commits.length - 1].branch;
        commits.push({ id: `c${commits.length + 1}`, msg: `Merge into main`, branch: "main" });
        drawGraph();
      }
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value.trim();
        processCommand(val);
        input.value = "";
      }
    });

    el.querySelectorAll(".git-quick-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        processCommand(btn.getAttribute("data-cmd"));
      });
    });
  },

  // 4. API & Auth Inspector
  renderApiInspector(el) {
    el.innerHTML = `
      <div class="api-inspector-grid">
        <div class="api-request-panel">
          <h4>Request Builder</h4>
          <div style="margin: 0.75rem 0;">
            <label style="font-size:0.8rem; color:var(--text-muted);">Method & Endpoint:</label>
            <div style="display:flex; gap:0.5rem; margin-top:0.25rem;">
              <select id="api-method" style="background:var(--bg-surface); color:#FFF; border:1px solid var(--border-color); padding:0.4rem; border-radius:4px;">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <input type="text" value="https://api.app.com/v1/user/profile" readonly style="flex:1; background:var(--bg-surface); color:var(--text-muted); border:1px solid var(--border-color); padding:0.4rem; border-radius:4px; font-family:var(--font-code); font-size:0.8rem;" />
            </div>
          </div>
          <div style="margin-bottom:0.75rem;">
            <label style="font-size:0.8rem; color:var(--text-muted);">Auth Header:</label>
            <select id="api-auth-type" style="width:100%; background:var(--bg-surface); color:#FFF; border:1px solid var(--border-color); padding:0.4rem; border-radius:4px; margin-top:0.25rem;">
              <option value="jwt">Bearer JWT Token (Authorization: Bearer eyJhbGci...)</option>
              <option value="cookie">Session Cookie (Cookie: session_id=xyz987)</option>
              <option value="none">No Auth (Anonymous)</option>
            </select>
          </div>
          <button class="api-btn" id="api-send-btn">Execute API Call</button>
        </div>
        <div class="api-response-panel">
          <h4>Server Response</h4>
          <pre id="api-response-json" style="margin-top:0.5rem; height:150px; font-size:0.8rem; color:var(--success-accent);">{ "status": "Ready" }</pre>
        </div>
      </div>
    `;

    const btn = el.querySelector("#api-send-btn");
    const jsonOutput = el.querySelector("#api-response-json");

    btn.addEventListener("click", () => {
      const auth = el.querySelector("#api-auth-type").value;
      const method = el.querySelector("#api-method").value;

      btn.textContent = "Sending...";
      setTimeout(() => {
        btn.textContent = "Execute API Call";
        if (auth === "none") {
          jsonOutput.style.color = "#EF4444";
          jsonOutput.textContent = JSON.stringify({ error: "401 Unauthorized", message: "Missing JWT Token or Session Cookie" }, null, 2);
        } else {
          jsonOutput.style.color = "#10B981";
          jsonOutput.textContent = JSON.stringify({
            status: 200,
            statusText: "OK",
            method: method,
            authenticatedAs: "sam_developer",
            authStrategy: auth === "jwt" ? "JSON Web Token Verification" : "Session ID Cookie Lookup",
            user: { id: "usr_99", name: "Sam Developer", role: "admin" }
          }, null, 2);
        }
      }, 600);
    });
  },

  // 4b. Debug Challenge Widget
  renderDebugChallenge(el) {
    const challenges = [
      {
        title: "Find the Bug: Broken Counter",
        code: `let count = 0;\nconst btn = document.getElementById("counter-btn");\n\nbtn.addEventListener("click", function() {\n  count = count + 1;\n  document.getElementById("display").textContent = count;\n});\n\n// Bug: The display always shows "1" no matter how many times you click.\n// The HTML has: <span id="display">0</span>\n// Hint: Check if the element IDs match.`,
        hint: "Look at the event listener — is 'count' actually incrementing? Check if the event listener is being attached to the correct element, or if there's a scope issue.",
        answer: "The variable `count` is declared with `let` in the outer scope, so it should increment. But if `btn` is null (element not found), the addEventListener call would throw an error. Check that the HTML has an element with id=\"counter-btn\"."
      },
      {
        title: "Find the Bug: Infinite Loop",
        code: `// This code should print numbers 1 through 5\nlet i = 1;\nwhile (i <= 5) {\n  console.log(i);\n}\n// Bug: The browser freezes and never stops printing.`,
        hint: "What changes the value of 'i' inside the loop?",
        answer: "The variable `i` is never incremented inside the loop, so `i <= 5` is always true. Fix: add `i++` at the end of the loop body."
      },
      {
        title: "Find the Bug: Type Coercion",
        code: `function addNumbers(a, b) {\n  return a + b;\n}\n\nconst input1 = document.getElementById("num1").value; // user typed "5"\nconst input2 = document.getElementById("num2").value; // user typed "3"\nconst result = addNumbers(input1, input2);\nconsole.log(result); // Expected: 8, Actual: "53"`,
        hint: "What type does .value return? What does the + operator do with strings?",
        answer: "The `.value` property returns a string. `\"5\" + \"3\"` = `\"53\"` (concatenation, not addition). Fix: convert to numbers first with `parseInt()` or `Number()`."
      }
    ];

    let currentChallenge = 0;

    const renderChallenge = () => {
      const ch = challenges[currentChallenge];
      el.innerHTML = `
        <div style="margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
          <h4 style="color:var(--warning-accent);">🐛 ${ch.title}</h4>
          <span style="font-size:0.78rem; color:var(--text-dim);">${currentChallenge + 1}/${challenges.length}</span>
        </div>
        <pre style="background:var(--bg-dark); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); font-size:0.82rem; line-height:1.6; overflow-x:auto; color:var(--text-main);"><code>${ch.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <div style="display:flex; gap:0.5rem; margin-top:1rem;">
          <button class="api-btn" id="debug-hint-btn" style="background:var(--warning-accent); color:#000; font-size:0.8rem;">💡 Show Hint</button>
          <button class="api-btn" id="debug-answer-btn" style="background:var(--success-accent); font-size:0.8rem;">✓ Show Answer</button>
          ${currentChallenge < challenges.length - 1 ? `<button class="api-btn" id="debug-next-btn" style="font-size:0.8rem;">Next Challenge →</button>` : ''}
        </div>
        <div id="debug-hint-area" style="display:none; margin-top:0.75rem; padding:0.75rem; background:rgba(245,158,11,0.1); border-left:3px solid var(--warning-accent); border-radius:4px; font-size:0.85rem; color:var(--text-muted);"></div>
        <div id="debug-answer-area" style="display:none; margin-top:0.75rem; padding:0.75rem; background:rgba(16,185,129,0.1); border-left:3px solid var(--success-accent); border-radius:4px; font-size:0.85rem; color:var(--text-muted);"></div>
      `;

      el.querySelector("#debug-hint-btn").addEventListener("click", () => {
        const area = el.querySelector("#debug-hint-area");
        area.style.display = "block";
        area.textContent = "💡 " + ch.hint;
      });

      el.querySelector("#debug-answer-btn").addEventListener("click", () => {
        const area = el.querySelector("#debug-answer-area");
        area.style.display = "block";
        area.textContent = "✓ " + ch.answer;
      });

      const nextBtn = el.querySelector("#debug-next-btn");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          currentChallenge++;
          renderChallenge();
        });
      }
    };

    renderChallenge();
  },

  // 5. LLM Tokenizer Visualizer
  renderTokenizerSim(el) {
    el.innerHTML = `
      <div class="tokenizer-container">
        <div>
          <label style="font-size:0.8rem; color:var(--text-muted);">Enter Prompt Text:</label>
          <textarea id="tok-input" style="width:100%; height:120px; background:var(--bg-dark); border:1px solid var(--border-color); color:#FFF; padding:0.75rem; border-radius:var(--radius-md); margin-top:0.4rem; font-family:var(--font-code); font-size:0.85rem;" placeholder="Type code or sentences here...">Building AI powered applications with Claude and Cursor</textarea>
          <div style="display:flex; justify-content:space-between; margin-top:0.5rem; font-size:0.8rem; color:var(--text-muted);">
            <span>Characters: <b id="char-count" style="color:var(--text-main);">0</b></span>
            <span>Est. Tokens: <b id="tok-count" style="color:var(--primary-accent);">0</b></span>
            <span>Est. Cost: <b id="cost-count" style="color:var(--warning-accent);">$0.00</b></span>
          </div>
          <div style="margin-top:0.75rem; font-size:0.78rem; color:var(--text-dim);">
            <div style="display:flex; gap:1rem;">
              <span>GPT-4 class: <b id="gpt4-cost" style="color:var(--text-muted);">$0.00</b></span>
              <span>GPT-3.5 class: <b id="gpt35-cost" style="color:var(--text-muted);">$0.00</b></span>
            </div>
          </div>
        </div>
        <div>
          <label style="font-size:0.8rem; color:var(--text-muted);">Token Breakdown Chips:</label>
          <div class="token-box" id="token-chips"></div>
        </div>
      </div>
    `;

    const input = el.querySelector("#tok-input");
    const chipsContainer = el.querySelector("#token-chips");
    const charCount = el.querySelector("#char-count");
    const tokCount = el.querySelector("#tok-count");
    const costCount = el.querySelector("#cost-count");
    const gpt4Cost = el.querySelector("#gpt4-cost");
    const gpt35Cost = el.querySelector("#gpt35-cost");

    const colors = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"];

    const update = () => {
      const val = input.value;
      charCount.textContent = val.length;
      const words = val.split(/(\s+|[.,!?:;{}[\]()])/).filter(Boolean);
      const tokenEstimate = Math.ceil(val.length / 4);
      tokCount.textContent = tokenEstimate;
      const costBase = tokenEstimate * 0.00003;
      costCount.textContent = "$" + costBase.toFixed(4);
      gpt4Cost.textContent = "$" + (tokenEstimate * 0.00006).toFixed(4);
      gpt35Cost.textContent = "$" + (tokenEstimate * 0.000002).toFixed(4);
      
      chipsContainer.innerHTML = "";
      words.forEach((w, idx) => {
        const bg = colors[idx % colors.length];
        const chip = document.createElement("span");
        chip.className = "token-chip";
        chip.style.background = bg + "25";
        chip.style.border = `1px solid ${bg}`;
        chip.style.color = bg;
        chip.textContent = w === " " ? "␣" : w;
        chipsContainer.appendChild(chip);
      });
    };

    input.addEventListener("input", update);
    update();
  },

  // 6. Prompt Engineering Transformer
  renderPromptTransformer(el) {
    const scenarios = [
      {
        vague: "Fix my navigation bar, it looks broken on phone.",
        specific: "The `<nav>` menu on screens under 600px width overlaps the logo. Add a media query in `style.css` to switch flex-direction to column without touching desktop styles.",
        vagueResult: "AI Result: Model guesses CSS rules, breaks desktop layout, introduces random flex settings.",
        specificResult: "AI Result: Exact CSS diff produced targeting `@media (max-width: 600px)` with 100% precision."
      },
      {
        vague: "Add a login page to my website.",
        specific: "Create a login.html with an email/password form. On submit, POST to /api/login with JSON body. Show error message if response status is 401. Redirect to /dashboard on success.",
        vagueResult: "AI Result: Generic login form with no validation, no error handling, hardcoded redirect.",
        specificResult: "AI Result: Complete login page with fetch API, error handling, JSON request/response, and proper redirects."
      },
      {
        vague: "My code doesn't work.",
        specific: "In app.js line 42, `document.getElementById('userList').innerHTML = users.map(...)` throws 'Cannot read properties of null'. The HTML element has id='user-list' with a hyphen.",
        vagueResult: "AI Result: Generic suggestions about checking element existence, adds optional chaining everywhere.",
        specificResult: "AI Result: Immediately spots the ID mismatch ('userList' vs 'user-list') and provides the one-line fix."
      }
    ];

    let currentScenario = 0;

    const renderScenario = () => {
      const s = scenarios[currentScenario];
      el.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <span style="font-size:0.82rem; color:var(--text-dim);">Scenario ${currentScenario + 1} of ${scenarios.length}</span>
          <div style="display:flex; gap:0.5rem;">
            <button class="api-btn" id="prompt-prev-btn" style="font-size:0.75rem; padding:0.3rem 0.6rem; ${currentScenario === 0 ? 'opacity:0.4;cursor:default;' : ''}">← Prev</button>
            <button class="api-btn" id="prompt-next-btn" style="font-size:0.75rem; padding:0.3rem 0.6rem; ${currentScenario === scenarios.length - 1 ? 'opacity:0.4;cursor:default;' : ''}">Next →</button>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div style="background:var(--bg-dark); border:1px solid #EF4444; border-radius:var(--radius-md); padding:1rem;">
            <h5 style="color:#EF4444;">❌ Vague Prompt</h5>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">"${s.vague}"</p>
            <hr style="border-color:var(--border-color); margin:0.75rem 0;" />
            <p style="font-size:0.78rem; color:#EF4444;">${s.vagueResult}</p>
          </div>
          <div style="background:var(--bg-dark); border:1px solid var(--success-accent); border-radius:var(--radius-md); padding:1rem;">
            <h5 style="color:var(--success-accent);">✅ Engineered Prompt</h5>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">"${s.specific}"</p>
            <hr style="border-color:var(--border-color); margin:0.75rem 0;" />
            <p style="font-size:0.78rem; color:var(--success-accent);">${s.specificResult}</p>
          </div>
        </div>
      `;

      const prevBtn = el.querySelector("#prompt-prev-btn");
      const nextBtn = el.querySelector("#prompt-next-btn");
      if (prevBtn && currentScenario > 0) {
        prevBtn.addEventListener("click", () => { currentScenario--; renderScenario(); });
      }
      if (nextBtn && currentScenario < scenarios.length - 1) {
        nextBtn.addEventListener("click", () => { currentScenario++; renderScenario(); });
      }
    };

    renderScenario();
  },

  // 7. Full-Stack Architecture Blueprint
  renderArchitectureBlueprint(el) {
    el.innerHTML = `
      <div style="background:var(--bg-dark); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.5rem; text-align:center;">
        <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--primary-accent); width:160px;">
            <b style="color:var(--primary-accent);">User Browser</b>
            <p style="font-size:0.75rem; color:var(--text-muted);">HTML5 / CSS / JS</p>
          </div>
          <span style="color:var(--text-dim); font-weight:bold;">➔ HTTPS API ➔</span>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--secondary-accent); width:160px;">
            <b style="color:var(--secondary-accent);">Vercel Edge</b>
            <p style="font-size:0.75rem; color:var(--text-muted);">Static CDN Hosting</p>
          </div>
          <span style="color:var(--text-dim); font-weight:bold;">➔ SQL ➔</span>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--success-accent); width:160px;">
            <b style="color:var(--success-accent);">Supabase DB</b>
            <p style="font-size:0.75rem; color:var(--text-muted);">PostgreSQL & JWT Auth</p>
          </div>
        </div>
        <div style="margin-top:1.5rem; display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <div style="background:var(--bg-surface); padding:0.6rem 1rem; border-radius:6px; border:1px solid var(--warning-accent); font-size:0.78rem;">
            <b style="color:var(--warning-accent);">Auth Flow:</b>
            <span style="color:var(--text-muted);"> Email → Supabase → JWT → Protected Routes</span>
          </div>
          <div style="background:var(--bg-surface); padding:0.6rem 1rem; border-radius:6px; border:1px solid var(--border-color); font-size:0.78rem;">
            <b style="color:var(--text-main);">Deploy:</b>
            <span style="color:var(--text-muted);"> git push → Vercel auto-build → Live URL</span>
          </div>
        </div>
      </div>
    `;
  },

  // 8. Flashcard Review Widget
  renderFlashcards(el, flashcardData) {
    if (!flashcardData || flashcardData.length === 0) {
      flashcardData = [
        { term: "HTML", definition: "HyperText Markup Language — the structure and content of a web page (headings, paragraphs, links, images)." },
        { term: "CSS", definition: "Cascading Style Sheets — controls visual appearance: colors, fonts, spacing, layout." },
        { term: "JavaScript", definition: "A programming language that adds behavior and interactivity to web pages (clicks, animations, data fetching)." },
        { term: "DOM", definition: "Document Object Model — the browser's live representation of your HTML that JavaScript can read and modify." },
        { term: "API", definition: "Application Programming Interface — a defined way for software to ask another piece of software for data." },
        { term: "Git", definition: "A version control system that tracks changes to your code files over time, locally on your computer." },
        { term: "Token", definition: "The atomic unit of text (word or word fragment) that an AI model processes. Not always a full word." },
        { term: "Deploy", definition: "The act of putting your code onto a hosting server so it becomes a live, public website." }
      ];
    }

    let currentCard = 0;
    let isFlipped = false;

    const renderCard = () => {
      const card = flashcardData[currentCard];
      el.innerHTML = `
        <div class="flashcard-container" id="flashcard-click-area">
          <div class="flashcard-inner ${isFlipped ? 'flipped' : ''}" id="flashcard-inner">
            <div class="flashcard-front">
              <div class="flashcard-term">${card.term}</div>
              <div class="flashcard-hint">Click to reveal definition</div>
            </div>
            <div class="flashcard-back">
              <div class="flashcard-definition">${card.definition}</div>
            </div>
          </div>
        </div>
        <div class="flashcard-nav">
          <button class="flashcard-nav-btn" id="fc-prev" ${currentCard === 0 ? 'disabled style="opacity:0.4;"' : ''}>← Prev</button>
          <span class="flashcard-counter">${currentCard + 1} / ${flashcardData.length}</span>
          <button class="flashcard-nav-btn" id="fc-next" ${currentCard === flashcardData.length - 1 ? 'disabled style="opacity:0.4;"' : ''}>Next →</button>
        </div>
      `;

      el.querySelector("#flashcard-click-area").addEventListener("click", () => {
        isFlipped = !isFlipped;
        el.querySelector("#flashcard-inner").classList.toggle("flipped", isFlipped);
      });

      const prevBtn = el.querySelector("#fc-prev");
      const nextBtn = el.querySelector("#fc-next");
      if (prevBtn && currentCard > 0) {
        prevBtn.addEventListener("click", (e) => { e.stopPropagation(); currentCard--; isFlipped = false; renderCard(); });
      }
      if (nextBtn && currentCard < flashcardData.length - 1) {
        nextBtn.addEventListener("click", (e) => { e.stopPropagation(); currentCard++; isFlipped = false; renderCard(); });
      }
    };

    renderCard();
  },

  // 9. Deployment Simulator
  renderDeploySimulator(el) {
    let step = 0;
    const steps = [
      { label: "git push origin main", output: "Enumerating objects: 42, done.\nWriting objects: 100% (42/42), 8.5 KiB\nTo github.com:user/my-app.git\n   abc1234..def5678  main → main", status: "Pushed to GitHub" },
      { label: "Vercel detects push", output: "🔗 GitHub webhook received\n📦 Installing dependencies...\n   npm install completed (127 packages)\n🔨 Building project...\n   Build completed in 12.4s", status: "Building..." },
      { label: "Deploy to CDN", output: "✅ Deploy successful!\n\n🌐 Production URL: https://my-app.vercel.app\n⚡ Edge Functions: 3 deployed\n📊 Bundle size: 142 KB (gzipped: 48 KB)\n🔒 HTTPS: Enabled (auto)", status: "Live!" }
    ];

    const render = () => {
      el.innerHTML = `
        <div style="background:var(--bg-dark); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.5rem; font-family:var(--font-code);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h4 style="color:var(--text-main); font-family:var(--font-display);">Deployment Pipeline</h4>
            <div style="display:flex; gap:0.5rem; align-items:center;">
              ${steps.map((s, i) => `<div style="width:12px; height:12px; border-radius:50%; background:${i <= step ? 'var(--success-accent)' : 'var(--bg-surface-elevated)'}; border:2px solid ${i <= step ? 'var(--success-accent)' : 'var(--border-color)'};"></div>${i < steps.length - 1 ? '<div style="width:20px; height:2px; background:' + (i < step ? 'var(--success-accent)' : 'var(--border-color)') + ';"></div>' : ''}`).join('')}
            </div>
          </div>
          <div style="margin-bottom:1rem;">
            <div style="font-size:0.8rem; color:var(--success-accent); margin-bottom:0.5rem;">$ ${steps[step].label}</div>
            <pre style="background:rgba(0,0,0,0.4); padding:0.75rem; border-radius:4px; font-size:0.8rem; color:var(--text-muted); line-height:1.5; white-space:pre-wrap;">${steps[step].output}</pre>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.82rem; color:${step === steps.length - 1 ? 'var(--success-accent)' : 'var(--warning-accent)'}; font-weight:600;">${steps[step].status}</span>
            <div style="display:flex; gap:0.5rem;">
              ${step > 0 ? '<button class="api-btn" id="deploy-prev-btn" style="font-size:0.78rem; padding:0.3rem 0.8rem;">← Back</button>' : ''}
              ${step < steps.length - 1 ? `<button class="api-btn" id="deploy-next-btn" style="font-size:0.78rem; padding:0.3rem 0.8rem;">Next Step →</button>` : '<button class="api-btn" id="deploy-reset-btn" style="font-size:0.78rem; padding:0.3rem 0.8rem; background:var(--success-accent);">🎉 Deploy Again</button>'}
            </div>
          </div>
        </div>
      `;

      const nextBtn = el.querySelector("#deploy-next-btn");
      const prevBtn = el.querySelector("#deploy-prev-btn");
      const resetBtn = el.querySelector("#deploy-reset-btn");
      if (nextBtn) nextBtn.addEventListener("click", () => { step++; render(); });
      if (prevBtn) prevBtn.addEventListener("click", () => { step--; render(); });
      if (resetBtn) resetBtn.addEventListener("click", () => { step = 0; render(); });
    };

    render();
  }
};
