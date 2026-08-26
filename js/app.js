// Application Controller & State Store — Enhanced Edition

document.addEventListener("DOMContentLoaded", () => {
  const state = {
    currentStageId: "stage-1",
    completedStages: JSON.parse(localStorage.getItem("ai_course_completed_stages") || "[]"),
    bookmarks: JSON.parse(localStorage.getItem("ai_course_bookmarks") || "[]"),
    quizScores: JSON.parse(localStorage.getItem("ai_course_quiz_scores") || "{}"),
    theme: localStorage.getItem("ai_course_theme") || "dark",
    welcomeSeen: localStorage.getItem("ai_course_welcome_seen") === "true",
    activeRoadmap: localStorage.getItem("ai_course_active_roadmap") || "course",
    lastStages: JSON.parse(localStorage.getItem("ai_course_last_stages") || "{}")
  };

  // ============ Roadmap Loader & Meta ============
  function getRoadmap() {
    if (state.activeRoadmap === "vibe" && window.VIBE_ROADMAP) {
      return window.VIBE_ROADMAP;
    }
    return { id: "course", label: "Full Course", minimal: false, stages: window.COURSE_DATA };
  }

  function isMinimalRoadmap() {
    return getRoadmap().minimal === true;
  }

  // ============ Enrichment Layer (interactive blocks + new lessons/modules) ============
  // Merges course-enrichment.js into COURSE_DATA exactly once, before first render.
  let enrichmentApplied = false;
  function applyEnrichment() {
    if (enrichmentApplied) return;
    const E = window.COURSE_ENRICHMENT;
    if (E && Array.isArray(window.COURSE_DATA)) {
      window.COURSE_DATA.forEach((stage) => {
        const extraModules = (E.modulesByStage && E.modulesByStage[stage.id]) || [];
        extraModules.forEach((mod) => stage.modules.push(mod));
        stage.modules.forEach((module) => {
          const extras = E.extraLessonsByModule && E.extraLessonsByModule[module.title];
          if (extras) module.lessons.push(...extras);
          module.lessons.forEach((lesson) => {
            const blocks = E.blocksByLesson && E.blocksByLesson[lesson.title];
            if (blocks) lesson.interactive = blocks;
          });
        });
      });
    }
    enrichmentApplied = true;
  }

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
  // The course-opening "Hello World" origin hero now IS the intro, so the
  // one-time splash is bypassed to open straight onto it.
  function initWelcome() {
    welcomeOverlay.classList.add("hidden");
    state.welcomeSeen = true;
    localStorage.setItem("ai_course_welcome_seen", "true");
    welcomeStartBtn.addEventListener("click", () => {
      welcomeOverlay.classList.add("hidden");
      state.welcomeSeen = true;
      localStorage.setItem("ai_course_welcome_seen", "true");
    });
    const welcomeVibeBtn = document.getElementById("welcome-vibe-btn");
    if (welcomeVibeBtn) {
      welcomeVibeBtn.addEventListener("click", () => {
        switchRoadmap("vibe");
        welcomeOverlay.classList.add("hidden");
        state.welcomeSeen = true;
        localStorage.setItem("ai_course_welcome_seen", "true");
      });
    }
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
      themeToggleBtn.setAttribute("aria-label", "Switch to dark theme (currently light theme)");
    } else {
      document.body.classList.remove("light-theme");
      themeIcon.textContent = "🌙";
      themeToggleBtn.setAttribute("aria-label", "Switch to light theme (currently dark theme)");
    }
  }

  // ============ Mobile Sidebar Toggle ============
  function initMobileSidebar() {
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("mobile-open");
      hamburgerBtn.classList.toggle("active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    sidebarOverlay.addEventListener("click", closeMobileSidebar);
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("mobile-open");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  // ============ Progress Tracking ============
  function updateProgress() {
    if (isMinimalRoadmap()) return;
    const total = getRoadmap().stages.length;
    const completed = state.completedStages.length;
    const pct = Math.round((completed / total) * 100);

    // Ring progress
    const circumference = 2 * Math.PI * 14; // r=14
    const offset = circumference - (pct / 100) * circumference;
    progressRingFill.style.strokeDashoffset = offset;
    progressRingText.textContent = pct + "%";

    // Sidebar progress bar
    sidebarProgressFill.style.transform = `scaleX(${pct / 100})`;
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
    const roadmap = getRoadmap();
    const titleEl = document.getElementById("sidebar-title-label");
    if (titleEl) titleEl.textContent = roadmap.minimal ? "Vibe Coding Stages" : "Course Roadmap Stages";
    stageNavContainer.innerHTML = roadmap.stages.map((stage) => {
      const isActive = stage.id === state.currentStageId;
      const isCompleted = !roadmap.minimal && state.completedStages.includes(stage.id);

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

    // Per-stage lesson progress counts (full roadmap only)
    if (!roadmap.minimal) {
      stageNavContainer.querySelectorAll(".stage-nav-item").forEach((el) => {
        const id = el.getAttribute("data-stage-id");
        const stage = roadmap.stages.find((s) => s.id === id);
        if (!stage || !countLessonsDone) return;
        const total = stage.modules.reduce((n, m) => n + m.lessons.filter(l => !/^Resources for/.test(l.title)).length, 0);
        if (!total) return;
        const doneCount = countLessonsDone(stage);
        const info = el.querySelector(".stage-nav-progress");
        if (info) info.textContent = `${doneCount}/${total} lessons · ${stage.modules.length} modules`;
      });
    }
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
        const trimmedUrl = url.trim();

        // Internal stage link: [text](#stage-id) — jumps to another stage of the active roadmap
        if (trimmedUrl.startsWith("#")) {
          const target = trimmedUrl.slice(1);
          return `<a href="#${target}" class="stage-link" data-nav-stage="${target}">${linkText}</a>`;
        }

        const ytWatchRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const ytMatch = trimmedUrl.match(ytWatchRegex);

        if (ytMatch && ytMatch[1]) {
          const videoId = ytMatch[1];
          return `
            <div class="video-embed-card">
              <div class="video-embed-header">
                <span class="video-icon">📺</span>
                <a href="${trimmedUrl}" target="_blank" rel="noopener noreferrer" class="video-link">${linkText} <span class="video-external-link">(Open on YouTube ↗)</span></a>
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

        // Links whose text is a domain/path (e.g. "docs.cursor.com", "trae.ai/download")
        // become pill-style "doc" links; plain-word links stay subtle text links.
        const looksLikeUrl = /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(linkText.trim());
        const linkClass = looksLikeUrl ? 'doc-pill' : 'text-link';
        return `<a href="${trimmedUrl}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${linkText}</a>`;
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

  // ============ Lesson-level progress ("Mark as learned") ============
  function loadLessonsDone() {
    try { return JSON.parse(localStorage.getItem("ai_course_lessons_done") || "{}"); }
    catch { return {}; }
  }
  let lessonsDone = loadLessonsDone();

  function isLessonDone(stageId, lessonTitle) {
    return !!(lessonsDone[stageId] && lessonsDone[stageId][lessonTitle]);
  }

  function countLessonsDone(stage) {
    return stage.modules.reduce((n, m) => n + m.lessons.filter(l => !/^Resources for/.test(l.title) && isLessonDone(stage.id, l.title)).length, 0);
  }

  function setLessonDone(stageId, lessonTitle, val) {
    if (!lessonsDone[stageId]) lessonsDone[stageId] = {};
    if (val) lessonsDone[stageId][lessonTitle] = true;
    else delete lessonsDone[stageId][lessonTitle];
    localStorage.setItem("ai_course_lessons_done", JSON.stringify(lessonsDone));
    renderSidebar(); // refresh per-stage counts
  }

  // ============ Table of Contents rail with scrollspy ============
  function buildTocRail(stage) {
    const entries = [];
    stage.modules.forEach((module, mi) => {
      const lessons = module.lessons.filter(l => !/^Resources for/.test(l.title));
      if (!lessons.length) return;
      entries.push({ type: "module", id: `module-${mi}`, label: module.title.replace(/^Module [\d.]+ — |^Project A — |^Closing Module — |^Capstone Module — /, "") });
      lessons.forEach((lesson, li) => {
        entries.push({ type: "lesson", id: `lesson-${mi}-${li}`, label: lesson.title.replace(/^Lesson \d+: /, ""), hasBlocks: !!(lesson.interactive && lesson.interactive.length) });
      });
    });
    if (!entries.length) return "";
    return `
      <nav class="toc-rail" aria-label="On this page">
        <div class="toc-title">On this page</div>
        ${entries.map(e => `
          <a href="#${e.id}" class="toc-link toc-${e.type}" data-toc-target="${e.id}">
            ${e.type === "lesson" && e.hasBlocks ? '<span class="toc-dot" title="Has an interactive exercise"></span>' : ''}
            ${e.label}
          </a>
        `).join("")}
      </nav>
    `;
  }

  function wireTocRail() {
    const rail = mainViewport.querySelector(".toc-rail");
    if (!rail) return;
    rail.querySelectorAll("[data-toc-target]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(link.getAttribute("data-toc-target"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    const links = Array.from(rail.querySelectorAll("[data-toc-target]"));
    const sections = links.map(l => document.getElementById(l.getAttribute("data-toc-target"))).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver((entriesList) => {
      entriesList.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => l.classList.toggle("active", l.getAttribute("data-toc-target") === entry.target.id));
      });
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }

  // ============ XP chip in the top nav ============
  function syncXpChip() {
    const chip = document.getElementById("xp-chip");
    const chipVal = document.getElementById("xp-chip-value");
    if (!chip || !chipVal || !window.LESSON_BLOCKS) return;
    const c = window.LESSON_BLOCKS.getCount();
    chip.title = `${window.LESSON_BLOCKS.getXP()} XP earned from interactive exercises`;
    if (c.total === 0) { chip.style.display = "none"; return; }
    chip.style.display = "";
    chipVal.textContent = `${c.done}/${c.total}`;
  }

  document.addEventListener("lessonblocks:changed", syncXpChip);

  // ============ Keyboard navigation: J/K jump between stages ============
  function initKeyboardNav() {
    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea, select") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== "j" && e.key !== "k") return;
      const roadmap = getRoadmap();
      const idx = roadmap.stages.findIndex(s => s.id === state.currentStageId);
      const nextIdx = e.key === "j" ? idx + 1 : idx - 1;
      if (nextIdx < 0 || nextIdx >= roadmap.stages.length) return;
      switchStage(roadmap.stages[nextIdx].id);
    });
  }

  // ============ 2. Render Main Stage View ============
  function renderStage(stageId) {
    const roadmap = getRoadmap();
    const stage = roadmap.stages.find((s) => s.id === stageId);
    if (!stage) return;

    state.currentStageId = stageId;
    state.lastStages[roadmap.id] = stageId;
    localStorage.setItem("ai_course_last_stages", JSON.stringify(state.lastStages));
    renderSidebar();

    const minimal = roadmap.minimal === true;
    const isCompleted = !minimal && state.completedStages.includes(stageId);
    const stageIndex = roadmap.stages.findIndex((s) => s.id === stageId);
    const prevStage = stageIndex > 0 ? roadmap.stages[stageIndex - 1] : null;
    const nextStage = stageIndex < roadmap.stages.length - 1 ? roadmap.stages[stageIndex + 1] : null;

    const lessonTotal = minimal ? 0 : stage.modules.reduce((n, m) => n + m.lessons.filter(l => !/^Resources for/.test(l.title)).length, 0);
    const lessonDone = minimal ? 0 : countLessonsDone(stage);

    mainViewport.innerHTML = `
      ${stageIndex === 0 && !minimal ? buildOriginHero() : ''}
      ${minimal ? '' : `<nav class="breadcrumb-trail" aria-label="Breadcrumb">
        <span class="crumb crumb-root">${roadmap.id === "vibe" ? "Vibe Coding" : "Full Course"}</span>
        <span class="crumb-sep">/</span>
        <a href="#" class="crumb" data-crumb-stage="${stageId}">Stage ${stage.number}</a>
        <span class="crumb-sep">/</span>
        <span class="crumb crumb-current">${stage.title}</span>
      </nav>`}
      <div class="stage-hero">
        <div class="stage-tag">
          <span>STAGE ${stage.number}</span> • <span>${stage.modules.length} MODULES</span>
          ${!minimal && lessonTotal ? `<span>• <span class="lesson-progress-inline">${lessonDone}/${lessonTotal} lessons</span></span>` : ''}
          ${isCompleted ? '<span style="margin-left:0.5rem; color:var(--success-accent);">✓ COMPLETED</span>' : ''}
        </div>
        <h1 class="stage-title">${stage.title}</h1>
        <p class="stage-subtitle">${stage.subtitle}</p>
        ${minimal ? '' : `<button id="toggle-complete-btn" class="api-btn" style="margin-top:1.25rem; background:${isCompleted ? 'var(--success-accent)' : 'var(--primary-accent)'}">
          ${isCompleted ? '✓ Stage Completed' : 'Mark Stage as Complete'}
        </button>`}
      </div>

      ${minimal ? '' : '<div id="interactive-lab-mount"></div>'}

      ${minimal ? '' : buildTocRail(stage)}

      ${stage.modules.map((module, modIdx) => `
        <div class="module-card" id="module-${modIdx}">
          <h2 class="module-title">${module.icon ? `<img class="module-title-icon" src="${module.icon}" alt="" loading="lazy">` : ""}${module.title}</h2>
          ${module.lessons.map((lesson, lessonIdx) => {
            const ill = lesson.illustration;
            let illHtml = "";
            if (ill) {
              if (ill.type === "interactive") {
                illHtml = `<div class="lesson-illustration interactive-visual">${ill.html}</div>`;
              } else {
                const illClass = ill.className ? ` lesson-illustration ${ill.className}` : " lesson-illustration";
                illHtml = `
                  <div class="${illClass.trim()}">
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
                ${minimal ? '' : `<button class="lesson-bookmark-btn ${bmActive ? 'active' : ''}" data-lesson-title="${lesson.title}" title="${bmActive ? 'Remove bookmark' : 'Bookmark this lesson'}">
                  ${bmActive ? '🔖' : '🏷️'} ${bmActive ? 'Bookmarked' : 'Bookmark'}
                </button>`}
                <div class="lesson-head-row" id="lesson-${modIdx}-${lessonIdx}">
                  <h3 class="lesson-title">${lesson.title}</h3>
                  ${minimal || /^Resources for/.test(lesson.title) ? '' : `<button class="lesson-done-btn ${isLessonDone(stageId, lesson.title) ? 'done' : ''}" data-done-lesson="${lesson.title}" aria-pressed="${isLessonDone(stageId, lesson.title)}">
                    <span class="done-check" aria-hidden="true">✓</span> ${isLessonDone(stageId, lesson.title) ? 'Learned' : 'Mark as learned'}
                  </button>`}
                </div>
                <div class="lesson-body">${formatMarkdown(lesson.content)}</div>
                ${illHtml}
                ${!minimal && lesson.interactive && lesson.interactive.length ? `<div class="lesson-blocks-mount" data-lesson-title="${lesson.title}"></div>` : ""}
              </div>
            `;
          }).join("")}
        </div>
      `).join("")}

      <!-- Interactive Quiz Section (hidden in minimal roadmaps) -->
      ${minimal ? '' : `<div class="quiz-section">
        <div class="lab-header">
          <h3>Stage ${stage.number} Knowledge Check</h3>
          <span class="lab-badge">QUIZ</span>
        </div>
        <div id="quiz-container"></div>
      </div>`}

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
              <div class="stage-nav-btn-title">${roadmap.minimal ? 'Roadmap Complete' : 'Course Complete'}</div>
            </div>
          </button>
        `}
      </div>
    `;

    // Render Lesson Illustrations
    mainViewport.querySelectorAll(".lesson-illustration.interactive-visual").forEach((el) => {
      wireInteractiveVisual(el);
    });

    // Mount in-lesson interactive blocks (checkpoints, challenges, predicts...)
    if (!minimal && window.LESSON_BLOCKS) {
      mainViewport.querySelectorAll(".lesson-blocks-mount").forEach((mountEl) => {
        const lessonTitle = mountEl.getAttribute("data-lesson-title");
        const mod = stage.modules.find((m) => m.lessons.some((l) => l.title === lessonTitle));
        const lesson = mod && mod.lessons.find((l) => l.title === lessonTitle);
        if (lesson && Array.isArray(lesson.interactive)) {
          window.LESSON_BLOCKS.mount(mountEl, lesson.interactive);
        }
      });
    }

    // Mount Interactive Laboratory Widget (not in minimal roadmaps)
    const labMount = document.getElementById("interactive-lab-mount");
    if (!minimal && window.WIDGET_SUITE && labMount) {
      window.WIDGET_SUITE.renderWidget(stage, labMount);
    }

    // Mount course-opening origin hero (runs the typewriter) on first stage
    if (!minimal && stageIndex === 0) mountOriginHero();

    // Stage Complete Button Handler
    const completeBtn = document.getElementById("toggle-complete-btn");
    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        if (state.completedStages.includes(stageId)) {
          state.completedStages = state.completedStages.filter((id) => id !== stageId);
        } else {
          state.completedStages.push(stageId);
        }
        localStorage.setItem("ai_course_completed_stages", JSON.stringify(state.completedStages));
        updateProgress();
        renderStage(stageId);
      });
    }

    // Bookmark Button Handlers
    if (!minimal) {
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

      // "Mark as learned" handlers
      mainViewport.querySelectorAll(".lesson-done-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const lessonTitle = btn.getAttribute("data-done-lesson");
          const nowDone = !isLessonDone(stageId, lessonTitle);
          setLessonDone(stageId, lessonTitle, nowDone);
          btn.classList.toggle("done", nowDone);
          btn.setAttribute("aria-pressed", String(nowDone));
          btn.innerHTML = `<span class="done-check" aria-hidden="true">✓</span> ${nowDone ? 'Learned' : 'Mark as learned'}`;
          updateProgress();
        });
      });
    }

    wireTocRail();

    // Next/Previous Stage Navigation
    mainViewport.querySelectorAll(".stage-nav-btn[data-stage-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-stage-id");
        switchStage(id);
      });
    });

    // Internal stage links — [text](#stage-id) in lesson content jumps to another stage
    mainViewport.querySelectorAll("a[data-nav-stage]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        switchStage(link.getAttribute("data-nav-stage"));
      });
    });

    // Breadcrumb stage crumb is clickable (re-navigates / refreshes current stage)
    mainViewport.querySelectorAll("[data-crumb-stage]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        switchStage(link.getAttribute("data-crumb-stage"));
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
    let activeResultIndex = -1;

    function openModal() {
      commandModal.classList.add("open");
      commandInput.focus();
      activeResultIndex = -1;
      renderSearchResults("");
    }

    function closeModal() {
      commandModal.classList.remove("open");
      commandInput.value = "";
      activeResultIndex = -1;
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

    commandInput.addEventListener("keydown", (e) => {
      if (!commandModal.classList.contains("open")) return;
      const items = commandResults.querySelectorAll(".search-result-item");
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeResultIndex = (activeResultIndex + 1) % items.length;
        updateActiveSearchResult(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeResultIndex = (activeResultIndex - 1 + items.length) % items.length;
        updateActiveSearchResult(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeResultIndex >= 0 && activeResultIndex < items.length) {
          items[activeResultIndex].click();
        }
      }
    });

    function updateActiveSearchResult(items) {
      items.forEach((item, idx) => {
        if (idx === activeResultIndex) {
          item.classList.add("keyboard-active");
          item.scrollIntoView({ block: "nearest" });
        } else {
          item.classList.remove("keyboard-active");
        }
      });
    }

    commandInput.addEventListener("input", (e) => {
      activeResultIndex = -1;
      renderSearchResults(e.target.value.toLowerCase().trim());
    });

    function renderSearchResults(query) {
      const roadmap = getRoadmap();
      if (!query) {
        commandResults.innerHTML = `
          <div style="padding:1.5rem; text-align:center; color:var(--text-dim); font-size:0.88rem;">
            Type to search across all ${roadmap.stages.length} stages of the ${roadmap.id === 'course' ? 'course' : 'vibe coding'} roadmap, modules, and lessons...
          </div>
        `;
        return;
      }

      const results = [];
      roadmap.stages.forEach((stage) => {
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

  // ============ Roadmap Switcher ============
  function refreshRoadmapChrome() {
    const roadmap = getRoadmap();
    const minimal = roadmap.minimal === true;
    document.body.classList.toggle("minimal-roadmap", minimal);
    document.querySelectorAll(".roadmap-switcher-btn").forEach((btn) => {
      const isActive = btn.getAttribute("data-roadmap") === state.activeRoadmap;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    const badge = document.getElementById("brand-badge-label");
    const brandText = document.getElementById("brand-text-label");
    if (badge) badge.textContent = minimal ? "VIBE" : "COURSE";
    if (brandText) brandText.textContent = minimal ? "Vibe Coding Roadmap" : "AI-Powered Coding Roadmap";
  }

  function switchRoadmap(roadmapId) {
    if (roadmapId !== "course" && roadmapId !== "vibe") return;
    state.activeRoadmap = roadmapId;
    localStorage.setItem("ai_course_active_roadmap", roadmapId);
    const roadmap = getRoadmap();
    const saved = state.lastStages[roadmapId];
    const target = saved && roadmap.stages.some((s) => s.id === saved) ? saved : roadmap.stages[0].id;
    refreshRoadmapChrome();
    updateProgress();
    renderStage(target);
    if (bookmarksPanel && bookmarksPanel.classList.contains("open")) {
      bookmarksPanel.classList.remove("open");
    }
    closeMobileSidebar();
  }

  function initRoadmapSwitcher() {
    document.querySelectorAll(".roadmap-switcher-btn").forEach((btn) => {
      btn.addEventListener("click", () => switchRoadmap(btn.getAttribute("data-roadmap")));
    });
    refreshRoadmapChrome();
  }

  // ============ Course-opening origin hero (Hello World) ============
  const HELLO_LINES = [
    ["// Hello, world. This is where it all starts.", true],
    ["function becomeDeveloper() {", false],
    ["  const mindset = \"break big problems into small ones\";", false],
    ["  const tools = \"AI + curiosity + persistence\";", false],
    ["  const goal = \"ship something real\";", false],
    ["}", false],
    ["", false],
    ["console.log(becomeDeveloper());", false],
    ["", false],
    ["// Output: \"Hello World, and hello to you.\"", true]
  ];

  function buildOriginHero() {
    return `
      <section class="origin-hero" id="origin-hero">
        <div class="hello-badge">&#9998;&#65039; THE ORIGIN STORY</div>
        <h2 class="hello-title" id="hello-title">Where It All Starts</h2>
        <p class="hello-kicker">Every programmer&rsquo;s first words &mdash; typed once, remembered forever.</p>
        <div class="hello-terminal">
          <div class="terminal-bar">
            <span class="terminal-dot terminal-dot-red"></span>
            <span class="terminal-dot terminal-dot-yellow"></span>
            <span class="terminal-dot terminal-dot-green"></span>
            <span class="terminal-title">console &mdash; your_first_program</span>
          </div>
          <div class="terminal-body" id="hello-terminal-body"></div>
        </div>
        <div class="hello-story">
          <p><strong>This is where it all starts.</strong> Not with syntax, not with jargon &mdash; but with two words every engineer on Earth has typed.</p>
          <p>Being a programmer was never about memorizing code. It&rsquo;s about a mindset: breaking big problems into tiny ones, staying curious when things break, and building things that help real people. In the AI era, that mindset matters more than ever &mdash; you don&rsquo;t write every line anymore; you <em>direct</em> the machine, review its work, and own the result.</p>
          <p>Over the next stages you will debug, design, ship, and maybe break a few things. That is the journey. <strong>Welcome to it.</strong></p>
        </div>
        <button class="hello-cta" id="hello-cta-btn">Begin Your Coding Adventure &#8594;</button>
        <p class="hello-footnote">&mdash; The first of many small wins. Say it out loud: <em>Hello, World.</em></p>
      </section>
    `;
  }

  function mountOriginHero() {
    const body = document.getElementById("hello-terminal-body");
    if (!body || body.dataset.typed === "1") return;
    body.dataset.typed = "1";
    const cta = document.getElementById("hello-cta-btn");
    if (cta) cta.addEventListener("click", () => {
      const first = document.getElementById("module-0");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const rows = HELLO_LINES.map((line, i) => {
      const row = document.createElement("div");
      row.className = "terminal-line";
      const no = document.createElement("span");
      no.className = "terminal-line-no";
      no.textContent = String(i + 1).padStart(2, "0");
      const txt = document.createElement("span");
      txt.className = "terminal-line-text" + (line[1] ? " term-comment" : "");
      row.appendChild(no);
      row.appendChild(txt);
      body.appendChild(row);
      return { text: line[0], txt: txt };
    });
    const caret = document.createElement("span");
    caret.className = "typewriter-caret";
    let li = 0, ci = 0;
    function placeCaret() {
      if (caret.parentNode) caret.parentNode.removeChild(caret);
      const cur = rows[li];
      if (cur) cur.txt.appendChild(caret);
    }
    placeCaret();
    function tick() {
      if (li >= rows.length) {
        const last = rows[rows.length - 1];
        if (last) last.txt.appendChild(caret);
        caret.style.animation = "caret-blink 0.9s steps(1) infinite";
        return;
      }
      const cur = rows[li];
      if (ci <= cur.text.length) {
        cur.txt.textContent = cur.text.slice(0, ci);
        ci++;
        setTimeout(tick, 22);
      } else {
        li++;
        ci = 0;
        placeCaret();
        setTimeout(tick, 150);
      }
    }
    tick();
  }

  // ============ Initialize Everything ============
  applyEnrichment();
  if (window.LESSON_BLOCKS) window.LESSON_BLOCKS.init();
  initWelcome();
  initTheme();
  initMobileSidebar();
  initRoadmapSwitcher();
  initBookmarksPanel();
  initResetProgress();
  setupSearch();
  initKeyboardNav();
  renderStage(getRoadmap().stages[0].id);
  updateProgress();
});
