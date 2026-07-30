# Stage 1 — Orientation

Before touching any code, you need to know what you're actually dealing with. This stage answers the questions a beginner usually has but rarely asks out loud.

---

## Module 1.1 — What coding actually is

### Lesson 1: What a program is

A program is a list of instructions a computer follows, in order, one at a time.

That's it. Nothing mystical about it. If you've ever followed a recipe, you've already done the human version: step 1, then step 2, then step 3, in a specific sequence, where skipping a step or doing them out of order breaks the result.

A computer just follows instructions written in a language it understands. "Coding" is the act of writing those instructions.

Example: a program that says "take two numbers, add them, show the result" is instructions:
1. Get the first number.
2. Get the second number.
3. Add them together.
4. Display the answer.

Every app you use, from a calculator to a banking app, is built from instructions like this, just far more of them.

### Lesson 2: What a website is made of

A website is three things working together:

- **HTML** — the content and structure (the text, images, buttons, and how they're arranged)
- **CSS** — the appearance (colors, fonts, spacing, layout)
- **JavaScript** — the behavior (what happens when you click something, type something, or scroll)

Think of a house: HTML is the frame and rooms, CSS is the paint and furniture, JavaScript is the electricity and plumbing that makes things actually work when you flip a switch or turn a tap.

These three files (or sets of files) get sent to your browser, and the browser puts them together into the page you see.

### Lesson 3: What "running code" means in practice

"Running code" just means telling a computer to follow the instructions you wrote, right now.

For a website, this can mean two different things:
- Opening an HTML file directly in your browser to see what it looks like
- Using a tool that starts a small local server on your computer, so the page behaves the way it will once it's live on the internet

You'll do both in this course. Neither is complicated once you've done it a few times. The first time always feels awkward. That's normal, not a sign you're behind.

---

## Module 1.2 — How the internet delivers a website

### Lesson 1: Client and server, explained with a real example

When you type a web address into your browser and hit enter, here's what happens:

1. Your browser (the **client**) sends a request out to the internet asking for that website.
2. A computer somewhere else (the **server**) that's storing the website's files receives that request.
3. The server sends the files back.
4. Your browser takes those files and builds the page you see on screen.

This whole exchange usually takes under a second. "Client" and "server" are just roles: the client asks, the server answers. Your laptop is a client right now. The place hosting this document, if it were a live website, would be the server.

### Lesson 2: What a browser does with HTML, CSS, and JavaScript

The browser doesn't show you the raw code. It reads it and translates it into what you see:

- It reads the HTML and builds the structure (this is a heading, this is a paragraph, this is a button)
- It reads the CSS and applies the styling to that structure
- It runs the JavaScript, which can change the structure or styling while you're using the page

This process happens every time you load or refresh a page. If you right-click almost any website and choose "Inspect," you can see this raw HTML, CSS, and JavaScript directly. Try it on a page you use often. It demystifies things fast.

### Lesson 3: Domains, hosting, and deployment in plain terms

Three terms that get thrown around before anyone explains them:

- **Domain** — the address people type to find your site (like example.com). You rent this, you don't own it outright, similar to a phone number.
- **Hosting** — the server that stores your website's files and serves them to anyone who visits. Without hosting, your code just sits on your own computer where nobody else can reach it.
- **Deployment** — the act of putting your code onto that hosting server so it becomes a live, public website.

You'll go through this process yourself in Stage 7, once there's a real project to deploy.

---

## Module 1.3 — Setting expectations

### Lesson 1: What you'll be able to build by the end of this course

By the end, you'll be able to build a working app that has a frontend people interact with, a database that stores information, a login system, and is live on the internet for anyone to use. You'll also be able to use AI coding tools to speed up that process without losing track of what the code is actually doing.

You won't come out of this course knowing everything. Nobody does. You'll come out with enough of a foundation that you can keep learning on your own, and enough judgment to tell when an AI tool has given you something wrong.

### Lesson 2: Why AI tools don't remove the need to understand code

AI tools can write code fast. They can also write code that looks correct and isn't, or that solves a different problem than the one you actually have. If you don't understand what the code does, you can't catch that.

The goal of this course isn't to make you memorize syntax. It's to make sure you can read code, understand what it's doing, and know when something's off, whether you wrote it or an AI did.

### Lesson 3: How to use this course

A few habits that make a real difference:

- Type out every example yourself instead of copying and pasting. Typing forces your brain to process it; copying doesn't.
- Do the projects at the end of each module before moving on, even if they feel small.
- If a concept doesn't make sense, keep moving and come back to it after the next lesson. A lot of things click retroactively once you've seen how they're used.
- Expect to be confused sometimes. Confusion while learning to code is not a sign you're bad at it. It's just what learning a new system feels like from the inside.

---

Stage 1 complete. Next: Stage 2, where you start actually writing HTML, CSS, and JavaScript.
