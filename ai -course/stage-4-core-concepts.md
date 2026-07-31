# Stage 4 — Core Concepts Every Developer Needs

This stage is a glossary turned curriculum. Each concept gets a plain definition, a concrete example, and resources if you want to go deeper than this course goes.

---

## Module 4.1 — How Software Is Put Together

### Lesson 1: Frontend vs backend

The frontend is everything the user sees and interacts with directly: the HTML, CSS, and JavaScript running in their browser. The backend is the part running on a server, out of view, that handles data, logic, and anything that shouldn't be exposed to the user directly, like passwords or payment processing.

Example: on a shopping site, the frontend shows you the product images and the "Add to Cart" button. The backend checks whether that item is actually in stock and stores your order once you check out.

![Frontend, backend, and API shown as a dining room, kitchen, and waiter](assets/frontend_backend_api_restaurant.png)

*The frontend is the dining room, the backend is the kitchen, and the API is the waiter between them.*

### Lesson 2: What an API is

An API (Application Programming Interface) is a defined way for one piece of software to ask another piece of software for something, without needing to know how that other software works internally.

Example: a weather app on your phone doesn't run its own weather sensors. It sends a request to a weather service's API, asking for today's forecast for your location, and gets back data it displays.

### Lesson 3: What a database is

A database is a structured place to store data so it can be saved, searched, and updated reliably. Instead of storing a user's information in a plain text file, a database organizes it into tables (or similar structures) that can be queried directly, like "find every user who signed up this week."

![A database compared to a filing cabinet of organized records](assets/database_as_filing_cabinet.png)

*A database organizes data into queryable records the way a filing cabinet organizes files.*

### Lesson 4: Client-side vs server-side rendering

Client-side rendering means the browser builds the page using JavaScript after the initial page loads. Server-side rendering means the server sends back a fully built page, ready to display, before any JavaScript runs.

Each has trade-offs: server-side rendering tends to show content faster on first load, client-side rendering tends to feel smoother once loaded, since the page doesn't need a full reload for every change. Most real projects use a mix.

