// Application Controller & State Store

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    currentStageId: "stage-1",
    completedStages: JSON.parse(localStorage.getItem("ai_course_completed_stages") || "[]"),
    bookmarks: JSON.parse(localStorage.getItem("ai_course_bookmarks") || "[]"),
    quizScores: JSON.parse(localStorage.getItem("ai_course_quiz_scores") || "{}")
  };

  // DOM Elements
  const stageNavContainer = document.getElementById("stage-nav-list");
  const mainViewport = document.getElementById("main-viewport");
  const commandModal = document.getElementById("command-modal");
  const commandInput = document.getElementById("command-input");
  const commandResults = document.getElementById("command-results");
  const searchTriggerBtn = document.getElementById("search-trigger-btn");

  // 1. Render Sidebar Navigation
  function renderSidebar() {
    stageNavContainer.innerHTML = window.COURSE_DATA.map((stage) => {
      const isActive = stage.id === state.currentStageId;
      const isCompleted = state.completedStages.includes(stage.id);

      return `
        <div class="stage-nav-item ${isActive ? 'active' : ''}" data-stage-id="${stage.id}">
          <div class="stage-num-badge" style="${isCompleted ? 'background:var(--success-accent); color:#FFF;' : ''}">
            ${isCompleted ? '✓' : stage.number}
          </div>
          <div class="stage-nav-info">
            <span class="stage-nav-name">Stage ${stage.number}: ${stage.title}</span>
            <span class="stage-nav-progress">${stage.modules.length} Modules</span>
          </div>
        </div>
      `;
    }).join("");

    // Attach Click Handlers
    stageNavContainer.querySelectorAll(".stage-nav-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-stage-id");
        switchStage(id);
      });
    });
  }

  // Helper: Format Markdown Content to HTML
  function formatMarkdown(text) {
    if (!text) return "";
    
    // 1. Extract and safeguard code blocks
    const codeBlocks = [];
    let processedText = text.replace(/```(javascript|html|css|bash)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const id = codeBlocks.length;
      codeBlocks.push(`<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`);
      return `\n\n<!--CODEBLOCK_${id}-->\n\n`;
    });

    // 2. Split into structural blocks (paragraphs, lists, headings)
    const blocks = processedText.split(/\n\n+/);
    const renderedBlocks = blocks.map(block => {
      let trimmed = block.trim();
      if (!trimmed) return "";

      // Check if it's a code block placeholder
      if (trimmed.startsWith("<!--CODEBLOCK_") && trimmed.endsWith("-->")) {
        return trimmed;
      }

      // Headers
      if (trimmed.startsWith("### ")) {
        return `<h3>${parseInline(trimmed.substring(4))}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2>${parseInline(trimmed.substring(3))}</h2>`;
      }
      if (trimmed.startsWith("# ")) {
        return `<h1>${parseInline(trimmed.substring(2))}</h1>`;
      }

      const lines = trimmed.split("\n");

      // Bullet List
      const isBulletList = lines.every(line => /^\s*[-*]\s+/.test(line));
      if (isBulletList) {
        const listItems = lines.map(line => {
          const content = line.replace(/^\s*[-*]\s+/, "");
          return `<li>${parseInline(content)}</li>`;
        }).join("");
        return `<ul>${listItems}</ul>`;
      }

      // Numbered List
      const isNumberedList = lines.every(line => /^\s*\d+\.\s+/.test(line));
      if (isNumberedList) {
        const listItems = lines.map(line => {
          const content = line.replace(/^\s*\d+\.\s+/, "");
          return `<li>${parseInline(content)}</li>`;
        }).join("");
        return `<ol>${listItems}</ol>`;
      }

      // Default Paragraph
      return `<p>${parseInline(trimmed)}</p>`;
    });

    let finalHtml = renderedBlocks.filter(Boolean).join("\n");

    // 3. Put code blocks back
    codeBlocks.forEach((codeHtml, idx) => {
      finalHtml = finalHtml.replace(`<!--CODEBLOCK_${idx}-->`, codeHtml);
    });

    return finalHtml;
  }

  // Parse inline elements (bold, links, code, italics)
  function parseInline(text) {
    if (!text) return "";
    return text
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
        // Check if it's a YouTube URL
        const ytWatchRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const ytMatch = url.match(ytWatchRegex);
        
        if (ytMatch && ytMatch[1]) {
          const videoId = ytMatch[1];
          return `
            <div class="video-embed-card">
              <div class="video-embed-header">
                <span class="video-icon">📺</span>
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="video-link">${linkText} <span style="font-size:0.75rem; color:var(--secondary-accent); font-weight:normal;">(Open on YouTube ↗)</span></a>
              </div>
              <div class="video-body" style="display:block;">
                <div class="video-iframe-wrapper" style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:10px; border:1px solid var(--border-color); margin-top:0.75rem;">
                  <iframe src="https://www.youtube.com/embed/${videoId}" 
                          style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowfullscreen></iframe>
                </div>
              </div>
            </div>
          `;
        }
        
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      })
      // Inline Code: `code`
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Bold: **bold**
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italics: *italics*
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // 2. Render Main Stage View
  function renderStage(stageId) {
    const stage = window.COURSE_DATA.find((s) => s.id === stageId);
    if (!stage) return;

    state.currentStageId = stageId;
    renderSidebar();

    const isCompleted = state.completedStages.includes(stageId);

    mainViewport.innerHTML = `
      <div class="stage-hero">
        <div class="stage-tag">
          <span>STAGE ${stage.number}</span> • <span>${stage.modules.length} MODULES</span>
        </div>
        <h1 class="stage-title">${stage.title}</h1>
        <p class="stage-subtitle">${stage.subtitle}</p>
        <button id="toggle-complete-btn" class="api-btn" style="margin-top:1.25rem; background:${isCompleted ? 'var(--success-accent)' : 'var(--primary-accent)'}">
          ${isCompleted ? '✓ Stage Completed' : 'Mark Stage as Complete'}
        </button>
      </div>

      <div id="interactive-lab-mount"></div>

      ${stage.modules.map((module) => `
        <div class="module-card">
          <h2 class="module-title">${module.title}</h2>
          ${module.lessons.map((lesson) => `
            <div class="lesson-block">
              <h3 class="lesson-title">${lesson.title}</h3>
              <div class="lesson-body">${formatMarkdown(lesson.content)}</div>
            </div>
          `).join("")}
        </div>
      `).join("")}

      <!-- Interactive Quiz Section -->
      <div class="quiz-section">
        <div class="lab-header">
          <h3>Stage ${stage.number} Knowledge Check</h3>
          <span class="lab-badge">QUIZ</span>
        </div>
        <div id="quiz-container"></div>
      </div>
    `;

    // Mount Interactive Laboratory Widget
    const labMount = document.getElementById("interactive-lab-mount");
    if (window.WIDGET_SUITE && labMount) {
      window.WIDGET_SUITE.renderWidget(stage, labMount);
    }

    // Stage Complete Button Handler
    document.getElementById("toggle-complete-btn").addEventListener("click", () => {
      if (state.completedStages.includes(stageId)) {
        state.completedStages = state.completedStages.filter((id) => id !== stageId);
      } else {
        state.completedStages.push(stageId);
      }
      localStorage.setItem("ai_course_completed_stages", JSON.stringify(state.completedStages));
      renderStage(stageId);
    });

    // Render Quiz
    renderQuiz(stage);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 3. Render Interactive Quiz Engine
  function renderQuiz(stage) {
    const container = document.getElementById("quiz-container");
    if (!stage.quiz || !container) return;

    container.innerHTML = stage.quiz.map((q, qIdx) => `
      <div class="quiz-question-card" data-qidx="${qIdx}">
        <p style="font-weight:600; font-size:1.05rem; margin-bottom:0.75rem;">Question ${qIdx + 1}: ${q.question}</p>
        <div>
          ${q.options.map((opt, oIdx) => `
            <button class="quiz-option-btn" data-oidx="${oIdx}">${opt}</button>
          `).join("")}
        </div>
        <div class="quiz-explanation" style="display:none;"></div>
      </div>
    `).join("");

    container.querySelectorAll(".quiz-question-card").forEach((card) => {
      const qIdx = parseInt(card.getAttribute("data-qidx"));
      const question = stage.quiz[qIdx];
      const explanationEl = card.querySelector(".quiz-explanation");

      card.querySelectorAll(".quiz-option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const oIdx = parseInt(btn.getAttribute("data-oidx"));

          // Disable further clicks on this question
          card.querySelectorAll(".quiz-option-btn").forEach((b) => b.disabled = true);

          if (oIdx === question.answer) {
            btn.classList.add("correct");
            explanationEl.innerHTML = `<strong style="color:var(--success-accent);">Correct!</strong> ${question.explanation}`;
          } else {
            btn.classList.add("wrong");
            card.querySelectorAll(".quiz-option-btn")[question.answer].classList.add("correct");
            explanationEl.innerHTML = `<strong style="color:#EF4444;">Incorrect.</strong> ${question.explanation}`;
          }
          explanationEl.style.display = "block";
        });
      });
    });
  }

  function switchStage(stageId) {
    renderStage(stageId);
  }

  // 4. Command Palette (Ctrl+K) Search Engine
  function setupSearch() {
    function openModal() {
      commandModal.classList.add("open");
      commandInput.focus();
      renderSearchResults("");
    }

    function closeModal() {
      commandModal.classList.remove("open");
      commandInput.value = "";
    }

    searchTriggerBtn.addEventListener("click", openModal);
    commandModal.addEventListener("click", (e) => {
      if (e.target === commandModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        commandModal.classList.contains("open") ? closeModal() : openModal();
      }
      if (e.key === "Escape" && commandModal.classList.contains("open")) {
        closeModal();
      }
    });

    commandInput.addEventListener("input", (e) => {
      renderSearchResults(e.target.value.toLowerCase().trim());
    });

    function renderSearchResults(query) {
      if (!query) {
        commandResults.innerHTML = `
          <div style="padding:1.5rem; text-align:center; color:var(--text-dim); font-size:0.88rem;">
            Type to search across all 7 stages, modules, and lessons...
          </div>
        `;
        return;
      }

      const results = [];
      window.COURSE_DATA.forEach((stage) => {
        stage.modules.forEach((mod) => {
          mod.lessons.forEach((les) => {
            if (les.title.toLowerCase().includes(query) || les.content.toLowerCase().includes(query)) {
              results.push({
                stageId: stage.id,
                stageTitle: `Stage ${stage.number}: ${stage.title}`,
                lessonTitle: les.title,
                snippet: les.content.substring(0, 90) + "..."
              });
            }
          });
        });
      });

      if (results.length === 0) {
        commandResults.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-dim);">No results found for "${query}"</div>`;
        return;
      }

      commandResults.innerHTML = results.slice(0, 8).map((res) => `
        <div class="search-result-item" data-stage-id="${res.stageId}">
          <div class="search-result-title">${res.lessonTitle}</div>
          <div style="font-size:0.75rem; color:var(--text-dim);">${res.stageTitle}</div>
          <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">${res.snippet}</div>
        </div>
      `).join("");

      commandResults.querySelectorAll(".search-result-item").forEach((el) => {
        el.addEventListener("click", () => {
          const id = el.getAttribute("data-stage-id");
          closeModal();
          switchStage(id);
        });
      });
    }
  }

  // Initialize App
  renderSidebar();
  renderStage("stage-1");
  setupSearch();
});
