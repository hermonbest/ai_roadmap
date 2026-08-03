// Vercel Serverless Function — AI Tutor Chat Proxy
// Proxies requests to the Gemini API so the API key never reaches the browser.
// Requires the GEMINI_API_KEY environment variable to be set in Vercel.

const MODEL = "gemini-3.1-flash-lite";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const RATE_LIMIT = {
  windowMs: 60_000,
  max: 10,
};

const buckets = new Map();

function getClientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function pruneExpired() {
  const now = Date.now();
  for (const [ip, bucket] of buckets) {
    if (now - bucket.start >= RATE_LIMIT.windowMs) buckets.delete(ip);
  }
}

function checkRateLimit(request) {
  const now = Date.now();
  const ip = getClientIp(request);

  if (buckets.size > 10_000) pruneExpired();

  const bucket = buckets.get(ip);
  if (!bucket || now - bucket.start >= RATE_LIMIT.windowMs) {
    buckets.set(ip, { start: now, count: 1 });
    return { limited: false, retryAfter: 0 };
  }

  if (bucket.count >= RATE_LIMIT.max) {
    const retryAfter = Math.ceil((bucket.start + RATE_LIMIT.windowMs - now) / 1000);
    return { limited: true, retryAfter };
  }

  bucket.count += 1;
  return { limited: false, retryAfter: 0 };
}

const SYSTEM_PROMPT = `You are TutorAI, a friendly, concise AI tutor embedded in an interactive course called "AI-Powered Coding Roadmap". The course takes learners from zero coding knowledge to building and deploying full-stack apps with AI coding tools. Its stages are:

1. Orientation: what coding is, how the internet works, client-server model, and setting expectations.
2. Building Blocks: HTML structure, CSS styling (box model, flexbox, responsive design), and JavaScript interactivity (variables, functions, DOM, arrays, objects).
3. Tools: VS Code editor, command line basics, Git version control, and GitHub collaboration.
4. Core Concepts: frontend vs backend, APIs, databases, authentication vs authorization, UI/UX design, and debugging.
5. AI Models: tokens, context windows, prompting strategies, and using AI as a learning partner.
6. AI Coding Tools: Cursor, Claude Code, diff reviews, agentic workflows, and best practices.
7. Final Project: planning, building, authenticating, and deploying a live full-stack app.

The course features interactive labs (client-server simulator, CSS flexbox playground, git visualizer, debug challenges, AI flashcards, API inspector, deployment simulator), quizzes with scoring, bookmarks, and progress tracking.

Guidelines:
- Answer in clear, simple language suitable for beginners unless the learner seems more advanced.
- Use short explanations, then give concrete examples or code when relevant.
- When showing code, always use markdown fenced code blocks with a language tag.
- If asked to write code, prefer modern, idiomatic JavaScript/HTML/CSS for web projects.
- If a question is off-topic or unclear, steer it back to coding/AI topics kindly.
- Never invent course details; if unsure about something specific, say so.
- When a learner is stuck, suggest the relevant stage/module they might want to review.`;

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method Not Allowed" }, { status: 405 });
    }

    const rate = checkRateLimit(request);
    if (rate.limited) {
      return Response.json(
        { error: "Rate limit exceeded. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfter) } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    let messages = [];
    try {
      const body = await request.json();
      if (Array.isArray(body.messages)) messages = body.messages;
    } catch {
      return Response.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const history = messages.filter((m) => m && typeof m.content === "string");
    if (history.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    try {
      const geminiRes = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: history.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: String(m.content) }],
          })),
          generationConfig: { maxOutputTokens: 2048 },
        }),
      });

      const data = await geminiRes.json();

      if (!geminiRes.ok) {
        const detail = data?.error?.message || `HTTP ${geminiRes.status}`;
        return Response.json(
          { error: `Gemini API error: ${detail}` },
          { status: 502 }
        );
      }

      const reply =
        data?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text)
          .join("")
          .trim() || "";

      if (!reply) {
        return Response.json(
          { error: "Gemini returned an empty response." },
          { status: 502 }
        );
      }

      return Response.json({ reply }, { headers: { "Cache-Control": "no-store" } });
    } catch (err) {
      console.error("Chat proxy error:", err);
      return Response.json(
        { error: "Failed to reach the Gemini API." },
        { status: 500 }
      );
    }
  },
};
