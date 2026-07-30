// Complete Course Data Structure — All 7 Stages, Modules, Lessons, Resources, Projects, Quizzes & Widget Configs

window.COURSE_DATA = [
  {
    id: "stage-1",
    number: 1,
    title: "Orientation",
    subtitle: "What coding is, how the internet works, and setting expectations",
    icon: "compass",
    widgetType: "client-server",
    widgetTitle: "Interactive Client-Server Simulator",
    widgetDescription: "Simulate what happens under the hood when a browser requests a page from a server.",
    quiz: [
      {
        question: "What is a computer program at its most basic level?",
        options: [
          "A complex mathematical AI formula",
          "A list of instructions a computer follows in sequence",
          "A hardware component inside the CPU",
          "A website hosted on the internet"
        ],
        answer: 1,
        explanation: "A program is simply a list of instructions executed in order, just like a cooking recipe."
      },
      {
        question: "Which web building block is responsible for the APPEARANCE (colors, fonts, layout)?",
        options: ["HTML", "JavaScript", "CSS", "SQL"],
        answer: 2,
        explanation: "CSS (Cascading Style Sheets) controls visual appearance and styling."
      },
      {
        question: "What is the difference between a Client and a Server?",
        options: [
          "The client stores files; the server requests them",
          "The client asks for web pages; the server responds with the files",
          "Clients are only mobile phones; servers are laptops",
          "Client and Server are identical programs"
        ],
        answer: 1,
        explanation: "Clients (like your browser) request content; servers host and deliver files to clients."
      }
    ],
    modules: [
      {
        title: "Module 1.1 — What coding actually is",
        lessons: [
          {
            title: "Lesson 1: What a program is",
            content: `A program is a list of instructions a computer follows, in order, one at a time.

That's it. Nothing mystical about it. If you've ever followed a recipe, you've already done the human version: step 1, then step 2, then step 3, in a specific sequence, where skipping a step or doing them out of order breaks the result.

A computer just follows instructions written in a language it understands. "Coding" is the act of writing those instructions.

**Example:** A program that says *"take two numbers, add them, show the result"* is instructions:
1. Get the first number.
2. Get the second number.
3. Add them together.
4. Display the answer.

Every app you use, from a calculator to a banking app, is built from instructions like this, just far more of them.`
          },
          {
            title: "Lesson 2: What a website is made of",
            content: `A website is three things working together:

- **HTML** — the content and structure (the text, images, buttons, and how they're arranged)
- **CSS** — the appearance (colors, fonts, spacing, layout)
- **JavaScript** — the behavior (what happens when you click something, type something, or scroll)

Think of a house: HTML is the frame and rooms, CSS is the paint and furniture, JavaScript is the electricity and plumbing that makes things actually work when you flip a switch or turn a tap.

These three files (or sets of files) get sent to your browser, and the browser puts them together into the page you see.`
          },
          {
            title: "Lesson 3: What 'running code' means in practice",
            content: `"Running code" just means telling a computer to follow the instructions you wrote, right now.

For a website, this can mean two different things:
- Opening an HTML file directly in your browser to see what it looks like
- Using a tool that starts a small local server on your computer, so the page behaves the way it will once it's live on the internet

You'll do both in this course. Neither is complicated once you've done it a few times. The first time always feels awkward. That's normal, not a sign you're behind.`
          }
        ]
      },
      {
        title: "Module 1.2 — How the internet delivers a website",
        lessons: [
          {
            title: "Lesson 1: Client and server, explained with a real example",
            content: `When you type a web address into your browser and hit enter, here's what happens:

1. Your browser (the **client**) sends a request out to the internet asking for that website.
2. A computer somewhere else (the **server**) that's storing the website's files receives that request.
3. The server sends the files back.
4. Your browser takes those files and builds the page you see on screen.

This whole exchange usually takes under a second. "Client" and "server" are just roles: the client asks, the server answers. Your laptop is a client right now. The place hosting this document, if it were a live website, would be the server.`
          },
          {
            title: "Lesson 2: What a browser does with HTML, CSS, and JavaScript",
            content: `The browser doesn't show you the raw code. It reads it and translates it into what you see:

- It reads the HTML and builds the structure (this is a heading, this is a paragraph, this is a button)
- It reads the CSS and applies the styling to that structure
- It runs the JavaScript, which can change the structure or styling while you're using the page

This process happens every time you load or refresh a page. If you right-click almost any website and choose "Inspect," you can see this raw HTML, CSS, and JavaScript directly. Try it on a page you use often. It demystifies things fast.`
          },
          {
            title: "Lesson 3: Domains, hosting, and deployment in plain terms",
            content: `Three terms that get thrown around before anyone explains them:

- **Domain** — the address people type to find your site (like example.com). You rent this, you don't own it outright, similar to a phone number.
- **Hosting** — the server that stores your website's files and serves them to anyone who visits. Without hosting, your code just sits on your own computer where nobody else can reach it.
- **Deployment** — the act of putting your code onto that hosting server so it becomes a live, public website.

You'll go through this process yourself in Stage 7, once there's a real project to deploy.`
          }
        ]
      },
      {
        title: "Module 1.3 — Setting expectations",
        lessons: [
          {
            title: "Lesson 1: What you'll be able to build by the end of this course",
            content: `By the end, you'll be able to build a working app that has a frontend people interact with, a database that stores information, a login system, and is live on the internet for anyone to use. You'll also be able to use AI coding tools to speed up that process without losing track of what the code is actually doing.

You won't come out of this course knowing everything. Nobody does. You'll come out with enough of a foundation that you can keep learning on your own, and enough judgment to tell when an AI tool has given you something wrong.`
          },
          {
            title: "Lesson 2: Why AI tools don't remove the need to understand code",
            content: `AI tools can write code fast. They can also write code that looks correct and isn't, or that solves a different problem than the one you actually have. If you don't understand what the code does, you can't catch that.

The goal of this course isn't to make you memorize syntax. It's to make sure you can read code, understand what it's doing, and know when something's off, whether you wrote it or an AI did.`
          },
          {
            title: "Lesson 3: How to use this course",
            content: `A few habits that make a real difference:

- Type out every example yourself instead of copying and pasting. Typing forces your brain to process it; copying doesn't.
- Do the projects at the end of each module before moving on, even if they feel small.
- If a concept doesn't make sense, keep moving and come back to it after the next lesson. A lot of things click retroactively once you've seen how they're used.
- Expect to be confused sometimes. Confusion while learning to code is not a sign you're bad at it. It's just what learning a new system feels like from the inside.`
          }
        ]
      }
    ]
  },
  {
    id: "stage-2",
    number: 2,
    title: "The Three Building Blocks",
    subtitle: "Hands-on HTML structure, CSS styling, and JavaScript interactivity",
    icon: "code",
    widgetType: "live-sandbox",
    widgetTitle: "Interactive Live Code Sandbox",
    widgetDescription: "Edit HTML, CSS, and JavaScript in real-time and preview the interactive output instantly.",
    quiz: [
      {
        question: "Which semantic HTML element should wrap the main navigation links of a page?",
        options: ["<div>", "<nav>", "<section>", "<header>"],
        answer: 1,
        explanation: "<nav> explicitly signifies navigation links for accessibility and search engines."
      },
      {
        question: "In the CSS Box Model, what is the space INSIDE the border surrounding the content called?",
        options: ["Margin", "Padding", "Outline", "Width"],
        answer: 1,
        explanation: "Padding is internal spacing between the content and the element's border."
      },
      {
        question: "How do you select an element with id='submitBtn' and attach a click event in JavaScript?",
        options: [
          "document.querySelector('.submitBtn').onClick()",
          "document.getElementById('submitBtn').addEventListener('click', fn)",
          "document.find('submitBtn').on('click')",
          "document.getElement('submitBtn').click(fn)"
        ],
        answer: 1,
        explanation: "document.getElementById('submitBtn').addEventListener('click', handler) is the standard DOM API."
      }
    ],
    modules: [
      {
        title: "Module 2.1 — HTML (structure)",
        lessons: [
          {
            title: "Lesson 1: Tags, elements, and attributes",
            content: `HTML is built from tags. A tag wraps content and tells the browser what that content is.

\`\`\`html
<p>This is a paragraph.</p>
\`\`\`

\`<p>\` is the opening tag, \`</p>\` is the closing tag, and together with the text between them, this whole thing is called an element. Most tags come in pairs like this.

Tags can also carry attributes, which give extra information:

\`\`\`html
<a href="https://example.com">Click here</a>
\`\`\`

\`href\` is an attribute on the \`<a>\` (link) tag, telling the browser where the link should go.`
          },
          {
            title: "Lesson 2: Building a page: headings, paragraphs, links, images",
            content: `Every HTML page needs a basic skeleton:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>

  <h1>This is a heading</h1>
  <p>This is a paragraph of text.</p>
  <a href="https://example.com">This is a link</a>
  <img src="photo.jpg" alt="A description of the photo">

</body>
</html>
\`\`\`

- \`<h1>\` through \`<h6>\` are headings, \`<h1>\` being the largest and most important.
- \`<p>\` is a paragraph.
- \`<a>\` is a link. The \`href\` attribute holds the destination.
- \`<img>\` is an image. It has no closing tag. \`src\` points to the image file, \`alt\` describes it for screen readers and for when the image fails to load.

Put this into your \`index.html\` file and open it in a browser to see it rendered.`
          },
          {
            title: "Lesson 3: Lists, tables, and forms",
            content: `Lists:

\`\`\`html
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>
\`\`\`

\`<ul>\` is an unordered (bulleted) list. Use \`<ol>\` instead for a numbered list. Each item goes inside \`<li>\`.

Tables:

\`\`\`html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Sam</td>
    <td>28</td>
  </tr>
</table>
\`\`\`

\`<tr>\` is a row, \`<th>\` is a header cell, \`<td>\` is a regular cell.

Forms:

\`\`\`html
<form>
  <input type="text" placeholder="Your name">
  <button type="submit">Submit</button>
</form>
\`\`\`

Forms collect input from a user. You'll come back to these once JavaScript can make them do something.`
          },
          {
            title: "Lesson 4: Semantic HTML (why tag choice matters)",
            content: `You could technically build an entire page using only \`<div>\` tags (a generic container with no built-in meaning) and it would look fine. It would also be harder for browsers, screen readers, and search engines to understand what's actually on the page.

Semantic tags describe their purpose:

\`\`\`html
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<footer>...</footer>
\`\`\`

A \`<nav>\` tag tells the browser and any assistive technology "this is navigation," instead of just "this is a box." Using the right tag for the job costs nothing extra and makes your page more usable for everyone, including people relying on screen readers.`
          },
          {
            title: "Project: A one-page personal profile (structure only)",
            content: `Using what you've learned so far, build a page with:
- A heading with your name
- A paragraph describing yourself
- A list of three interests
- A link to something you like online
- An image (any placeholder image works)

Don't worry about how it looks yet. That's next.`
          }
        ]
      },
      {
        title: "Module 2.2 — CSS (style)",
        lessons: [
          {
            title: "Lesson 1: Selectors and the box model",
            content: `CSS rules follow this pattern:

\`\`\`css
selector {
  property: value;
}
\`\`\`

Example:

\`\`\`css
h1 {
  color: blue;
}
\`\`\`

This selects every \`<h1>\` on the page and makes its text blue.

Every element on a page is a box, whether it looks like one or not. This is the box model:
- **Content** — the actual text or image
- **Padding** — space inside the box, between the content and its border
- **Border** — a line around the box
- **Margin** — space outside the box, between it and other elements

\`\`\`css
p {
  padding: 10px;
  border: 1px solid black;
  margin: 20px;
}
\`\`\``
          },
          {
            title: "Lesson 2: Colors, fonts, spacing",
            content: `\`\`\`css
body {
  font-family: Arial, sans-serif;
  color: #333333;
  background-color: #f5f5f5;
}
\`\`\`

Colors can be written as names (\`blue\`), hex codes (\`#3498db\`), or RGB values (\`rgb(52, 152, 219)\`). Hex codes are the most common in real projects.

Link a CSS file to your HTML by adding this inside \`<head>\`:

\`\`\`html
<link rel="stylesheet" href="style.css">
\`\`\`

Create a \`style.css\` file in the same folder and start styling your profile page.`
          },
          {
            title: "Lesson 3: Layout basics: flexbox",
            content: `Flexbox is the most common way to arrange elements side by side or in a column, without fighting the browser's default layout behavior.

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

- \`display: flex\` turns an element into a flex container.
- \`justify-content\` controls spacing along the main direction (left to right by default).
- \`align-items\` controls alignment along the other direction.

Try wrapping your interests list in a \`<div class="container">\` and applying \`display: flex\` to see items line up horizontally instead of stacking.`
          },
          {
            title: "Lesson 4: Responsive design (making it work on phone and desktop)",
            content: `A page that looks fine on a laptop can break on a phone. Media queries let you apply different styles based on screen size:

\`\`\`css
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }
}
\`\`\`

This rule only applies when the screen is 600 pixels wide or narrower, which covers most phones.`
          },
          {
            title: "Project: Style the profile page",
            content: `Apply what you've learned to the profile page from Module 2.1:
- Give it a font, colors, and spacing that don't look like the browser's default
- Arrange the interests list using flexbox
- Add a media query so the layout adjusts on a narrow screen`
          }
        ]
      },
      {
        title: "Module 2.3 — JavaScript (behavior)",
        lessons: [
          {
            title: "Lesson 1: Variables and data types",
            content: `A variable stores a value so you can use it later.

\`\`\`javascript
let name = "Sam";
let age = 28;
let isStudent = false;
\`\`\`

- \`let\` creates a variable that can change later.
- \`const\` creates a variable that can't be reassigned.
- Common data types: strings (text, in quotes), numbers, booleans (true or false).`
          },
          {
            title: "Lesson 2: Functions",
            content: `A function is a named block of instructions you can run whenever you need it.

\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}

greet("Sam"); // returns "Hello, Sam"
\`\`\`

\`name\` here is a parameter, a placeholder for whatever value you pass in when you call the function.`
          },
          {
            title: "Lesson 3: Conditionals and loops",
            content: `Conditionals let code make decisions:

\`\`\`javascript
let age = 20;

if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("Not yet.");
}
\`\`\`

Loops let code repeat:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

This runs the code inside the loop 5 times, with \`i\` counting from 0 to 4.`
          },
          {
            title: "Lesson 4: Working with the DOM (making a page react to clicks)",
            content: `The DOM (Document Object Model) is how JavaScript sees and changes your HTML while the page is running.

\`\`\`html
<button id="myButton">Click me</button>

<script>
  document.getElementById("myButton").addEventListener("click", function() {
    alert("Button clicked!");
  });
</script>
\`\`\`

\`getElementById\` finds the element. \`addEventListener\` tells it to run a function whenever a specific event, like a click, happens.`
          },
          {
            title: "Lesson 5: Arrays and objects",
            content: `An array holds a list of values:

\`\`\`javascript
let interests = ["reading", "hiking", "coding"];
console.log(interests[0]); // "reading"
\`\`\`

An object holds related values under named keys:

\`\`\`javascript
let person = {
  name: "Sam",
  age: 28
};
console.log(person.name); // "Sam"
\`\`\`

You'll use both constantly, especially once you start working with data from a database or an API.`
          },
          {
            title: "Project: Add an interactive element to the profile page",
            content: `Add one of the following to your profile page:
- A button that shows or hides your list of interests when clicked
- A form field where typing a name updates a greeting on the page
- A counter that increases by one each time a button is clicked

Any of these uses everything from this module: variables, a function, an event listener, and the DOM.`
          }
        ]
      }
    ]
  },
  {
    id: "stage-3",
    number: 3,
    title: "Tools of the Trade",
    subtitle: "Mastering VS Code, the Command Line, and Git/GitHub version control",
    icon: "terminal",
    widgetType: "git-simulator",
    widgetTitle: "Interactive Git Terminal & Branch Visualizer",
    widgetDescription: "Type real Git commands and visualize how commits and branches form a timeline.",
    quiz: [
      {
        question: "Which command initialises Git tracking inside a project folder?",
        options: ["git start", "git init", "git new", "git create"],
        answer: 1,
        explanation: "'git init' initializes a hidden .git directory to begin version control tracking."
      },
      {
        question: "What does 'git commit -m \"Add navigation bar\"' do?",
        options: [
          "Uploads code to GitHub",
          "Saves a snapshot of staged changes with a descriptive message",
          "Deletes temporary files",
          "Downloads updates from the internet"
        ],
        answer: 1,
        explanation: "Commits save a staged snapshot locally with a log message."
      },
      {
        question: "How do you safely create and switch to a new branch called 'feature-login' in one step?",
        options: [
          "git branch feature-login",
          "git checkout -b feature-login",
          "git push -b feature-login",
          "git merge feature-login"
        ],
        answer: 1,
        explanation: "'git checkout -b <name>' creates the branch and immediately switches to it."
      }
    ],
    modules: [
      {
        title: "Module 3.1 — VS Code",
        lessons: [
          {
            title: "Lesson 1: Interface tour",
            content: `VS Code has four areas you'll use constantly:

- **Editor** — the main area where you write and edit code
- **Sidebar** — the file explorer on the left, showing your project's folders and files
- **Terminal panel** — a command line built into the editor (open it with Ctrl+\` on Windows/Linux, Cmd+\` on Mac)
- **Status bar** — the strip along the bottom showing things like your current Git branch and file type

Open your \`profile-page\` folder from Stage 2 in VS Code now (File > Open Folder) and locate each of these four areas before moving on.`
          },
          {
            title: "Lesson 2: Extensions worth installing on day one",
            content: `Extensions add features VS Code doesn't have by default. A few that matter early on:

- **Live Server** — lets you view your HTML file in a browser that auto-refreshes every time you save
- **Prettier** — automatically formats your code so it's consistent and readable
- **ESLint** — flags JavaScript mistakes before you run the code

Install these from the Extensions panel (the icon that looks like four squares, in the left sidebar).`
          },
          {
            title: "Lesson 3: Keyboard shortcuts that save real time",
            content: `A handful worth memorizing immediately:

- Save: Ctrl+S / Cmd+S
- Find in file: Ctrl+F / Cmd+F
- Find and replace: Ctrl+H / Cmd+H
- Comment out a line: Ctrl+/ / Cmd+/
- Move a line up or down: Alt+Up/Down / Option+Up/Down
- Open the terminal: Ctrl+\` / Cmd+\`

These stop being "shortcuts you look up" and become automatic within a week of regular use.`
          },
          {
            title: "Lesson 4: Running and debugging code inside the editor",
            content: `With Live Server installed, right-click your \`index.html\` file and choose "Open with Live Server." Your page opens in a browser, and any time you save a change in VS Code, the page updates automatically.

For JavaScript, VS Code has a built-in debugger that lets you pause code mid-run and inspect what's happening. You'll use this more once your code gets complex enough that \`console.log\` alone isn't enough to find a bug, which comes up in Stage 4's debugging module.`
          }
        ]
      },
      {
        title: "Module 3.2 — The Command Line",
        lessons: [
          {
            title: "Lesson 1: What the terminal is and why it's not scary",
            content: `The terminal is a text-based way to give your computer instructions, instead of clicking through folders and menus. It looks intimidating because it's blank and gives no visual hints, but it only understands a small set of commands, and you'll use the same handful repeatedly.

Every command follows the same basic shape: you type an instruction, press Enter, and the terminal does it or tells you what went wrong.`
          },
          {
            title: "Lesson 2: Core commands",
            content: `These work the same way on Mac and Linux. Windows users should use Git Bash (installed alongside Git in the next module) for identical behavior.

\`\`\`bash
pwd                  # show the current folder you're in
ls                   # list files and folders here
cd folder-name        # move into a folder
cd ..                # move up one folder
mkdir new-folder      # create a new folder
touch file.txt        # create a new empty file
rm file.txt           # delete a file
\`\`\`

Practice by navigating to your \`profile-page\` folder using only these commands, no clicking.`
          },
          {
            title: "Lesson 3: Running a project from the terminal",
            content: `Many tools you'll use later, including AI coding tools, expect you to run commands from inside your project folder. For example, once you start using Node.js-based projects:

\`\`\`bash
cd my-project
npm install
npm start
\`\`\`

\`npm install\` downloads everything the project needs to run. \`npm start\` runs it. You'll see this pattern constantly from here on, so it's worth typing it out a few times now even without a real project behind it yet.`
          },
          {
            title: "Lesson 4: Reading error messages without panicking",
            content: `Terminal errors look alarming because they're often long, but they usually tell you exactly what went wrong and where.

Example:

\`\`\`
Error: Cannot find module 'express'
    at Function.Module._resolveFilename
\`\`\`

Read the first line first. "Cannot find module 'express'" means the code is trying to use something called \`express\` that hasn't been installed. The fix, in this case, is running \`npm install express\`.

Habit worth building now: read the first line of any error before scrolling through the rest.`
          }
        ]
      },
      {
        title: "Module 3.3 — Git and GitHub",
        lessons: [
          {
            title: "Lesson 1: What version control solves",
            content: `Without version control, "saving your work" means overwriting the last version, with no way back if something breaks. Version control keeps a full history of every change, so you can see what changed, when, and undo it if needed.

Git is the tool that tracks this history on your computer. GitHub is a website that stores a copy of that history online, so you can back it up and share it with others.`
          },
          {
            title: "Lesson 2: Git basics",
            content: `First, tell Git who you are (one-time setup):

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
\`\`\`

Then, inside a project folder:

\`\`\`bash
git init                    # start tracking this folder with Git
git status                  # see what's changed
git add index.html           # stage a specific file for the next commit
git add .                   # stage everything that's changed
git commit -m "Add profile page structure"   # save a snapshot with a message
git log                     # see the history of commits
\`\`\`

A commit is a saved snapshot of your project at a specific point, with a message describing what changed. Commit often, with clear messages. "Fixed stuff" tells you nothing six months from now. "Fix broken link in navigation" does.`
          },
          {
            title: "Lesson 3: GitHub basics",
            content: `Create a free account at github.com, then create a new repository (an online storage location for a project). Connect your local project to it:

\`\`\`bash
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
\`\`\`

\`git push\` uploads your commits to GitHub. \`git pull\` downloads any changes from GitHub that aren't on your computer yet, which matters once you're working across multiple machines or with other people.`
          },
          {
            title: "Lesson 4: Branches and pull requests",
            content: `A branch is a separate line of work that doesn't affect the main version until you merge it in.

\`\`\`bash
git branch new-feature       # create a branch
git checkout new-feature     # switch to it
\`\`\`

Or in one step:

\`\`\`bash
git checkout -b new-feature
\`\`\`

Real scenario: you want to try adding a dark mode toggle to your profile page, but you're not sure it'll work. Instead of risking your working page, you create a branch, build the feature there, and only merge it back into \`main\` once it works.

A pull request (on GitHub) is a formal request to merge one branch into another, with a place for comments and review before the merge happens. You'll use this constantly once working with other people, and it's good practice to use it even solo, since it keeps a clear record of what each change was for.`
          },
          {
            title: "Lesson 5: Undoing mistakes",
            content: `\`\`\`bash
git checkout -- file.html          # discard uncommitted changes to a file
git reset HEAD~1                    # undo the last commit, keep the changes
git revert <commit-hash>            # create a new commit that undoes a previous one
\`\`\`

\`git revert\` is the safest option once you've pushed to GitHub, since it doesn't rewrite history that others might already have.`
          },
          {
            title: "Project: Push the profile page to GitHub",
            content: `- Initialize Git in your \`profile-page\` folder
- Make at least three separate commits, each with a clear message, as you make small changes
- Create a GitHub repository and push your project to it
- Create a branch, make one change on it, and merge it back into \`main\``
          }
        ]
      }
    ]
  },
  {
    id: "stage-4",
    number: 4,
    title: "Core Concepts Every Developer Needs",
    subtitle: "Frontend vs Backend, APIs, Databases, Access & Security, Design Thinking, and Debugging",
    icon: "layers",
    widgetType: "api-inspector",
    widgetTitle: "Interactive API & Authentication Inspector",
    widgetDescription: "Test HTTP requests (GET, POST), status codes, and examine Session Cookies vs JWT Auth Tokens.",
    quiz: [
      {
        question: "What is the primary role of an API (Application Programming Interface)?",
        options: [
          "To design visual UI components",
          "To allow different software systems to communicate and exchange data",
          "To compile JavaScript into machine code",
          "To style mobile layout break points"
        ],
        answer: 1,
        explanation: "APIs act as contracts allowing apps to request and receive structured data from servers."
      },
      {
        question: "Which statement accurately describes Authentication vs Authorization?",
        options: [
          "Authentication is permissions; Authorization is identity",
          "Authentication verifies WHO you are; Authorization determines WHAT you can do",
          "They mean the exact same thing",
          "Authentication is only for backend databases"
        ],
        answer: 1,
        explanation: "Authentication proves user identity (log in); Authorization checks user rights (admin vs guest)."
      },
      {
        question: "What is a Stack Trace useful for when debugging?",
        options: [
          "Speeding up web performance",
          "Tracing the exact sequence of function calls leading to an error",
          "Encrypting user passwords",
          "Connecting to a database"
        ],
        answer: 1,
        explanation: "A stack trace reveals the precise file, function line numbers, and call history where an unhandled error occurred."
      }
    ],
    modules: [
      {
        title: "Module 4.1 — How Software Is Put Together",
        lessons: [
          {
            title: "Lesson 1: Frontend vs backend",
            content: `The frontend is everything the user sees and interacts with directly: the HTML, CSS, and JavaScript running in their browser. The backend is the part running on a server, out of view, that handles data, logic, and anything that shouldn't be exposed to the user directly, like passwords or payment processing.

Example: on a shopping site, the frontend shows you the product images and the "Add to Cart" button. The backend checks whether that item is actually in stock and stores your order once you check out.`
          },
          {
            title: "Lesson 2: What an API is",
            content: `An API (Application Programming Interface) is a defined way for one piece of software to ask another piece of software for something, without needing to know how that other software works internally.

Example: a weather app on your phone doesn't run its own weather sensors. It sends a request to a weather service's API, asking for today's forecast for your location, and gets back data it displays.`
          },
          {
            title: "Lesson 3: What a database is",
            content: `A database is a structured place to store data so it can be saved, searched, and updated reliably. Instead of storing a user's information in a plain text file, a database organizes it into tables (or similar structures) that can be queried directly, like "find every user who signed up this week."`
          },
          {
            title: "Lesson 4: Client-side vs server-side rendering",
            content: `Client-side rendering means the browser builds the page using JavaScript after the initial page loads. Server-side rendering means the server sends back a fully built page, ready to display, before any JavaScript runs.

Each has trade-offs: server-side rendering tends to show content faster on first load, client-side rendering tends to feel smoother once loaded, since the page doesn't need a full reload for every change. Most real projects use a mix.`
          },
          {
            title: "Resources for Module 4.1",
            content: `- Website: [MDN Web Docs – How the web works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works) — the standard reference nearly every developer uses, written for beginners
- Video: [APIs for Beginners – Full Course](https://www.youtube.com/watch?v=WXsD0ZgxjRw) — covers what an API is and how to use one, from zero`
          }
        ]
      },
      {
        title: "Module 4.2 — Access and Security Basics",
        lessons: [
          {
            title: "Lesson 1: Authentication (proving who you are)",
            content: `Authentication is the process of verifying identity: confirming that you are who you say you are. The most common form is a username and password, though fingerprint scans, face recognition, and one-time codes sent by text are all forms of authentication too.`
          },
          {
            title: "Lesson 2: Authorization (what you're allowed to do)",
            content: `Authorization happens after authentication, and decides what you're allowed to access or do. Two people can log into the same app (both authenticated) but have completely different permissions (different authorization): one might be able to view a shared document, the other might be able to edit it.

A simple way to keep the two straight: authentication answers "who are you," authorization answers "what can you do."`
          },
          {
            title: "Lesson 3: Sessions, tokens, and cookies",
            content: `Once you log in, the app needs a way to remember you're logged in as you move between pages, since each request to a server is otherwise treated as brand new.

- A **cookie** is a small piece of data stored in your browser and sent along with each request.
- A **session** is a record on the server tied to that cookie, remembering who you are.
- A **token** (commonly a JWT, JSON Web Token) is a self-contained piece of data that proves who you are without the server needing to store a session at all. It's checked and trusted directly.

Which approach a project uses depends on its scale and needs. You'll encounter both.`
          },
          {
            title: "Lesson 4: Common security mistakes beginners make",
            content: `- Storing passwords as plain text instead of hashing them
- Trusting data sent from the browser without checking it on the server too
- Hardcoding secret keys directly into code that gets pushed to GitHub
- Giving every user full access by default instead of only what they need

None of these need to be fully understood yet. Knowing they exist is enough at this stage, so you recognize them later.`
          },
          {
            title: "Resources for Module 4.2",
            content: `- Website: [Auth0 – Authentication vs. Authorization](https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization) — clear reference from a company that builds this infrastructure for a living
- Video: [Authentication vs Authorization, explained in 3 minutes](https://www.youtube.com/watch?v=DakSdpODf-U)`
          }
        ]
      },
      {
        title: "Module 4.3 — Design Thinking for Developers",
        lessons: [
          {
            title: "Lesson 1: UI (what the user sees)",
            content: `UI (User Interface) is the visual layer: buttons, colors, fonts, spacing, icons. It's the part of a product you can point at and describe by appearance.`
          },
          {
            title: "Lesson 2: UX (how the user experiences it)",
            content: `UX (User Experience) is broader: how easy the product is to use, how it feels to accomplish a task, whether the user finds what they need without frustration. Two apps can have identical buttons and colors (same UI) and completely different UX, if one makes a task take three clicks and the other makes it take twelve.`
          },
          {
            title: "Lesson 3: Why the two aren't the same job, but every developer needs both",
            content: `A well-designed button (good UI) placed somewhere the user never looks (bad UX) still fails. As a developer, you're often the one deciding exact spacing, wording, and flow, even if a designer hands you a mockup. Understanding both means you catch problems before a user does.`
          },
          {
            title: "Resources for Module 4.3",
            content: `- Website: [Figma – UI vs UX: What's the Difference?](https://www.figma.com/resource-library/difference-between-ui-and-ux/)
- Video: [UI vs UX Design Explained in 4 Minutes](https://www.youtube.com/watch?v=OASInJeNE3w)`
          }
        ]
      },
      {
        title: "Module 4.4 — Writing and Fixing Code",
        lessons: [
          {
            title: "Lesson 1: What debugging actually is",
            content: `Debugging is the process of finding out why code isn't doing what you expected, then fixing it. It's not a special skill some people have and others don't. It's a repeatable process: notice something's wrong, narrow down where, form a guess, test the guess, repeat.`
          },
          {
            title: "Lesson 2: Reading a stack trace",
            content: `A stack trace is the list of function calls that were happening when an error occurred, usually shown from the error itself up through everything that led to it. Read the top line first. It usually names the actual error. The lines below it show the path the code took to get there, which helps you trace backward to the cause.`
          },
          {
            title: "Lesson 3: Using console.log and breakpoints",
            content: `\`console.log()\` prints a value to the console so you can see what a variable actually holds at a given point:

\`\`\`javascript
let total = price * quantity;
console.log(total); // check if this is the number you expected
\`\`\`

A breakpoint, set in VS Code or a browser's developer tools, pauses code execution at a specific line, letting you inspect every variable's current value before continuing. It's slower to set up than a \`console.log\` but gives a far more complete picture for a tricky bug.`
          },
          {
            title: "Lesson 4: Common bug patterns for beginners",
            content: `- Off-by-one errors in loops (looping one time too many or too few)
- Comparing a string to a number without noticing (\`"5" == 5\` behaves differently than \`"5" === 5\`)
- Forgetting that a variable's value changed earlier in the code than expected
- Typos in variable or function names that don't throw an error but silently do nothing`
          },
          {
            title: "Resources for Module 4.4",
            content: `- Website: [freeCodeCamp – What is Debugging? A Simple Guide for Beginners](https://www.freecodecamp.org/news/what-is-debugging-how-to-debug-code/)
- Video: [How To Debug Like a Pro, From Beginner To Expert](https://www.youtube.com/watch?v=NUrV_FbJqWs)`
          }
        ]
      }
    ]
  },
  {
    id: "stage-5",
    number: 5,
    title: "Working with AI Models",
    subtitle: "Understanding tokens, context windows, and high-impact prompt engineering",
    icon: "cpu",
    widgetType: "tokenizer-sim",
    widgetTitle: "Interactive LLM Tokenizer & Context Simulator",
    widgetDescription: "Type text to see token counts, cost estimations, and watch how context window limits behave.",
    quiz: [
      {
        question: "What is a 'token' in the context of Large Language Models?",
        options: [
          "A security password for logging into an LLM",
          "The atomic unit of text (word fragment) processed by the model",
          "A cryptocurrency used to pay AI companies",
          "A physical hardware chip"
        ],
        answer: 1,
        explanation: "Tokens are word fragments or chunks of characters that LLMs process as text units."
      },
      {
        question: "Why does an AI tool sometimes 'forget' instructions in a very long conversation?",
        options: [
          "The AI got tired",
          "Earlier messages dropped out of the model's fixed context window limit",
          "The server turned off",
          "The code had a syntax error"
        ],
        answer: 1,
        explanation: "Models have a maximum token capacity (context window). Older messages exceed the limit and are truncated."
      },
      {
        question: "Which prompt structure yields the highest quality code from an AI assistant?",
        options: [
          "Vague: 'Make my website look better'",
          "Specific: Clear goal, exact constraints, error log snippet, and existing code snippet",
          "Asking the AI to guess what you want",
          "A single one-word command"
        ],
        answer: 1,
        explanation: "Specific prompts with existing code, target goals, error logs, and constraints eliminate ambiguity."
      }
    ],
    modules: [
      {
        title: "Module 5.1 — How AI Models Work, Practically",
        lessons: [
          {
            title: "Lesson 1: What a token is",
            content: `A token is the unit of text an AI model actually reads. It's not always a full word. Common words are often a single token, while longer or less common words get split into pieces.

Example: "coding" might be one token, while "unhelpfulness" might get split into pieces like "un," "help," "ful," "ness."

This matters for two practical reasons: models have a maximum number of tokens they can process at once, and many AI tools charge based on how many tokens you send and receive.`
          },
          {
            title: "Lesson 2: What context is, and why it runs out",
            content: `Context is everything the model can currently "see": your conversation so far, any files you've shared, any instructions given earlier. This is measured in tokens too, and every model has a limit called a context window.

Once a conversation or a task gets long enough, older parts can fall outside that window and the model stops being able to reference them, even though they were mentioned earlier. This is why an AI coding tool can seem to "forget" something you told it ten minutes ago in a long session. It hasn't gotten worse at the task. It's run out of room to hold everything at once.

Practical takeaway: for long coding sessions, periodically restate anything important instead of assuming the model still has it in view.`
          },
          {
            title: "Lesson 3: What a model can and can't know about your project",
            content: `A model only knows what's inside its context window at that moment, plus whatever general knowledge it was trained on. It doesn't automatically know your project's file structure, your database schema, or a decision you made in a different conversation, unless you tell it or it's set up to read your files directly (which tools like Cursor and Claude Code do).

This is why vague requests like "fix my app" produce weak results. The model isn't being careless. It genuinely doesn't have enough information yet.`
          },
          {
            title: "Resources for Module 5.1",
            content: `- Website: [Anthropic – Understanding tokens and context](https://docs.claude.com) — official documentation on how Claude models process input, worth searching for the current tokens and context pages directly
- Video: [Understanding Tokens in AI, explained simply](https://www.youtube.com/results?search_query=what+is+a+token+in+ai+explained) — search this term for an up-to-date beginner explanation, since specific videos on this topic age quickly as models change`
          }
        ]
      },
      {
        title: "Module 5.2 — Prompting",
        lessons: [
          {
            title: "Lesson 1: What a prompt is",
            content: `A prompt is the instruction or question you give an AI model. It's the only way you communicate what you want, so its clarity directly determines the quality of what comes back.`
          },
          {
            title: "Lesson 2: Vague prompt vs specific prompt",
            content: `Vague: "Make my website better."

Specific: "The navigation menu on my homepage doesn't collapse into a hamburger icon on mobile screens under 500px wide. Fix the CSS so it does, without changing how it looks on desktop."

The second version tells the model exactly what's wrong, where, and what should stay the same. The first forces the model to guess what "better" means, and it will guess, often incorrectly.`
          },
          {
            title: "Lesson 3: Giving the model the right context",
            content: `When asking an AI coding tool for help, include:
- What the code currently does
- What you want it to do instead
- Any constraints (a library you must use, a style you're following, a part of the code that shouldn't change)
- The actual error message, if there is one, copied exactly

Skipping the error message and describing it from memory ("it says something about undefined") loses information that would otherwise point straight to the fix.`
          },
          {
            title: "Lesson 4: Iterating on a bad response instead of starting over",
            content: `If a response is close but not right, tell the model specifically what's wrong with it rather than rewriting the whole prompt from scratch:

"This works, but it's re-fetching the data on every keystroke instead of only when the user stops typing. Add debouncing so it only fetches after 300ms of no typing."

This keeps the parts that already work while fixing exactly what doesn't, and tends to get a better result faster than starting over.`
          },
          {
            title: "Resources for Module 5.2",
            content: `- Website: [Anthropic – Prompt engineering overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) — direct guidance from the company building Claude, on being clear, specific, and structured in prompts
- Video: [Prompt Engineering Tutorial, freeCodeCamp](https://www.youtube.com/watch?v=_ZvnD73m40o) — full walkthrough of prompting technique with examples`
          }
        ]
      }
    ]
  },
  {
    id: "stage-6",
    number: 6,
    title: "AI Coding Tools in Practice",
    subtitle: "Mastering Cursor, Claude Code, diff reviews, and agentic workflows",
    icon: "zap",
    widgetType: "prompt-transformer",
    widgetTitle: "Interactive Prompt Transformer & Diff Viewer",
    widgetDescription: "Compare vague prompts vs engineered prompts and review AI diff proposals.",
    quiz: [
      {
        question: "What is the primary advantage of an in-editor AI tool (like Cursor or Claude Code) over a chat tab?",
        options: [
          "It uses less internet",
          "It directly accesses project files, repository structure, and terminal commands",
          "It never makes mistakes",
          "It doesn't require an API key"
        ],
        answer: 1,
        explanation: "In-editor tools read multi-file context, run terminal commands, and apply code diffs directly."
      },
      {
        question: "What CRITICAL step should you take before accepting an AI agent's multi-file change?",
        options: [
          "Accept all changes instantly without reading",
          "Review the diff (before-and-after comparison) to verify logic and check for accidental deletions",
          "Reboot your computer",
          "Delete your Git repository"
        ],
        answer: 1,
        explanation: "Always review diffs to catch unwanted code deletions or unexpected dependency additions."
      },
      {
        question: "Why should you make a Git commit before asking an AI tool to build a large feature?",
        options: [
          "Git requires a commit every 5 minutes",
          "It provides a clean safety checkpoint so you can instantly rollback if the AI breaks something",
          "It makes the AI run 10x faster",
          "It locks the files from being edited"
        ],
        answer: 1,
        explanation: "Committing prior to AI changes ensures you can easily \`git checkout\` back to working code."
      }
    ],
    modules: [
      {
        title: "Module 6.1 — The Tool Landscape",
        lessons: [
          {
            title: "Lesson 1: Chat-based AI vs in-editor AI",
            content: `A chat-based tool (like a browser tab with an AI chat) has no direct access to your project. You copy code in, copy answers out, manually.

An in-editor tool (like Cursor or Claude Code) can read your actual files, see your folder structure, run commands, and make changes directly, without you copying anything back and forth. This is a meaningful difference once a project has more than a couple of files, since the tool can see how everything connects.`
          },
          {
            title: "Lesson 2: Autocomplete tools vs agentic tools",
            content: `Autocomplete tools suggest the next few lines as you type, similar to predictive text. You stay in control of every keystroke.

Agentic tools take a task description and carry out multiple steps on their own: editing several files, running commands, checking the result, and adjusting if something fails. Cursor and Claude Code both offer autocomplete-style help and full agentic workflows, depending on which mode you use.`
          },
          {
            title: "Lesson 3: Picking a tool for the task at hand",
            content: `Small, well-defined change (rename a variable everywhere, fix one specific bug): autocomplete or a short direct prompt is usually faster than handing it to an agent.

Larger task (add a full feature, set up a new part of the project): an agentic workflow, where you describe the goal and let the tool work through the steps, tends to save more time, as long as you review what it did.`
          },
          {
            title: "Resources for Module 6.1",
            content: `- Website: [Cursor vs Claude Code comparison](https://www.developersdigest.tech/blog/what-is-cursor-ai-code-editor-2026) — a current side-by-side of the two tools' approaches
- Video: search "Cursor vs Claude Code 2026" on YouTube for an up-to-date comparison, since new releases from both tools come out often enough that a single fixed video ages quickly`
          }
        ]
      },
      {
        title: "Module 6.2 — Working with Cursor",
        lessons: [
          {
            title: "Lesson 1: Setup and interface",
            content: `Download Cursor from cursor.com and install it like any other application. Since it's built on top of VS Code, the layout will look familiar if you completed Stage 3: a sidebar for files, an editor area, and a terminal panel. Cursor adds an AI chat panel alongside these, plus inline AI features you can trigger directly inside a file.

If you were already using VS Code, Cursor can import your existing settings and extensions during setup.`
          },
          {
            title: "Lesson 2: Asking for a feature vs asking for a whole file",
            content: `For a small, contained request, select the relevant code and describe the change directly:

"Add error handling so this function shows a message instead of crashing if the API call fails."

For a larger request spanning multiple files, describe the goal at a higher level and let Cursor propose changes across the project:

"Add a dark mode toggle that switches the whole site's color scheme and remembers the user's choice between visits."

Cursor will show proposed changes as a diff (a before-and-after comparison) before applying them.`
          },
          {
            title: "Lesson 3: Reviewing AI-written code before accepting it",
            content: `Never accept a multi-file change without reading the diff first. Check specifically for:
- Code that was deleted that shouldn't have been
- New dependencies being added that you didn't ask for
- Logic that technically runs but doesn't match what you actually meant

This review step is the difference between using Cursor to move faster and using it to accumulate code you don't understand.`
          },
          {
            title: "Resources for Module 6.2",
            content: `- Website: [Cursor documentation](https://cursor.com) — check the docs section on the official site for the current setup and feature list
- Video: search "Cursor tutorial for beginners" on YouTube, filtered to the most recent upload, for a current walkthrough of the interface`
          }
        ]
      },
      {
        title: "Module 6.3 — Working with Claude Code",
        lessons: [
          {
            title: "Lesson 1: Setup and interface",
            content: `Claude Code runs in your terminal (the same terminal you learned in Stage 3), rather than as a separate visual editor. It reads your project directly from the folder you run it in. For the current installation steps for your operating system, check docs.claude.com's Claude Code section directly, since install methods (native installer vs. npm) have changed over time and the docs stay current.

Once installed, you start it by running a command inside your project folder, and it opens an interactive session where you describe tasks in plain language.`
          },
          {
            title: "Lesson 2: Giving it a task end to end",
            content: `Claude Code works well when given a clear goal and left to work through the steps:

"Add a contact form to the site. It should validate that the email field is a real email format before allowing submission."

It will read the relevant files, make changes, and can run your project to check its own work, all inside the same terminal session.`
          },
          {
            title: "Lesson 3: Checking its work, catching mistakes it makes confidently",
            content: `An AI tool can be completely wrong while sounding completely certain. Before trusting a result:
- Run the project yourself and actually test the feature it says it built
- Ask it to explain a specific change if you don't understand why it made that choice
- Check that it didn't quietly change something unrelated to the task

If something's wrong, tell it specifically what's wrong, the same way you practiced in Stage 5's prompting module, rather than starting the whole task over.`
          },
          {
            title: "Resources for Module 6.3",
            content: `- Website: [Claude Code documentation](https://docs.claude.com/en/docs/claude-code/overview) — official docs, kept current with each release
- Video: search "Claude Code tutorial for beginners" on YouTube for a current walkthrough, since command names and features get added over time`
          }
        ]
      },
      {
        title: "Module 6.4 — Workflow Habits",
        lessons: [
          {
            title: "Lesson 1: Planning a feature before prompting for it",
            content: `Before asking an AI tool to build something, take thirty seconds to define: what should this feature do, what shouldn't it break, and how will you know it worked. A clear plan in your head produces a clearer prompt, and a clearer prompt produces a result closer to what you actually wanted on the first try.`
          },
          {
            title: "Lesson 2: Committing often so AI changes are easy to undo",
            content: `Commit your working code before asking an AI tool to make a significant change. If the result goes badly wrong, you can return to the last commit instead of untangling a mess by hand. This is the same Git skill from Stage 3, now used specifically as a safety net for AI-assisted changes.`
          },
          {
            title: "Lesson 3: When to write the code yourself instead of prompting",
            content: `Some situations are faster to just write directly: a one-line fix you already know, a small tweak to something you just wrote yourself, or a piece of logic where explaining it in a prompt would take longer than typing it. AI tools save the most time on repetitive or larger-scope work, not on every single keystroke.`
          }
        ]
      }
    ]
  },
  {
    id: "stage-7",
    number: 7,
    title: "Build Something Real",
    subtitle: "Planning, constructing, authenticating, and deploying a live full-stack app",
    icon: "rocket",
    widgetType: "architecture-blueprint",
    widgetTitle: "Interactive Full-Stack Architecture Map",
    widgetDescription: "Explore the live data flow between Frontend UI, Managed Database (Supabase), Auth, and Vercel hosting.",
    quiz: [
      {
        question: "What is the recommended first step when building a full-stack project?",
        options: [
          "Buy a custom domain immediately",
          "Define the core 1-sentence goal, essential screens, and minimal user actions",
          "Write 5,000 lines of CSS animations",
          "Set up complex microservices"
        ],
        answer: 1,
        explanation: "Scoping down to a clear single goal and MVP screens guarantees completion."
      },
      {
        question: "Why build the frontend with mock/fake data before connecting a real backend database?",
        options: [
          "Because real databases don't work with HTML",
          "It isolates UI visual layout validation before introducing backend database complexity",
          "It is required by browser security policy",
          "Mock data runs faster on Vercel"
        ],
        answer: 1,
        explanation: "Prototyping with mock data allows quick iteration on UI structure before wiring up backend APIs."
      },
      {
        question: "Which platforms offer seamless automatic deployments from GitHub repositories?",
        options: [
          "Vercel and Netlify",
          "Microsoft Word",
          "Photoshop",
          "Localhost 3000"
        ],
        answer: 0,
        explanation: "Vercel and Netlify auto-build and deploy static & full-stack web applications straight from GitHub commits."
      }
    ],
    modules: [
      {
        title: "Project A — A Small Full-Stack App",
        lessons: [
          {
            title: "Lesson 1: Planning the app",
            content: `Before writing anything, write down:
- What the app does, in one sentence ("Users can log in and manage a personal to-do list")
- The core screens it needs (login page, main task list page)
- The core actions a user can take (sign up, log in, add a task, mark a task done, delete a task)

Keep this list short. The goal is a working app, not a feature-complete one. You can always add more once the basics work end to end.`
          },
          {
            title: "Lesson 2: Building the frontend",
            content: `Using the HTML, CSS, and JavaScript from Stage 2, build the visual pieces first, with no real data yet:
- A login form
- A page showing a list of tasks (use fake, hardcoded tasks for now)
- A form to add a new task
- A way to mark a task complete and delete it

Getting the interface working with fake data first means you can see and test the app's structure before the added complexity of a real database.`
          },
          {
            title: "Lesson 3: Adding a database and basic backend",
            content: `Now replace the fake, hardcoded tasks with real ones stored in a database, using the database concept from Stage 4. For a first project, a managed backend service (one that provides a database and basic server functions without you having to set up your own server from scratch) is the most beginner-friendly path. Supabase and Firebase are both common choices for this, since they handle a large part of the backend setup for you.

At this stage, connect your frontend so that adding a task saves it to the database, and loading the page pulls the current list from the database instead of a hardcoded array.`
          },
          {
            title: "Lesson 4: Adding login (authentication)",
            content: `Add real authentication, from the concept covered in Stage 4: users should be able to sign up with an email and password, log in, and only see their own tasks, not everyone else's. Managed backend services like the ones mentioned above typically include authentication as a built-in feature, which saves you from building this security-sensitive piece entirely from scratch on your first project.`
          },
          {
            title: "Lesson 5: Using an AI tool for the parts that would normally take longest",
            content: `This is where Stage 6 comes in directly. Use Cursor or Claude Code for the more repetitive or boilerplate-heavy parts: wiring up the database calls, writing the authentication flow, styling the task list. Write clear, specific prompts, the way you practiced in Stage 5, and review every change before accepting it.`
          },
          {
            title: "Lesson 6: Debugging what the AI gets wrong",
            content: `Something will break. Use the debugging process from Stage 4: notice what's wrong, narrow down where, form a guess, test it. Read the actual error message before asking an AI tool to fix it, and give that tool the exact error text rather than a vague description, the same way you practiced in Stage 5.`
          },
          {
            title: "Lesson 7: Deploying it so it's live on the internet",
            content: `Once the app works locally, deploy it using the concepts from Stage 1's introduction to hosting and deployment. For a frontend project like this, Vercel or Netlify both offer a straightforward path: connect your GitHub repository (from Stage 3), and they build and publish the site automatically each time you push a change.

Once deployed, you have a live, working URL you can share with anyone.`
          },
          {
            title: "Resources for Project A",
            content: `- Website: [Supabase documentation](https://supabase.com/docs) — a common starting point for beginners needing a database and authentication without building a backend from scratch
- Website: [Vercel deployment guide](https://vercel.com/docs) — straightforward deployment docs, connects directly to a GitHub repository
- Video: search "build and deploy a full stack app with Supabase" on YouTube for a current, complete walkthrough matching this exact stack`
          }
        ]
      },
      {
        title: "Closing Module — Where to Go Next",
        lessons: [
          {
            title: "Lesson 1: How to pick your next project",
            content: `Pick something slightly harder than what you just finished, tied to something you actually want to exist. Motivation matters more than difficulty when choosing a second project. A task tracker with a twist you care about (shared lists with friends, a habit tracker instead of a to-do list) will get finished. A generic project picked because it "sounds impressive" often won't.`
          },
          {
            title: "Lesson 2: Reading other people's code",
            content: `Once your own project works, read through an open-source project on GitHub in a similar space. You won't understand everything, and that's fine. Reading real code, even partially, builds pattern recognition that writing alone doesn't, and shows you approaches you wouldn't have thought of.`
          },
          {
            title: "Lesson 3: Staying current without getting overwhelmed",
            content: `New tools and frameworks appear constantly, and no one keeps up with all of them. Pick a small number of reliable sources (one newsletter, one YouTube channel, one community) instead of trying to track everything. The fundamentals from Stages 1 through 4 change slowly. The tools on top of them change fast. Knowing the difference keeps new releases from feeling like you're starting over each time.`
          }
        ]
      }
    ]
  }
];
