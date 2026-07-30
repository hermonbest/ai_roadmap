// Interactive Concept Laboratory Widgets Suite

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
      case "git-simulator":
        this.renderGitSimulator(activeArea);
        break;
      case "api-inspector":
        this.renderApiInspector(activeArea);
        break;
      case "tokenizer-sim":
        this.renderTokenizerSim(activeArea);
        break;
      case "prompt-transformer":
        this.renderPromptTransformer(activeArea);
        break;
      case "architecture-blueprint":
        this.renderArchitectureBlueprint(activeArea);
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

  // 3. Git Terminal & Branch Visualizer
  renderGitSimulator(el) {
    let commits = [
      { id: "c1", msg: "Initial commit", branch: "main" },
      { id: "c2", msg: "Add profile HTML", branch: "main" }
    ];

    const drawGraph = () => {
      const svg = el.querySelector("#git-svg");
      svg.innerHTML = "";
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
          <text x="${cx}" y="${cy + 25}" fill="#9CA3AF" font-size="10" text-anchor="middle">${c.msg.substring(0, 10)}...</text>
        `;
      });
    };

    el.innerHTML = `
      <div class="git-visualizer-container">
        <svg id="git-svg" class="git-graph-svg"></svg>
        <div class="git-terminal-input">
          <span style="color:var(--primary-accent);">$</span>
          <input type="text" class="git-cmd-input" id="git-input" placeholder="Type: git commit -m &quot;my feature&quot; or git checkout -b feature" />
        </div>
        <p class="text-muted" style="font-size:0.75rem; margin-top:0.5rem;">Try typing: <code style="cursor:pointer;" onclick="document.getElementById('git-input').value='git commit -m &quot;Add navbar&quot;'">git commit -m "Add navbar"</code> or <code>git checkout -b feature-darkmode</code></p>
      </div>
    `;

    drawGraph();

    const input = el.querySelector("#git-input");
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value.trim();
        if (val.startsWith("git commit")) {
          const msg = val.split("-m")[1]?.replace(/['"]/g, "").trim() || "Commit";
          const currentBranch = commits[commits.length - 1].branch;
          commits.push({ id: `c${commits.length + 1}`, msg, branch: currentBranch });
          drawGraph();
          input.value = "";
        } else if (val.includes("checkout -b")) {
          const bName = val.split("-b")[1]?.trim() || "feature";
          commits.push({ id: `c${commits.length + 1}`, msg: `Branch: ${bName}`, branch: bName });
          drawGraph();
          input.value = "";
        }
      }
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
    });
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

    const colors = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"];

    const update = () => {
      const val = input.value;
      charCount.textContent = val.length;
      const words = val.split(/(\s+|[.,!?:;{}[\]()])/).filter(Boolean);
      tokCount.textContent = words.length;
      
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
    el.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div style="background:var(--bg-dark); border:1px solid #EF4444; border-radius:var(--radius-md); padding:1rem;">
          <h5 style="color:#EF4444;">❌ Vague Prompt</h5>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">"Fix my navigation bar, it looks broken on phone."</p>
          <hr style="border-color:var(--border-color); margin:0.75rem 0;" />
          <p style="font-size:0.78rem; color:#EF4444;">AI Result: Model guesses CSS rules, breaks desktop layout, introduces random flex settings.</p>
        </div>
        <div style="background:var(--bg-dark); border:1px solid var(--success-accent); border-radius:var(--radius-md); padding:1rem;">
          <h5 style="color:var(--success-accent);">✅ Engineered Prompt</h5>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">"The \`<nav>\` menu on screens under 600px width overlaps the logo. Add a media query in \`style.css\` to switch flex-direction to column without touching desktop styles."</p>
          <hr style="border-color:var(--border-color); margin:0.75rem 0;" />
          <p style="font-size:0.78rem; color:var(--success-accent);">AI Result: Exact CSS diff produced targeting \`@media (max-width: 600px)\` with 100% precision.</p>
        </div>
      </div>
    `;
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
      </div>
    `;
  }
};
