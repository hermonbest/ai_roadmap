# Stage 5 — Working with AI Models

Before using AI to write code, it helps to know what these models actually are and how they process what you give them. This stage is short but changes how effectively you use every AI tool from here on.

---

## Module 5.1 — How AI Models Work, Practically

### Lesson 1: What a token is

A token is the unit of text an AI model actually reads. It's not always a full word. Common words are often a single token, while longer or less common words get split into pieces.

Example: "coding" might be one token, while "unhelpfulness" might get split into pieces like "un," "help," "ful," "ness."

This matters for two practical reasons: models have a maximum number of tokens they can process at once, and many AI tools charge based on how many tokens you send and receive.

### Lesson 2: What context is, and why it runs out

Context is everything the model can currently "see": your conversation so far, any files you've shared, any instructions given earlier. This is measured in tokens too, and every model has a limit called a context window.

Once a conversation or a task gets long enough, older parts can fall outside that window and the model stops being able to reference them, even though they were mentioned earlier. This is why an AI coding tool can seem to "forget" something you told it ten minutes ago in a long session. It hasn't gotten worse at the task. It's run out of room to hold everything at once.

Practical takeaway: for long coding sessions, periodically restate anything important instead of assuming the model still has it in view.

### Lesson 3: What a model can and can't know about your project

A model only knows what's inside its context window at that moment, plus whatever general knowledge it was trained on. It doesn't automatically know your project's file structure, your database schema, or a decision you made in a different conversation, unless you tell it or it's set up to read your files directly (which tools like Cursor and Claude Code do).

This is why vague requests like "fix my app" produce weak results. The model isn't being careless. It genuinely doesn't have enough information yet.

### Resources for Module 5.1
- Website: [Anthropic – Understanding tokens and context](https://docs.claude.com) — official documentation on how Claude models process input, worth searching for the current tokens and context pages directly
- Video: [Understanding Tokens in AI, explained simply](https://www.youtube.com/results?search_query=what+is+a+token+in+ai+explained) — search this term for an up-to-date beginner explanation, since specific videos on this topic age quickly as models change

---

## Module 5.2 — Prompting

### Lesson 1: What a prompt is

A prompt is the instruction or question you give an AI model. It's the only way you communicate what you want, so its clarity directly determines the quality of what comes back.

### Lesson 2: Vague prompt vs specific prompt

Vague: "Make my website better."

Specific: "The navigation menu on my homepage doesn't collapse into a hamburger icon on mobile screens under 500px wide. Fix the CSS so it does, without changing how it looks on desktop."

The second version tells the model exactly what's wrong, where, and what should stay the same. The first forces the model to guess what "better" means, and it will guess, often incorrectly.

### Lesson 3: Giving the model the right context

When asking an AI coding tool for help, include:
- What the code currently does
- What you want it to do instead
- Any constraints (a library you must use, a style you're following, a part of the code that shouldn't change)
- The actual error message, if there is one, copied exactly

Skipping the error message and describing it from memory ("it says something about undefined") loses information that would otherwise point straight to the fix.

### Lesson 4: Iterating on a bad response instead of starting over

If a response is close but not right, tell the model specifically what's wrong with it rather than rewriting the whole prompt from scratch:

"This works, but it's re-fetching the data on every keystroke instead of only when the user stops typing. Add debouncing so it only fetches after 300ms of no typing."

This keeps the parts that already work while fixing exactly what doesn't, and tends to get a better result faster than starting over.

### Resources for Module 5.2
- Website: [Anthropic – Prompt engineering overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — direct guidance from the company building Claude, on being clear, specific, and structured in prompts
- Video: [Prompt Engineering Tutorial, freeCodeCamp](https://www.youtube.com/watch?v=_ZvnD73m40o) — full walkthrough of prompting technique with examples

---

Stage 5 complete. You now know what's actually happening when you talk to an AI model, and how to phrase requests so it can actually help. Next: Stage 6, where you put this to work inside Cursor and Claude Code.
