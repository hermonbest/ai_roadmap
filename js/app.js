// Application Controller & State Store — Enhanced Edition

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    currentStageId: "stage-1",
    completedStages: JSON.parse(localStorage.getItem("ai_course_completed_stages") || "[]"),
    bookmarks: JSON.parse(localStorage.getItem("ai_course_bookmarks") || "[]"),
    quizScores: JSON.parse(localStorage.getItem("ai_course_quiz_scores") || "{}"),
    theme: localStorage.getItem("ai_course_theme") || "dark",
    welcomeSeen: localStorage.getItem("ai_course_welcome_seen") === "true"
  };

  // DOM Elements
  const stageNavContainer = document.getElementById("stage-nav-list");
  const mainViewport = document.getElementById("main-viewport");
  const commandModal = document.getElementById("command-modal");
  const commandInput = document.getElementById("command-input");
  const commandResults = document.getElementById("command-results");
  const searchTriggerBtn = document.getElementById("search-trigger-btn");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const progressRingFill = document.getElementById("progress-ring-fill");
  const progressRingText = document.getElementById("progress-ring-text");
  const sidebarProgressFill = document.getElementById("sidebar-progress-fill");
  const sidebarProgressLabel = document.getElementById("sidebar-progress-label");
  const sidebarBookmarksBtn = document.getElementById("sidebar-bookmarks-btn");
  const sidebarResetBtn = document.getElementById("sidebar-reset-btn");
  const welcomeOverlay = document.getElementById("welcome-overlay");
  const welcomeStartBtn = document.getElementById("welcome-start-btn");

  // ============ Welcome Overlay ============
  function initWelcome() {
    if (state.welcomeSeen) {
      welcomeOverlay.classList.add("hidden");
    }
    welcomeStartBtn.addEventListener("click", () => {
      welcomeOverlay.classList.add("hidden");
      state.welcomeSeen = true;
      localStorage.setItem("ai_course_welcome_seen", "true");
    });
    // Also close on backdrop click
    welcomeOverlay.addEventListener("click", (e) => {
      if (e.target === welcomeOverlay) {
        welcomeOverlay.classList.add("hidden");
        state.welcomeSeen = true;
        localStorage.setItem("ai_course_welcome_seen", "true");
      }
    });
  }

  // ============ Theme Toggle ============
  function initTheme() {
    applyTheme();
    themeToggleBtn.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("ai_course_theme", state.theme);
      applyTheme();
    });
  }

  function applyTheme() {
    if (state.theme === "light") {
      document.body.classList.add("light-theme");
      themeIcon.textContent = "☀️";
    } else {
      document.body.classList.remove("light-theme");
      themeIcon.textContent = "🌙";
    }
  }

  // ============ Mobile Sidebar Toggle ============
  function initMobileSidebar() {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("mobile-open");
      hamburgerBtn.classList.toggle("active", isOpen);
    });

    sidebarOverlay.addEventListener("click", closeMobileSidebar);
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("mobile-open");
    hamburgerBtn.classList.remove("active");
  }

  // ============ Progress Tracking ============
  function updateProgress() {
    const total = window.COURSE_DATA.length;
    const completed = state.completedStages.length;
    const pct = Math.round((completed / total) * 100);

    // Ring progress
    const circumference = 2 * Math.PI * 14; // r=14
    const offset = circumference - (pct / 100) * circumference;
    progressRingFill.style.strokeDashoffset = offset;
    progressRingText.textContent = pct + "%";

    // Sidebar progress bar
    sidebarProgressFill.style.width = pct + "%";
    sidebarProgressLabel.textContent = `${completed} of ${total} stages complete`;
  }

  // ============ Bookmarks Panel ============
  let bookmarksPanel = null;

  function initBookmarksPanel() {
    bookmarksPanel = document.createElement("div");
    bookmarksPanel.className = "bookmarks-panel";
    bookmarksPanel.id = "bookmarks-panel";
    bookmarksPanel.innerHTML = `
      <div class="bookmarks-panel-header">
        <span class="bookmarks-panel-title">🔖 Bookmarked Lessons</span>
        <button class="bookmarks-panel-close" id="bookmarks-panel-close">✕</button>
      </div>
      <div id="bookmarks-list"></div>
    `;
    document.body.appendChild(bookmarksPanel);

    document.getElementById("bookmarks-panel-close").addEventListener("click", () => {
      bookmarksPanel.classList.remove("open");
    });

    sidebarBookmarksBtn.addEventListener("click", () => {
      renderBookmarksList();
      bookmarksPanel.classList.toggle("open");
    });
  }

  function renderBookmarksList() {
    const listEl = document.getElementById("bookmarks-list");
    if (state.bookmarks.length === 0) {
      listEl.innerHTML = `<div class="bookmarks-empty">No bookmarks yet. Click the 🔖 icon on any lesson to save it here.</div>`;
      return;
    }

    listEl.innerHTML = state.bookmarks.map((bm) => {
      const stage = window.COURSE_DATA.find((s) => s.id === bm.stageId);
      return `
        <div class="bookmark-item" data-stage-id="${bm.stageId}" data-lesson-title="${bm.lessonTitle}">
          <div class="bookmark-item-stage">${stage ? `Stage ${stage.number}: ${stage.title}` : ""}</div>
          <div class="bookmark-item-title">${bm.lessonTitle}</div>
        </div>
      `;
    }).join("");

    listEl.querySelectorAll(".bookmark-item").forEach((el) => {
      el.addEventListener("click", () => {
        const stageId = el.getAttribute("data-stage-id");
        bookmarksPanel.classList.remove("open");
        switchStage(stageId);
      });
    });
  }

  function toggleBookmark(stageId, lessonTitle) {
    const idx = state.bookmarks.findIndex((bm) => bm.stageId === stageId && bm.lessonTitle === lessonTitle);
    if (idx >= 0) {
      state.bookmarks.splice(idx, 1);
    } else {
      state.bookmarks.push({ stageId, lessonTitle });
    }
    localStorage.setItem("ai_course_bookmarks", JSON.stringify(state.bookmarks));
  }

  function isBookmarked(stageId, lessonTitle) {
    return state.bookmarks.some((bm) => bm.stageId === stageId && bm.lessonTitle === lessonTitle);
  }

  // ============ Reset Progress ============
  function initResetProgress() {
    sidebarResetBtn.addEventListener("click", () => {
      if (confirm("Reset all progress, quiz scores, and bookmarks? This cannot be undone.")) {
        state.completedStages = [];
        state.bookmarks = [];
        state.quizScores = {};
        localStorage.removeItem("ai_course_completed_stages");
        localStorage.removeItem("ai_course_bookmarks");
        localStorage.removeItem("ai_course_quiz_scores");
        updateProgress();
        renderSidebar();
        renderStage(state.currentStageId);
      }
    });
  }

  // ============ 1. Render Sidebar Navigation ============
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
        closeMobileSidebar();
      });
    });
  }

  // ============ Helper: Format Markdown Content to HTML ============
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

      // Blockquote (> text)
      const isBlockquote = lines.every(line => line.startsWith("> "));
      if (isBlockquote) {
        const content = lines.map(l => l.substring(2)).join(" ");
        return `<blockquote style="border-left:3px solid var(--primary-accent);padding:0.5rem 1rem;margin:1rem 0;color:var(--text-muted);font-style:italic;">${parseInline(content)}</blockquote>`;
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

    // Step 1: Protect inline code spans by extracting them with HTML escaping
    const codeParts = [];
    let processed = text.replace(/`([^`]+)`/g, (match, code) => {
      const idx = codeParts.length;
      // Escape HTML inside code so <p> displays as text, not as an element
      codeParts.push('<code>' + escapeHtml(code) + '</code>');
      return `\x00CODE${idx}\x00`;
    });

    // Step 2: Escape bare HTML tags that aren't in backticks (e.g., <p>, </div>)
    // These would otherwise be interpreted as real HTML elements by the browser
    processed = processed.replace(/<(\/?\w[a-zA-Z0-9]*(?:\s[^>]*)?)>/g, '&lt;$1&gt;');

    // Step 3: Process markdown inline formatting
    processed = processed
      // Links: [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
        const ytWatchRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const ytMatch = url.match(ytWatchRegex);

        if (ytMatch && ytMatch[1]) {
          const videoId = ytMatch[1];
          return `
            <div class="video-embed-card">
              <div class="video-embed-header">
                <span class="video-icon">📺</span>
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="video-link">${linkText} <span class="video-external-link">(Open on YouTube ↗)</span></a>
              </div>
              <div class="video-body visible">
                <div class="video-iframe-wrapper">
                  <iframe src="https://www.youtube.com/embed/${videoId}"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen></iframe>
                </div>
              </div>
            </div>
          `;
        }

        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      })
      // Bold: **bold**
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italics: *italics*
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Step 4: Restore inline code spans
    codeParts.forEach((code, idx) => {
      processed = processed.replace(`\x00CODE${idx}\x00`, code);
    });

    return processed;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ============ 2. Render Main Stage View ============
  function renderStage(stageId) {
    const stage = window.COURSE_DATA.find((s) => s.id === stageId);
    if (!stage) return;

    state.currentStageId = stageId;
    renderSidebar();

    const isCompleted = state.completedStages.includes(stageId);
    const stageIndex = window.COURSE_DATA.findIndex((s) => s.id === stageId);
    const prevStage = stageIndex > 0 ? window.COURSE_DATA[stageIndex - 1] : null;
    const nextStage = stageIndex < window.COURSE_DATA.length - 1 ? window.COURSE_DATA[stageIndex + 1] : null;

    mainViewport.innerHTML = `
      <div class="stage-hero">
        <div class="stage-tag">
          <span>STAGE ${stage.number}</span> • <span>${stage.modules.length} MODULES</span>
          ${isCompleted ? '<span style="margin-left:0.5rem; color:var(--success-accent);">✓ COMPLETED</span>' : ''}
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
          ${module.lessons.map((lesson) => {
            const ill = lesson.illustration;
            let illHtml = "";
            if (ill) {
              if (ill.type === "interactive") {
                illHtml = `<div class="lesson-illustration interactive-visual">${ill.html}</div>`;
              } else {
                illHtml = `
                  <div class="lesson-illustration">
                    <figure>
                      <img src="${ill.src}" alt="${ill.alt}" loading="lazy">
                      ${ill.caption ? `<figcaption>${ill.caption}</figcaption>` : ""}
                    </figure>
                  </div>
                `;
              }
            }
            const bmActive = isBookmarked(stageId, lesson.title);
            return `
              <div class="lesson-block">
                <button class="lesson-bookmark-btn ${bmActive ? 'active' : ''}" data-lesson-title="${lesson.title}" title="${bmActive ? 'Remove bookmark' : 'Bookmark this lesson'}">
                  ${bmActive ? '🔖' : '🏷️'} ${bmActive ? 'Bookmarked' : 'Bookmark'}
                </button>
                <h3 class="lesson-title">${lesson.title}</h3>
                <div class="lesson-body">${formatMarkdown(lesson.content)}</div>
                ${illHtml}
              </div>
            `;
          }).join("")}
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

      <!-- Next/Previous Stage Navigation -->
      <div class="stage-nav-buttons">
        ${prevStage ? `
          <button class="stage-nav-btn prev" data-stage-id="${prevStage.id}">
            <div>
              <div class="stage-nav-btn-label">← Previous Stage</div>
              <div class="stage-nav-btn-title">Stage ${prevStage.number}: ${prevStage.title}</div>
            </div>
          </button>
        ` : '<div></div>'}
        ${nextStage ? `
          <button class="stage-nav-btn next" data-stage-id="${nextStage.id}">
            <div>
              <div class="stage-nav-btn-label">Next Stage →</div>
              <div class="stage-nav-btn-title">Stage ${nextStage.number}: ${nextStage.title}</div>
            </div>
          </button>
        ` : `
          <button class="stage-nav-btn next" disabled style="opacity:0.5;cursor:default;">
            <div>
              <div class="stage-nav-btn-label">🎉 You've reached the end!</div>
              <div class="stage-nav-btn-title">Course Complete</div>
            </div>
          </button>
        `}
      </div>
    `;

    // Render Lesson Illustrations
    mainViewport.querySelectorAll(".lesson-illustration.interactive-visual").forEach((el) => {
      wireInteractiveVisual(el);
    });

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
      updateProgress();
      renderStage(stageId);
    });

    // Bookmark Button Handlers
    mainViewport.querySelectorAll(".lesson-bookmark-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lessonTitle = btn.getAttribute("data-lesson-title");
        toggleBookmark(stageId, lessonTitle);
        const bmActive = isBookmarked(stageId, lessonTitle);
        btn.classList.toggle("active", bmActive);
        btn.innerHTML = `${bmActive ? '🔖' : '🏷️'} ${bmActive ? 'Bookmarked' : 'Bookmark'}`;
        btn.title = bmActive ? 'Remove bookmark' : 'Bookmark this lesson';
      });
    });

    // Next/Previous Stage Navigation
    mainViewport.querySelectorAll(".stage-nav-btn[data-stage-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-stage-id");
        switchStage(id);
      });
    });

    // Render Quiz
    renderQuiz(stage);

    // Scroll to top
    scrollToTop();
  }

  // Resets the page to the top.
  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // Wire the interactive house-light toggle.
  function wireInteractiveVisual(container) {
    const toggle = container.querySelector("#light-toggle");
    if (!toggle) return;
    toggle.removeAttribute("onchange");
    toggle.addEventListener("change", () => {
      const on = toggle.checked;
      const glow = container.querySelector("#bulb-glow");
      const bulb = container.querySelector("#bulb");
      const windowEl = container.querySelector("#window");
      if (glow) {
        glow.setAttribute("opacity", on ? "0.7" : "0");
        glow.classList.toggle("on", on);
      }
      if (bulb) bulb.setAttribute("fill", on ? "#F2A623" : "var(--surface-1)");
      if (windowEl) windowEl.setAttribute("fill", on ? "#FAEEDA" : "var(--surface-0)");
    });
  }

  // ============ 3. Enhanced Quiz Engine with Scoring ============
  function renderQuiz(stage) {
    const container = document.getElementById("quiz-container");
    if (!stage.quiz || !container) return;

    const previousScore = state.quizScores[stage.id];

    container.innerHTML = stage.quiz.map((q, qIdx) => `
      <div class="quiz-question-card" data-qidx="${qIdx}">
        <p style="font-weight:600; font-size:1.05rem; margin-bottom:0.75rem;">Question ${qIdx + 1} of ${stage.quiz.length}: ${q.question}</p>
        <div>
          ${q.options.map((opt, oIdx) => `
            <button class="quiz-option-btn" data-oidx="${oIdx}">${String.fromCharCode(65 + oIdx)}. ${opt}</button>
          `).join("")}
        </div>
        <div class="quiz-explanation" style="display:none;"></div>
      </div>
    `).join("") + `
      <div class="quiz-summary" id="quiz-summary" style="display:none;"></div>
    `;

    let answered = 0;
    let correct = 0;

    container.querySelectorAll(".quiz-question-card").forEach((card) => {
      const qIdx = parseInt(card.getAttribute("data-qidx"));
      const question = stage.quiz[qIdx];
      const explanationEl = card.querySelector(".quiz-explanation");

      card.querySelectorAll(".quiz-option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const oIdx = parseInt(btn.getAttribute("data-oidx"));

          // Disable further clicks on this question
          card.querySelectorAll(".quiz-option-btn").forEach((b) => b.disabled = true);

          answered++;
          if (oIdx === question.answer) {
            correct++;
            btn.classList.add("correct");
            explanationEl.innerHTML = `<strong style="color:var(--success-accent);">✓ Correct!</strong> ${question.explanation}`;
          } else {
            btn.classList.add("wrong");
            card.querySelectorAll(".quiz-option-btn")[question.answer].classList.add("correct");
            explanationEl.innerHTML = `<strong style="color:#EF4444;">✗ Incorrect.</strong> ${question.explanation}`;
          }
          explanationEl.style.display = "block";

          // Show summary when all questions are answered
          if (answered === stage.quiz.length) {
            showQuizSummary(stage, correct, answered);
          }
        });
      });
    });

    // Show previous score if exists
    if (previousScore !== undefined) {
      const prevSummary = document.getElementById("quiz-summary");
      prevSummary.style.display = "block";
      prevSummary.innerHTML = `
        <div class="quiz-summary-label">Your previous score</div>
        <div class="quiz-summary-score ${previousScore === stage.quiz.length ? 'perfect' : previousScore >= stage.quiz.length / 2 ? 'good' : 'needs-work'}">
          ${previousScore}/${stage.quiz.length}
        </div>
        <button class="quiz-retake-btn" id="quiz-retake-btn">Retake Quiz</button>
      `;
      document.getElementById("quiz-retake-btn").addEventListener("click", () => {
        prevSummary.style.display = "none";
        // Re-enable all quiz buttons
        container.querySelectorAll(".quiz-option-btn").forEach((b) => {
          b.disabled = false;
          b.classList.remove("correct", "wrong");
        });
        container.querySelectorAll(".quiz-explanation").forEach((e) => e.style.display = "none");
        answered = 0;
        correct = 0;
      });
    }
  }

  function showQuizSummary(stage, correct, total) {
    const summaryEl = document.getElementById("quiz-summary");
    if (!summaryEl) return;

    // Save score
    state.quizScores[stage.id] = correct;
    localStorage.setItem("ai_course_quiz_scores", JSON.stringify(state.quizScores));

    const pct = Math.round((correct / total) * 100);
    let scoreClass = "needs-work";
    let message = "Keep studying! Review the lessons above and try again.";
    if (pct === 100) {
      scoreClass = "perfect";
      message = "Perfect score! You've mastered this stage. 🎉";
    } else if (pct >= 66) {
      scoreClass = "good";
      message = "Great job! Review the ones you missed and you'll nail it.";
    }

    summaryEl.style.display = "block";
    summaryEl.innerHTML = `
      <div class="quiz-summary-score ${scoreClass}">${correct}/${total}</div>
      <div class="quiz-summary-label">${message}</div>
      <button class="quiz-retake-btn" id="quiz-retake-btn">↺ Retake Quiz</button>
    `;

    document.getElementById("quiz-retake-btn").addEventListener("click", () => {
      renderQuiz(stage);
    });

    // Scroll to summary
    summaryEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function switchStage(stageId) {
    scrollToTop();
    renderStage(stageId);
  }

  // ============ 4. Command Palette (Ctrl+K) Search Engine ============
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
        commandResults.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-dim);">No results found for "${escapeHtml(query)}"</div>`;
        return;
      }

      commandResults.innerHTML = results.slice(0, 8).map((res) => `
        <div class="search-result-item" data-stage-id="${res.stageId}">
          <div class="search-result-title">${res.lessonTitle}</div>
          <div style="font-size:0.75rem; color:var(--text-dim);">${res.stageTitle}</div>
          <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">${escapeHtml(res.snippet)}</div>
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

  // ============ Initialize Everything ============
  initWelcome();
  initTheme();
  initMobileSidebar();
  initBookmarksPanel();
  initResetProgress();
  renderSidebar();
  renderStage("stage-1");
  setupSearch();
  updateProgress();
});
