# Stage 6 — AI Coding Tools in Practice

This is where the fundamentals from Stages 1 through 5 start paying off directly. You now know enough HTML, CSS, JavaScript, Git, core concepts, and prompting to actually direct an AI coding tool instead of just trusting whatever it produces.

A note before starting: tool interfaces change often. The workflows below are stable, but exact buttons, menus, and install commands may shift. Each module links to the current official docs so you're not relying on a screenshot that's already out of date.

---

## Module 6.1 — The Tool Landscape

### Lesson 1: Chat-based AI vs in-editor AI

A chat-based tool (like a browser tab with an AI chat) has no direct access to your project. You copy code in, copy answers out, manually.

An in-editor tool (like Cursor or Claude Code) can read your actual files, see your folder structure, run commands, and make changes directly, without you copying anything back and forth. This is a meaningful difference once a project has more than a couple of files, since the tool can see how everything connects.

### Lesson 2: Autocomplete tools vs agentic tools

Autocomplete tools suggest the next few lines as you type, similar to predictive text. You stay in control of every keystroke.

Agentic tools take a task description and carry out multiple steps on their own: editing several files, running commands, checking the result, and adjusting if something fails. Cursor and Claude Code both offer autocomplete-style help and full agentic workflows, depending on which mode you use.

### Lesson 3: Picking a tool for the task at hand

Small, well-defined change (rename a variable everywhere, fix one specific bug): autocomplete or a short direct prompt is usually faster than handing it to an agent.

Larger task (add a full feature, set up a new part of the project): an agentic workflow, where you describe the goal and let the tool work through the steps, tends to save more time, as long as you review what it did.

### Resources for Module 6.1
- Website: [Cursor vs Claude Code comparison](https://www.developersdigest.tech/blog/what-is-cursor-ai-code-editor-2026) — a current side-by-side of the two tools' approaches
- Video: [Cursor AI vs Claude Code (2026) - Which Coding AI Is Better?](https://www.youtube.com/watch?v=av_2g0SY2OE) — a current side-by-side comparison, though new releases from both tools may date it over time

---

## Module 6.2 — Working with Cursor

### Lesson 1: Setup and interface

Download Cursor from cursor.com and install it like any other application. Since it's built on top of VS Code, the layout will look familiar if you completed Stage 3: a sidebar for files, an editor area, and a terminal panel. Cursor adds an AI chat panel alongside these, plus inline AI features you can trigger directly inside a file.

If you were already using VS Code, Cursor can import your existing settings and extensions during setup.

### Lesson 2: Asking for a feature vs asking for a whole file

For a small, contained request, select the relevant code and describe the change directly:

"Add error handling so this function shows a message instead of crashing if the API call fails."

For a larger request spanning multiple files, describe the goal at a higher level and let Cursor propose changes across the project:

"Add a dark mode toggle that switches the whole site's color scheme and remembers the user's choice between visits."

Cursor will show proposed changes as a diff (a before-and-after comparison) before applying them.

### Lesson 3: Reviewing AI-written code before accepting it

Never accept a multi-file change without reading the diff first. Check specifically for:
- Code that was deleted that shouldn't have been
- New dependencies being added that you didn't ask for
- Logic that technically runs but doesn't match what you actually meant

This review step is the difference between using Cursor to move faster and using it to accumulate code you don't understand.

### Resources for Module 6.2
- Website: [Cursor documentation](https://cursor.com) — check the docs section on the official site for the current setup and feature list
- Video: [How To Use Cursor AI (Full Tutorial For Beginners 2025)](https://www.youtube.com/watch?v=cE84Q5IRR6U) — a full walkthrough of the interface, features, and AI workflows

---

## Module 6.3 — Working with Claude Code

### Lesson 1: Setup and interface

Claude Code runs in your terminal (the same terminal you learned in Stage 3), rather than as a separate visual editor. It reads your project directly from the folder you run it in. For the current installation steps for your operating system, check docs.claude.com's Claude Code section directly, since install methods (native installer vs. npm) have changed over time and the docs stay current.

Once installed, you start it by running a command inside your project folder, and it opens an interactive session where you describe tasks in plain language.

### Lesson 2: Giving it a task end to end

Claude Code works well when given a clear goal and left to work through the steps:

"Add a contact form to the site. It should validate that the email field is a real email format before allowing submission."

It will read the relevant files, make changes, and can run your project to check its own work, all inside the same terminal session.

### Lesson 3: Checking its work, catching mistakes it makes confidently

An AI tool can be completely wrong while sounding completely certain. Before trusting a result:
- Run the project yourself and actually test the feature it says it built
- Ask it to explain a specific change if you don't understand why it made that choice
- Check that it didn't quietly change something unrelated to the task

If something's wrong, tell it specifically what's wrong, the same way you practiced in Stage 5's prompting module, rather than starting the whole task over.

### Resources for Module 6.3
- Website: [Claude Code documentation](https://docs.claude.com/en/docs/claude-code/overview) — official docs, kept current with each release
- Video: [FULL Claude Code Tutorial for Beginners in 2026! (Step-By-Step)](https://www.youtube.com/watch?v=qYqIhX9hTQk) — a current walkthrough from setup to your first real task

---

## Module 6.4 — Workflow Habits

### Lesson 1: Planning a feature before prompting for it

Before asking an AI tool to build something, take thirty seconds to define: what should this feature do, what shouldn't it break, and how will you know it worked. A clear plan in your head produces a clearer prompt, and a clearer prompt produces a result closer to what you actually wanted on the first try.

### Lesson 2: Committing often so AI changes are easy to undo

Commit your working code before asking an AI tool to make a significant change. If the result goes badly wrong, you can return to the last commit instead of untangling a mess by hand. This is the same Git skill from Stage 3, now used specifically as a safety net for AI-assisted changes.

### Lesson 3: When to write the code yourself instead of prompting

Some situations are faster to just write directly: a one-line fix you already know, a small tweak to something you just wrote yourself, or a piece of logic where explaining it in a prompt would take longer than typing it. AI tools save the most time on repetitive or larger-scope work, not on every single keystroke.

---

Stage 6 complete. You can now direct both an agentic in-editor tool and a terminal-based AI coding tool, review their work, and recover cleanly when something goes wrong. Next: Stage 7, where all of this comes together in one real project, built and deployed live on the internet.
