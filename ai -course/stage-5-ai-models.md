# Stage 5 — Working with AI Models

Before using AI to write code, it helps to know what these models actually are and how they process what you give them. This stage is short but changes how effectively you use every AI tool from here on.

---

## Module 5.1 — How AI Models Work, Practically

### Lesson 1: What a token is

A token is the unit of text an AI model actually reads. It's not always a full word. Common words are often a single token, while longer or less common words get split into pieces.

Example: "coding" might be one token, while "unhelpfulness" might get split into pieces like "un," "help," "ful," "ness."

This matters for two practical reasons: models have a maximum number of tokens they can process at once, and many AI tools charge based on how many tokens you send and receive.

![Text shown as small token puzzle pieces that fit together](assets/tokens_as_puzzle_pieces.png)

*A model reads text as tokens: the small word and word-fragment pieces it was trained on.*

### Lesson 2: What context is, and why it runs out

Context is everything the model can currently "see": your conversation so far, any files you've shared, any instructions given earlier. This is measured in tokens too, and every model has a limit called a context window.

Once a conversation or a task gets long enough, older parts can fall outside that window and the model stops being able to reference them, even though they were mentioned earlier. This is why an AI coding tool can seem to "forget" something you told it ten minutes ago in a long session. It hasn't gotten worse at the task. It's run out of room to hold everything at once.

Practical takeaway: for long coding sessions, periodically restate anything important instead of assuming the model still has it in view.

![A context window holding recent messages while older ones fall outside its limit](assets/context_window_illustrated.png)

*The context window holds what the model can currently see. Older parts fall out as it fills up.*

### Lesson 3: What a model can and can't know about your project

A model only knows what's inside its context window at that moment, plus whatever general knowledge it was trained on. It doesn't automatically know your project's file structure, your database schema, or a decision you made in a different conversation, unless you tell it or it's set up to read your files directly (which tools like Cursor and Claude Code do).

This is why vague requests like "fix my app" produce weak results. The model isn't being careless. It genuinely doesn't have enough information yet.

### Resources for Module 5.1
- Website: [Anthropic – Understanding tokens and context](https://docs.claude.com) — official documentation on how Claude models process input, worth searching for the current tokens and context pages directly
- Video: [What is an AI Token? LLM Tokens Explained for Beginners (2026)](https://www.youtube.com/watch?v=EINnWUBzjvM) — a current beginner explanation of how models count and process tokens

---

## Module 5.2 — Prompting

### Lesson 1: What a prompt is

A prompt is the instruction or question you give an AI model. It's the only way you communicate what you want, so its clarity directly determines the quality of what comes back.

### Lesson 2: Vague prompt vs specific prompt

Vague: "Make my website better."

Specific: "The navigation menu on my homepage doesn't collapse into a hamburger icon on mobile screens under 500px wide. Fix the CSS so it does, without changing how it looks on desktop."

The second version tells the model exactly what's wrong, where, and what should stay the same. The first forces the model to guess what "better" means, and it will guess, often incorrectly.

![A vague prompt giving a blurry result versus a specific prompt giving a sharp one](assets/vague_vs_specific_prompting.png)

*The clearer the prompt, the closer the result is to what you actually wanted.*

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

## Module 5.3 — AI as a Development Partner

### Lesson 1: When to trust AI output and when to double-check

AI models are excellent at pattern-matching common code patterns, boilerplate, and well-documented APIs. They're less reliable with:

- Brand-new libraries or APIs released after their training cutoff
- Complex logic that requires understanding your specific business rules
- Security-sensitive code where a subtle mistake could create vulnerabilities
- Edge cases that rarely appear in training data

A good rule of thumb: the more critical the code, the more carefully you should review it. A CSS change to a button color needs less scrutiny than a change to your authentication logic.

### Lesson 2: Using AI for learning, not just for production

One of the most underused ways to work with AI is as a learning tool, not just a code generator:

- **Explain this code**: paste a piece of code you don't understand and ask the model to walk through it line by line
- **Compare approaches**: "What are the trade-offs between using localStorage vs. IndexedDB for storing user preferences?"
- **Generate practice problems**: "Give me 5 JavaScript exercises that practice closures and callbacks, starting easy and getting harder"
- **Code review**: "Review this code for common beginner mistakes and suggest improvements"

These uses build your understanding over time, rather than just producing code you don't fully own.

### Lesson 3: Building a mental model of what AI can and can't do

Over time, you'll develop an intuition for what tasks AI excels at and where you need to step in:

**AI excels at:**
- Boilerplate and repetitive code (form validation, CSS layouts, CRUD operations)
- Translating between formats (JSON to CSV, SQL to plain English)
- Explaining concepts and debugging common errors
- Generating test data and edge cases

**AI struggles with:**
- Architecture decisions that depend on your specific constraints
- Code that must integrate with systems it can't see
- Novel algorithms or approaches not well-represented in training data
- Understanding the "why" behind your business requirements

The goal is to develop a working relationship with AI tools where you handle the thinking and judgment, and they handle the typing and pattern-matching.

### Resources for Module 5.3
- Website: [Google – Developers Blog on AI Coding](https://developers.googleblog.com) — current perspectives on working effectively alongside AI coding tools
- Video: [How to Learn Anything with AI (2026)](https://www.youtube.com/watch?v=VXmCg7gLEnI) — techniques for using AI as a personal tutor

---

Stage 5 complete. You now know what's actually happening when you talk to an AI model, how to phrase requests effectively, and how to use AI as both a production tool and a learning partner. Next: Stage 6, where you put this to work inside Cursor and Claude Code.
