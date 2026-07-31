// AI Tutor Chat Widget — talks to the Vercel /api/chat proxy

(function () {
  const TYPING_WAIT_MS = 600;

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function parseInline(text) {
    return text
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  // Minimal markdown renderer (fenced code, inline code, bold, italics, lists)
  function renderMarkdown(text) {
    const codeBlocks = [];
    let processed = text.replace(/```([\w-]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
      const id = codeBlocks.length;
      codeBlocks.push(
        `<pre><code class="language-${lang || "text"}">${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`
      );
      return `\n\n<!--CB${id}-->\n\n`;
    });

    const blocks = processed.split(/\n\n+/);
    const html = blocks.map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<!--CB") && trimmed.endsWith("-->")) return trimmed;

      const lines = trimmed.split("\n");
      const isBullet = lines.every((l) => /^\s*[-*]\s+/.test(l));
      if (isBullet) {
        return `<ul>${lines.map((l) => `<li>${parseInline(l.replace(/^\s*[-*]\s+/, ""))}</li>`).join("")}</ul>`;
      }
      return `<p>${parseInline(trimmed)}</p>`;
    });

    let out = html.join("\n");
    codeBlocks.forEach((cb, i) => {
      out = out.replace(`<!--CB${i}-->`, cb);
    });
    return out;
  }

  function init() {
    const toggleBtn = document.getElementById("chat-toggle-btn");
    const closeBtn = document.getElementById("chat-close-btn");
    const panel = document.getElementById("chat-panel");
    const messagesEl = document.getElementById("chat-messages");
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send-btn");

    if (!toggleBtn || !panel || !messagesEl || !form || !input) return;

    const history = [];

    function appendMessage(role, html) {
      const el = document.createElement("div");
      el.className = `chat-msg ${role === "user" ? "chat-msg-user" : "chat-msg-bot"}`;
      el.innerHTML = html;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    function appendTyping() {
      const el = document.createElement("div");
      el.className = "chat-msg chat-msg-bot chat-msg-typing";
      el.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      input.value = "";
      sendBtn.disabled = true;

      appendMessage("user", escapeHtml(text));
      history.push({ role: "user", content: text });

      const typingEl = appendTyping();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.slice(-16) }),
        });

        const data = await res.json().catch(() => ({}));

        typingEl.remove();

        if (!res.ok || !data.reply) {
          appendMessage(
            "bot",
            `⚠️ ${escapeHtml(data.error || "Something went wrong. Please try again.")}`
          );
          history.push({ role: "assistant", content: "" });
          return;
        }

        appendMessage("bot", renderMarkdown(data.reply));
        history.push({ role: "assistant", content: data.reply });
      } catch {
        typingEl.remove();
        appendMessage("bot", "⚠️ Could not reach the server. Are you running on Vercel with a valid API key?");
      } finally {
        sendBtn.disabled = false;
        input.focus();
      }
    }

    toggleBtn.addEventListener("click", () => {
      panel.classList.toggle("open");
      toggleBtn.classList.toggle("hidden", panel.classList.contains("open"));
      if (panel.classList.contains("open")) input.focus();
    });

    closeBtn.addEventListener("click", () => {
      panel.classList.remove("open");
      toggleBtn.classList.remove("hidden");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sendMessage();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