### Resources for Module 4.1
- Website: [MDN Web Docs – How the web works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works) — the standard reference nearly every developer uses, written for beginners
- Video: [APIs for Beginners – Full Course](https://www.youtube.com/watch?v=WXsD0ZgxjRw) — covers what an API is and how to use one, from zero

---

## Module 4.2 — Access and Security Basics

### Lesson 1: Authentication (proving who you are)

Authentication is the process of verifying identity: confirming that you are who you say you are. The most common form is a username and password, though fingerprint scans, face recognition, and one-time codes sent by text are all forms of authentication too.

![Authentication versus authorization, contrasting proving identity with granting permission](assets/authentication_vs_authorization_illustrated.png)

*Authentication proves who you are; authorization decides what you can do.*

### Lesson 2: Authorization (what you're allowed to do)

Authorization happens after authentication, and decides what you're allowed to access or do. Two people can log into the same app (both authenticated) but have completely different permissions (different authorization): one might be able to view a shared document, the other might be able to edit it.

A simple way to keep the two straight: authentication answers "who are you," authorization answers "what can you do."

### Lesson 3: Sessions, tokens, and cookies

Once you log in, the app needs a way to remember you're logged in as you move between pages, since each request to a server is otherwise treated as brand new.

- A **cookie** is a small piece of data stored in your browser and sent along with each request.
- A **session** is a record on the server tied to that cookie, remembering who you are.
- A **token** (commonly a JWT, JSON Web Token) is a self-contained piece of data that proves who you are without the server needing to store a session at all. It's checked and trusted directly.

Which approach a project uses depends on its scale and needs. You'll encounter both.

![Cookies, sessions, and tokens illustrated side by side](assets/cookies_sessions_tokens_illustrated.png)

*Cookies and sessions remember you on the server; tokens prove who you are directly.*

### Lesson 4: Common security mistakes beginners make

- Storing passwords as plain text instead of hashing them
- Trusting data sent from the browser without checking it on the server too
- Hardcoding secret keys directly into code that gets pushed to GitHub
- Giving every user full access by default instead of only what they need

None of these need to be fully understood yet. Knowing they exist is enough at this stage, so you recognize them later.

### Resources for Module 4.2
- Website: [Auth0 – Authentication vs. Authorization](https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization) — clear reference from a company that builds this infrastructure for a living
- Video: [Authentication vs Authorization, explained in 3 minutes](https://www.youtube.com/watch?v=DakSdpODf-U)

---

## Module 4.3 — Design Thinking for Developers

### Lesson 1: UI (what the user sees)

UI (User Interface) is the visual layer: buttons, colors, fonts, spacing, icons. It's the part of a product you can point at and describe by appearance.

![UI versus UX, contrasting visual design with overall experience](assets/ui_vs_ux_illustrated.png)

*UI is what you see; UX is how it feels to use.*

### Lesson 2: UX (how the user experiences it)

UX (User Experience) is broader: how easy the product is to use, how it feels to accomplish a task, whether the user finds what they need without frustration. Two apps can have identical buttons and colors (same UI) and completely different UX, if one makes a task take three clicks and the other makes it take twelve.

### Lesson 3: Why the two aren't the same job, but every developer needs both

A well-designed button (good UI) placed somewhere the user never looks (bad UX) still fails. As a developer, you're often the one deciding exact spacing, wording, and flow, even if a designer hands you a mockup. Understanding both means you catch problems before a user does.

### Resources for Module 4.3
- Website: [Figma – UI vs UX: What's the Difference?](https://www.figma.com/resource-library/difference-between-ui-and-ux/)
- Video: [UI vs UX Design Explained in 4 Minutes](https://www.youtube.com/watch?v=OASInJeNE3w)

---

## Module 4.4 — Writing and Fixing Code

### Lesson 1: What debugging actually is

Debugging is the process of finding out why code isn't doing what you expected, then fixing it. It's not a special skill some people have and others don't. It's a repeatable process: notice something's wrong, narrow down where, form a guess, test the guess, repeat.

![The debugging loop illustrated as notice, narrow down, guess, and test](assets/debugging_illustrated.png)

*Debugging is a repeatable loop: notice, narrow down, guess, test.*

### Lesson 2: Reading a stack trace

A stack trace is the list of function calls that were happening when an error occurred, usually shown from the error itself up through everything that led to it. Read the top line first. It usually names the actual error. The lines below it show the path the code took to get there, which helps you trace backward to the cause.

### Lesson 3: Using console.log and breakpoints

`console.log()` prints a value to the console so you can see what a variable actually holds at a given point:

```javascript
let total = price * quantity;
console.log(total); // check if this is the number you expected
```

A breakpoint, set in VS Code or a browser's developer tools, pauses code execution at a specific line, letting you inspect every variable's current value before continuing. It's slower to set up than a `console.log` but gives a far more complete picture for a tricky bug.

### Lesson 4: Common bug patterns for beginners

- Off-by-one errors in loops (looping one time too many or too few)
- Comparing a string to a number without noticing (`"5" == 5` behaves differently than `"5" === 5`)
- Forgetting that a variable's value changed earlier in the code than expected
- Typos in variable or function names that don't throw an error but silently do nothing

### Resources for Module 4.4
- Website: [freeCodeCamp – What is Debugging? A Simple Guide for Beginners](https://www.freecodecamp.org/news/what-is-debugging-how-to-debug-code/)
- Video: [How To Debug Like a Pro, From Beginner To Expert](https://www.youtube.com/watch?v=NUrV_FbJqWs)

---

Stage 4 complete. These concepts will keep resurfacing in Stage 6 and 7, so it's fine if some of this hasn't fully settled yet. It settles once you see it in a real project. Next: Stage 5, where you learn how AI models actually work before using them to write code.
