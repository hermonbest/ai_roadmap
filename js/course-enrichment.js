// Course Enrichment Layer
// Merges into COURSE_DATA at load time (see app.js):
//   - blocksByLesson:     interactive exercise blocks appended to specific existing lessons
//   - extraLessonsByModule: brand-new detailed lessons appended to existing modules
//   - modulesByStage:     brand-new modules appended to a stage
//
// Block ids must stay stable: they key XP persistence in localStorage.

window.COURSE_ENRICHMENT = {
  blocksByLesson: {
    // ==================== STAGE 1 ====================
    "Lesson 1: What a program is": [
      {
        type: "predict", id: "s1-program-trace", xp: 10,
        title: "Trace the recipe",
        intro: "Run this program in your head, one line at a time.",
        code: "x = 2\ny = 3\nx = x + y\nprint(x)",
        question: "What does this program print?",
        options: ["2", "5", "3", "Nothing, it has an error"],
        answer: 1,
        explanation: "Lines run in order. x becomes 2, y becomes 3, then x is overwritten with x + y = 5. Overwriting a variable is normal; the old value is gone."
      },
      {
        type: "checkpoint", id: "s1-program-order", xp: 10,
        title: "Out of order",
        question: "A recipe tells you to preheat the oven after the cake is already inside. As a program, this bug is best described as...",
        options: [
          "A missing variable",
          "Instructions executed in the wrong sequence",
          "A hardware problem",
          "An internet connection issue"
        ],
        answer: 1,
        explanation: "Programs follow instructions in exact order. Sequence bugs are among the most common beginner bugs, and they rarely crash anything: the program happily does the wrong thing."
      }
    ],
    "Lesson 2: What a website is made of": [
      {
        type: "match", id: "s1-three-layers", xp: 15,
        title: "Match each technology to its job",
        pairs: [
          ["HTML", "Structure and content: headings, paragraphs, buttons"],
          ["CSS", "Appearance: colors, fonts, spacing, layout"],
          ["JavaScript", "Behavior: what happens on click, typing, scroll"]
        ]
      },
      {
        type: "predict", id: "s1-house-analogy", xp: 10,
        title: "Extend the house analogy",
        intro: "In the house analogy: frame = HTML, paint and furniture = CSS, wiring = JavaScript.",
        code: "You click a button labeled \"Turn on the lights\"\nand the page background changes color.\nWhich of the three technologies made that happen?",
        question: "Which layer responded to your click?",
        options: ["HTML", "CSS", "JavaScript", "All three equally"],
        answer: 2,
        explanation: "Reacting to clicks is behavior, and behavior is JavaScript. HTML put the button on the page and CSS made it look tappable, but neither can listen for events."
      }
    ],
    "Lesson 3: What 'running code' means in practice": [
      {
        type: "checkpoint", id: "s1-running-code", xp: 10,
        title: "Quick check",
        question: "You double-click an index.html file and it opens in your browser. What just happened?",
        options: [
          "The file was uploaded to a server first",
          "Your browser read the local file and built the page from it",
          "The file was converted into a .exe",
          "Nothing ran, browsers only show images"
        ],
        answer: 1,
        explanation: "The browser is the program that runs web code. Opening a local HTML file works with no server at all; a local server matters later, once JavaScript starts fetching data."
      }
    ],
    "Lesson 1: Client and server, explained with a real example": [
      {
        type: "sort", id: "s1-request-lifecycle", xp: 15,
        title: "Put the request in order",
        prompt: "You type example.com into the address bar and press Enter. Order what happens next.",
        items: [
          "Browser sends a request to a server",
          "Server finds the site's files",
          "Server sends HTML, CSS, and JavaScript back",
          "Browser assembles and displays the page"
        ],
        correct: [0, 1, 2, 3]
      }
    ],
    "Lesson 2: What a browser does with HTML, CSS, and JavaScript": [
      {
        type: "sort", id: "s1-browser-pipeline", xp: 15,
        title: "Browser pipeline",
        prompt: "Inside the browser, these things happen every time you load a page. Put them in order.",
        items: [
          "Read HTML and build the structure",
          "Apply CSS styling to that structure",
          "Run the JavaScript",
          "Paint the finished page to screen"
        ],
        correct: [0, 1, 2, 3]
      },
      {
        type: "checkpoint", id: "s1-inspect-element", xp: 10,
        title: "Try it yourself",
        question: "Right-click any webpage and choose Inspect. What are you looking at?",
        options: [
          "The server's private source code",
          "The raw HTML, CSS, and JavaScript the page is built from",
          "A screenshot of the page",
          "The browser's settings menu"
        ],
        answer: 1,
        explanation: "Every page you have ever visited is inspectable. Reading real pages this way is one of the fastest ways to demystify how the web is built."
      }
    ],
    "Lesson 3: Domains, hosting, and deployment in plain terms": [
      {
        type: "match", id: "s1-domain-hosting", xp: 15,
        title: "Which term fits?",
        pairs: [
          ["Domain", "The address people type to find your site"],
          ["Hosting", "The server that stores your files and serves them"],
          ["Deployment", "The act of putting your code onto that server"]
        ]
      }
    ],

    // ==================== STAGE 2: HTML ====================
    "Lesson 1: Tags, elements, and attributes": [
      {
        type: "challenge", id: "s2-link-tag", xp: 20,
        title: "Write a link",
        intro: "Fill in the blanks to create a link that goes to example.com and shows the text Click here.",
        code: `<a ___="https://example.com">___</a>`,
        blanks: [
          { a: "href" },
          { a: "Click here" }
        ],
        hints: [
          "The attribute that sets a link's destination is short for 'hypertext reference'.",
          "The text between the opening and closing tag is exactly what the user sees."
        ],
        success: "That is a complete anchor element. Every link you have ever clicked looked like this."
      },
      {
        type: "checkpoint", id: "s2-tag-anatomy", xp: 10,
        title: "Anatomy check",
        question: "In <img src=\"cat.jpg\">, what is src?",
        options: ["A tag", "An element", "An attribute", "A file type"],
        answer: 2,
        explanation: "src is an attribute: extra information attached to the tag, telling the image element where its file lives."
      }
    ],
    "Lesson 2: Building a page: headings, paragraphs, links, images": [
      {
        type: "challenge", id: "s2-skeleton", xp: 20,
        title: "Complete the page skeleton",
        intro: "Every HTML page needs this skeleton. Fill in the two missing opening tags.",
        code: `<!DOCTYPE html>
<___>
  <head><title>My Page</title></head>
  <___>
    <h1>Hello</h1>
  </body>
</html>`,
        blanks: [
          { a: "html" },
          { a: "body" }
        ],
        hints: [
          "The outermost element wraps the entire document.",
          "Everything the user sees lives inside the second missing element."
        ],
        success: "head holds information about the page; body holds the page itself."
      }
    ],
    "Lesson 3: Lists, tables, and forms": [
      {
        type: "challenge", id: "s2-list-tags", xp: 20,
        title: "Build a bulleted list",
        intro: "Make a bulleted list with two items: coffee and tea.",
        code: `<___>
  <___>coffee</li>
  <li>tea</li>
</ul>`,
        blanks: [
          { a: "ul", ci: true },
          { a: "li", ci: true }
        ],
        hints: [
          "Unordered (bulleted) list uses a two-letter tag.",
          "Each item inside any list is an li element."
        ],
        success: "Switch ul to ol and the same markup becomes a numbered list."
      }
    ],
    "Lesson 4: Semantic HTML (why tag choice matters)": [
      {
        type: "match", id: "s2-semantic-tags", xp: 15,
        title: "Pick the right tag for the job",
        pairs: [
          ["Site navigation links", "nav"],
          ["The main written content", "article"],
          ["Copyright and contact info", "footer"],
          ["A page's introductory area", "header"]
        ]
      }
    ],

    // ==================== STAGE 2: CSS ====================
    "Lesson 1: Selectors and the box model": [
      {
        type: "sort", id: "s2-box-model", xp: 15,
        title: "Box model layers",
        prompt: "Order these from the innermost layer of a box to the outermost.",
        items: ["Content", "Padding", "Border", "Margin"],
        correct: [0, 1, 2, 3]
      },
      {
        type: "challenge", id: "s2-css-rule", xp: 20,
        title: "Write a CSS rule",
        intro: "Make every paragraph blue with 10 pixels of padding.",
        code: `___ {
  color: blue;
  ___: 10px;
}`,
        blanks: [
          { a: "p", ci: true },
          { a: "padding", ci: true }
        ],
        hints: [
          "An element selector is just the tag name without angle brackets.",
          "The box-model property for space INSIDE the border starts with 'pad'."
        ],
        success: "Selector on the left, declarations inside the braces. That shape never changes."
      }
    ],
    "Lesson 2: Colors, fonts, spacing": [
      {
        type: "predict", id: "s2-hex-color", xp: 10,
        title: "Hex or name?",
        code: "h1 {\n  color: #ff0000;\n}\np {\n  color: red;\n}",
        question: "Both rules use different ways to write a color. Which statement is true?",
        options: [
          "#ff0000 and red are the same color",
          "#ff0000 is blue and red is red",
          "Hex codes only work for backgrounds",
          "Named colors do not work in CSS"
        ],
        answer: 0,
        explanation: "Hex codes and names describe the same colors. Hex is more precise (16 million values), names are easier to read. Real projects mostly use hex."
      }
    ],
    "Lesson 3: Layout basics: flexbox": [
      {
        type: "predict", id: "s2-flex-direction", xp: 10,
        title: "Predict the layout",
        code: `.container {\n  display: flex;\n  flex-direction: column;\n}`,
        question: "Three boxes sit inside .container. Where do they end up?",
        options: [
          "Side by side in a row",
          "Stacked vertically in a column",
          "Diagonally",
          "Overlapping each other"
        ],
        answer: 1,
        explanation: "Default flex direction is row. Setting it to column flips the main axis, stacking children top to bottom."
      }
    ],
    "Lesson 4: Responsive design (making it work on phone and desktop)": [
      {
        type: "checkpoint", id: "s2-media-query", xp: 10,
        title: "When does this fire?",
        code: "@media (max-width: 600px) {\n  body { font-size: 14px; }\n}",
        question: "This media query applies its styles when...",
        options: [
          "The screen is 600px wide or narrower (most phones)",
          "The screen is exactly 600px wide",
          "The screen is wider than 600px (laptops)",
          "It applies always"
        ],
        answer: 0,
        explanation: "max-width means 'up to this width'. It is the standard way to ship phone-specific tweaks without touching desktop styles."
      }
    ],

    // ==================== STAGE 2: JavaScript ====================
    "Lesson 1: Variables and data types": [
      {
        type: "challenge", id: "s2-variables", xp: 20,
        title: "Declare it properly",
        intro: "Create a variable named age holding 28, using the keyword for a value that CAN change later.",
        code: `___ age = 28;`,
        blanks: [{ a: "let", ci: true }],
        hints: ["Two keywords create variables. const locks the value; the other one allows reassignment."],
        success: "Use const by default and reach for let only when the value truly changes. That habit prevents a class of bugs outright."
      },
      {
        type: "predict", id: "s2-string-number", xp: 10,
        title: "Type surprise",
        code: 'const name = "Sam";\nconst age = 28;\nconsole.log(name + age);',
        question: "What prints?",
        options: ['"Sam28"', '"Sam 28"', "An error", "NaN"],
        answer: 0,
        explanation: "Adding a string and a number glues them together as text: Sam28. This coercion surprises everyone once. Now it will not surprise you."
      }
    ],
    "Lesson 2: Functions": [
      {
        type: "predict", id: "s2-function-return", xp: 10,
        title: "Follow the function",
        code: 'function greet(name) {\n  return "Hello, " + name;\n}\n\nconst msg = greet("Ada");\nconsole.log(msg);',
        question: "What prints?",
        options: ['Hello, name', 'Hello, Ada', "undefined", "greet is not defined"],
        answer: 1,
        explanation: '"Ada" travels into the function as the name parameter, and return hands "Hello, Ada" back to whoever called it.'
      }
    ],
    "Lesson 3: Conditionals and loops": [
      {
        type: "predict", id: "s2-loop-count", xp: 10,
        title: "Count the loop",
        code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}',
        question: "How many lines print, and what are they?",
        options: ["3 lines: 0, 1, 2", "3 lines: 1, 2, 3", "4 lines: 0, 1, 2, 3", "2 lines: 0, 1"],
        answer: 0,
        explanation: "The loop runs while i < 3, starting at 0: that is i = 0, 1, 2. Counting from zero is the single most common source of off-by-one bugs."
      },
      {
        type: "challenge", id: "s2-if-syntax", xp: 20,
        title: "Finish the conditional",
        intro: "Print a message only when the temperature is over 30.",
        code: `const temp = 35;

___ (temp > 30) {
  console.log("It is hot");
}`,
        blanks: [{ a: "if", ci: true }],
        hints: ["One two-letter keyword introduces a decision."],
        success: "if (condition) { do thing }. You will write this shape thousands of times."
      }
    ],
    "Lesson 4: Working with the DOM (making a page react to clicks)": [
      {
        type: "challenge", id: "s2-dom-wiring", xp: 20,
        title: "Wire up the button",
        intro: "Find the button with id \"go\" and react to clicks on it.",
        code: `document.___("go").addEventListener("___", function() {
  alert("Clicked!");
});`,
        blanks: [
          { a: "getElementById", ci: true },
          { a: "click", ci: true }
        ],
        hints: [
          "The method that finds an element by its id spells out exactly what it does.",
          "The event fired by pressing a button is the most obvious word possible."
        ],
        success: "Find element, listen for event, run function. Every interactive page you have used runs on this pattern somewhere."
      }
    ],
    "Lesson 5: Arrays and objects": [
      {
        type: "predict", id: "s2-array-index", xp: 10,
        title: "Index math",
        code: 'const skills = ["html", "css", "js"];\nconsole.log(skills[1]);',
        question: "What prints?",
        options: ['"html"', '"css"', '"js"', "undefined"],
        answer: 1,
        explanation: "Array positions start at 0, so [1] is the second item. skills[0] would be html."
      },
      {
        type: "predict", id: "s2-object-access", xp: 10,
        title: "Dot access",
        code: 'const user = {\n  name: "Ada",\n  level: 3\n};\nuser.level = user.level + 1;\nconsole.log(user.level);',
        question: "What prints?",
        options: ["3", "4", "undefined", "NaN"],
        answer: 1,
        explanation: "user.level reads 3, adds 1, and stores 4 back into the same property. Objects hold related data under named keys, and you update them like any variable."
      }
    ],

    // ==================== STAGE 3 ====================
    "Lesson 3: Keyboard shortcuts that save real time": [
      {
        type: "match", id: "s3-shortcuts", xp: 15,
        title: "Shortcut reflexes",
        pairs: [
          ["Ctrl+` / Cmd+`", "Open the built-in terminal"],
          ["Ctrl+/ / Cmd+/", "Comment out the selected line"],
          ["Alt+Up/Down", "Move a line up or down"],
          ["Ctrl+S / Cmd+S", "Save the file"]
        ]
      }
    ],
    "Lesson 2: Core commands": [
      {
        type: "match", id: "s3-terminal-cmds", xp: 15,
        title: "Terminal vocabulary",
        pairs: [
          ["pwd", "Show which folder you are in"],
          ["ls", "List files in the current folder"],
          ["cd ..", "Move up one folder"],
          ["mkdir", "Create a new folder"],
          ["touch", "Create a new empty file"]
        ]
      }
    ],
    "Lesson 2: Git basics": [
      {
        type: "sort", id: "s3-git-flow", xp: 15,
        title: "The commit workflow",
        prompt: "Order the everyday Git loop, from starting tracking to saving a snapshot.",
        items: [
          "git init",
          "git status",
          "git add .",
          "git commit -m \"message\""
        ],
        correct: [0, 1, 2, 3]
      }
    ],
    "Lesson 4: Branches and pull requests": [
      {
        type: "checkpoint", id: "s3-branch-purpose", xp: 10,
        title: "Why branch?",
        question: "You want to experiment with a dark mode toggle but keep your working page safe. The Git-native move is to...",
        options: [
          "Delete style.css and start over if it fails",
          "Copy the whole project folder manually",
          "Create a branch, build there, merge only when it works",
          "Never experiment"
        ],
        answer: 2,
        explanation: "A branch is a parallel line of work. If the experiment fails, you delete the branch and main never knew about it."
      }
    ],

    // ==================== STAGE 4 ====================
    "Lesson 1: Frontend vs backend": [
      {
        type: "match", id: "s4-fe-be-tasks", xp: 15,
        title: "Frontend or backend?",
        intro: "For each task, decide where it belongs in a shopping app.",
        pairs: [
          ["Show the product photo gallery", "Frontend"],
          ["Check whether an item is in stock", "Backend"],
          ["Animate the Add to Cart button", "Frontend"],
          ["Store the completed order", "Backend"]
        ]
      }
    ],
    "Lesson 2: What an API is": [
      {
        type: "predict", id: "s4-api-response", xp: 10,
        title: "Read the response",
        intro: "Your weather app asked an API for today's forecast and got this back:",
        code: '{\n  "city": "Lisbon",\n  "temp_c": 21,\n  "condition": "Sunny"\n}',
        question: "To show the temperature, your code should read which field?",
        options: ["temp_c", "city", "condition", "weather"],
        answer: 0,
        explanation: "API responses are structured data, usually JSON. Your code picks fields by name: response.temp_c. No scraping, no guessing."
      }
    ],
    "Lesson 1: Authentication (proving who you are)": [
      {
        type: "match", id: "s4-authn-authz", xp: 15,
        title: "Authentication or authorization?",
        pairs: [
          ["Entering username and password", "Authentication"],
          ["Being allowed to edit a shared doc", "Authorization"],
          ["Scanning your fingerprint to unlock", "Authentication"],
          ["Admin-only settings page access", "Authorization"]
        ]
      }
    ],
    "Lesson 4: Common security mistakes beginners make": [
      {
        type: "checkpoint", id: "s4-security-keys", xp: 10,
        title: "Spot the leak",
        question: "Your app works locally, but minutes after pushing to GitHub you get abuse warnings from a cloud provider. Likely cause?",
        options: [
          "Git committed too slowly",
          "A secret API key was hardcoded in the pushed code",
          "Too many CSS files",
          "The README was too long"
        ],
        answer: 1,
        explanation: "Anything pushed to a public repo must be assumed public forever. Keys belong in environment variables; leaked keys get found by bots within minutes."
      }
    ],
    "Lesson 1: What debugging actually is": [
      {
        type: "sort", id: "s4-debug-loop", xp: 15,
        title: "The debugging loop",
        prompt: "Order the repeatable debugging process.",
        items: [
          "Notice something is wrong",
          "Narrow down where it happens",
          "Form a guess about the cause",
          "Test the guess"
        ],
        correct: [0, 1, 2, 3]
      }
    ],
    "Lesson 2: Reading a stack trace": [
      {
        type: "checkpoint", id: "s4-stack-top", xp: 10,
        title: "Where to look first",
        question: "A 40-line stack trace fills your console. Where do you start reading?",
        options: [
          "The bottom line",
          "The top line, which names the actual error",
          "Randomly, looking for keywords",
          "Do not read it, restart the computer"
        ],
        answer: 1,
        explanation: "The top line usually states the error type and message. Everything below is the path the code took to get there."
      }
    ],

    // ==================== STAGE 5 ====================
    "Lesson 1: What a token is": [
      {
        type: "predict", id: "s5-token-split", xp: 10,
        title: "How would it split?",
        intro: "Common words tend to be one token. Longer or rarer words split into pieces.",
        code: '"coding" -> [ coding ]\n"unhelpfulness" -> [ un ][ help ][ ful ][ ness ]',
        question: "Why does splitting matter to you as a user?",
        options: [
          "It does not, tokens are purely internal",
          "Context windows and pricing are measured in tokens",
          "Split words break the internet",
          "Tokens determine your screen resolution"
        ],
        answer: 1,
        explanation: "Every limit you hit (context size, cost per message) is counted in tokens. Thinking in tokens explains both bills and forgotten instructions."
      }
    ],
    "Lesson 2: What context is, and why it runs out": [
      {
        type: "predict", id: "s5-context-drop", xp: 10,
        title: "What gets forgotten?",
        intro: "A long session: you told the model your stack 40 messages ago, then kept chatting past the context window.",
        code: "[ msg 1: uses React + Supabase ]\n[ ... 38 more messages ... ]\n[ msg 40: \"add a login form\" ]",
        question: "What is the model most likely to do on message 40?",
        options: [
          "Remember the full stack choice perfectly",
          "Generate a plausible login form that may target the wrong stack",
          "Refuse to answer",
          "Crash the editor"
        ],
        answer: 1,
        explanation: "Dropped context does not look like failure. Output stays fluent while quietly losing your constraints, which is why restating key facts pays off."
      }
    ],
    "Lesson 2: Vague prompt vs specific prompt": [
      {
        type: "promptLab", id: "s5-prompt-upgrade", xp: 20,
        title: "Upgrade this prompt",
        vague: "Make my website better.",
        task: "Rewrite it so the model knows exactly what to change, where, and what to leave alone. Cover at least 3 of these ideas:",
        keywords: ["navigation", "mobile", "media query", "desktop", "css", "specific screen width"],
        minFound: 3,
        model: "On screens under 600px wide, my navigation menu overlaps the logo instead of collapsing. Update the CSS in style.css with a media query so the nav stacks vertically on mobile, and do not change any desktop styles."
      },
      {
        type: "checkpoint", id: "s5-prompt-battle-login", xp: 15,
        title: "Spot the better prompt: login form",
        question: "You are starting a small signup page in plain HTML, CSS, and JavaScript and want a login form. Which prompt will get you better code?",
        options: [
          "Create a login form.",
          "Create a login form in plain HTML/CSS/JS with client-side validation: required email format, min 8-char password, inline error messages, and a submit handler that logs the values."
        ],
        answer: 1,
        explanation: "The second prompt wins. It names the stack, the validation rules, the error handling, and the desired behavior up front, so the AI produces something close to production-ready instead of a placeholder you have to rewrite. A vague prompt like \"create a login form\" just forces you to keep re-prompting."
      }
    ],
    "Lesson 4: Reading error messages without panicking": [
      {
        type: "checkpoint", id: "s1-prompt-battle-error", xp: 15,
        title: "Spot the better prompt: crashing page",
        question: "Your page crashes on load with a TypeError at line 23. Which prompt gets you the fastest fix?",
        options: [
          "Fix my bug.",
          "My app crashes on load with \"TypeError: Cannot read properties of undefined (reading 'length')\" at line 23. Here is the function. Explain the cause and fix it without changing the behavior."
        ],
        answer: 1,
        explanation: "The second prompt gives the exact error, the exact location, and the constraint, so the AI can pinpoint the cause immediately instead of guessing. \"Fix my bug\" leaves the model guessing about what code, what error, and what the app should do - and guesses cost you time."
      }
    ],
    "Lesson 6: Debugging what the AI gets wrong": [
      {
        type: "checkpoint", id: "s6-prompt-battle-state", xp: 15,
        title: "Spot the better prompt: the icon never updates",
        question: "The AI keeps forgetting part of your request: the dark-mode toggle never updates its icon state. Which prompt will fix it?",
        options: [
          "Add the dark mode toggle I asked for.",
          "In the existing settings panel (settings.js), the dark-mode toggle sets document.body.classList.toggle(\"dark\"). The icon state is not updating. Show the corrected function and explain why the icon resets."
        ],
        answer: 1,
        explanation: "The second prompt brings context plus the file, the symptom, and the desired outcome, so the AI can pinpoint the state bug instead of rewriting the whole feature. \"Add the toggle I asked for\" gives it no reference to where, what was asked, or what was already tried."
      }
    ],
    "Lesson 3: Giving the model the right context": [
      {
        type: "sort", id: "s5-context-checklist", xp: 15,
        title: "Build the perfect bug report",
        prompt: "You are about to ask an AI tool to fix a bug. Order the ingredients of a strong request.",
        items: [
          "Say what the code currently does",
          "Paste the exact error message",
          "Say what you want it to do instead",
          "State constraints: what must not change"
        ],
        correct: [0, 1, 2, 3]
      }
    ],
    "Lesson 1: When to trust AI output and when to double-check": [
      {
        type: "match", id: "s5-trust-levels", xp: 15,
        title: "How much scrutiny?",
        intro: "Match each AI-written change to a sensible review depth.",
        pairs: [
          ["Changing a button color", "Skim it"],
          ["Refactoring a data-fetching hook", "Read the diff carefully"],
          ["Editing authentication logic", "Line-by-line review plus testing"],
          ["Generating placeholder text", "Glance at it"]
        ]
      }
    ],

    // ==================== STAGE 6 ====================
    "Lesson 1: Chat-based AI vs in-editor AI": [
      {
        type: "match", id: "s6-tool-capabilities", xp: 15,
        title: "Who can do what?",
        pairs: [
          ["Reads your actual project files", "In-editor tool"],
          ["You paste code in and copy answers out", "Chat-based tool"],
          ["Can run terminal commands itself", "Agentic in-editor tool"],
          ["Good for quick conceptual questions", "Chat-based tool"]
        ]
      }
    ],
    "Lesson 3: Reviewing AI-written code before accepting it": [
      {
        type: "checkpoint", id: "s6-diff-review", xp: 10,
        title: "The non-negotiable habit",
        question: "Cursor proposes a change touching 6 files. What do you do before clicking Accept?",
        options: [
          "Accept fast, speed is the point",
          "Read the diff: deleted code, new dependencies, logic that misses your intent",
          "Ask a friend to accept it",
          "Accept and review later, someday"
        ],
        answer: 1,
        explanation: "The diff is the contract. Thirty seconds of reading catches deleted guards, surprise dependencies, and confidently wrong logic."
      }
    ],
    "Lesson 2: Giving it a task end to end": [
      {
        type: "promptLab", id: "s6-claude-code-task", xp: 20,
        title: "Brief the agent",
        vague: "Add a contact form.",
        task: "Rewrite this as an end-to-end task for a terminal agent working in your repo. Cover at least 3 of these ideas:",
        keywords: ["validate", "email format", "error message", "submit", "fields", "success state"],
        minFound: 3,
        model: "Add a contact form to the site with name, email, and message fields. Validate that the email matches a real email format before allowing submission, show an inline error message when validation fails, and show a success confirmation after submit. Do not change the existing header or footer styles."
      }
    ],
    "Lesson 1: Planning a feature before prompting for it": [
      {
        type: "sort", id: "s6-safe-workflow", xp: 15,
        title: "The safe AI workflow",
        prompt: "Order the habit loop that keeps AI-assisted work recoverable.",
        items: [
          "Plan what the feature should do",
          "Commit your current working code",
          "Prompt the AI tool",
          "Review the diff and test the result"
        ],
        correct: [0, 1, 2, 3]
      }
    ],

    // ==================== STAGE 7 ====================
    "Lesson 1: Planning the app": [
      {
        type: "sort", id: "s7-build-order", xp: 15,
        title: "Ship order",
        prompt: "Order the build sequence for the task tracker.",
        items: [
          "Plan screens and actions in one sentence each",
          "Build the UI with fake hardcoded data",
          "Connect a database and save real tasks",
          "Add login so users see only their own tasks",
          "Deploy to a live URL"
        ],
        correct: [0, 1, 2, 3, 4]
      }
    ],
    "Lesson 2: Building the frontend": [
      {
        type: "checkpoint", id: "s7-mock-first", xp: 10,
        title: "Why fake data first?",
        question: "Why hardcode three fake tasks before touching the database?",
        options: [
          "Databases are illegal before launch",
          "You validate layout and interaction cheaply, isolating UI bugs from backend bugs",
          "Fake data renders faster",
          "It is a Vercel requirement"
        ],
        answer: 1,
        explanation: "If the list looks broken while the data is hardcoded, you know the bug is in your markup, not in the network. One variable at a time is the whole trick."
      }
    ]
  },

  // ==================== NEW DETAILED LESSONS ====================
  extraLessonsByModule: {
    "Module 2.3 — JavaScript (behavior)": [
      {
        title: "Lesson 6: Three mini-projects that cement everything",
        content: `Reading about variables is not the same as owning them. These three builds take under an hour each, use only this module, and each one is a pattern you will reuse in real apps forever.

**Project 1: The click counter**

A button and a number on screen. Each press raises the number by one.

- One variable: \`let count = 0\`
- One listener: \`button.addEventListener("click", ...)\`
- One update: \`count = count + 1\`, then write it into the DOM with \`textContent\`

This is the atom of interactivity: state plus event plus render. Shopping carts, likes, and scoreboards are all this same loop wearing nicer clothes.

**Project 2: The live greeting**

An input field. As the user types, a heading updates to say hello to them.

- \`input.addEventListener("input", ...)\` fires on every keystroke
- Read the value with \`input.value\`
- Write it into the heading: \`heading.textContent = "Hello, " + name\`

This teaches controlled input, the core of every form on the internet. Once it works, add a guard: when the input is empty, show "Hello, stranger" instead. That guard is your first piece of validation logic.

**Project 3: The interest shuffler**

Your profile page lists three interests. Add a button that hides and shows the list.

- Track visibility in a boolean: \`let shown = true\`
- On click, flip it: \`shown = !shown\`
- Apply it: \`list.style.display = shown ? "block" : "none"\`

The ternary (\`condition ? a : b\`) is new here: it is a one-line if/else that returns a value. Flipping booleans to toggle UI drives every dropdown, modal, and accordion you have ever used.

**How to know you did it right:** close the tutorial mindset and change one requirement yourself. Make the counter step by 5. Make the greeting uppercase. Make the shuffler animate. Extending a working thing is the moment the knowledge becomes yours.`,
        interactive: [
          {
            type: "steps", id: "s2-mini-projects", xp: 15,
            title: "Pick your first build",
            intro: "Each project is one sitting. Open VS Code, make a folder, start with project 1.",
            steps: [
              { t: "Counter: state, event, render", d: "One button, one number on screen. let count = 0; on click, increment and update textContent. If the number refuses to change, log count inside the listener before anything else." },
              { t: "Greeting: controlled input", d: "Listen for the input event, read .value, write it into a heading. Then add the empty-input guard showing Hello, stranger." },
              { t: "Shuffler: boolean toggle", d: "Flip shown with !shown and set display via a ternary. Notice the pattern: UI state lives in a variable, the DOM follows it." },
              { t: "Break it on purpose", d: "Misspell getElementById once and read the error calmly. Breaking things while they are small teaches you error shapes for when they are big." }
            ]
          }
        ]
      }
    ],
    "Module 3.3 — Git and GitHub": [
      {
        title: "Lesson 6: What a merge conflict actually is",
        content: `Eventually Git will refuse a merge and present you with a file containing lines like this:

\`\`\`text
<<<<<<< HEAD
Welcome to my profile page
=======
Welcome to my personal homepage
>>>>>>> feature-new-title
\`\`\`

Nothing is broken. A conflict just means both branches changed the same lines differently, and Git refuses to silently pick a winner. It hands the decision to you.

**Reading the markers**

- \`<<<<<<< HEAD\` starts your version (the branch you merged INTO)
- \`=======\` divides the two versions
- \`>>>>>>> feature-new-title\` ends the incoming version

**Resolving it**

Open the file, decide what the text should finally say, and delete everything that should not survive: the marker lines themselves included. The result must be valid code on its own. Then stage and commit as usual:

\`\`\`bash
git add index.html
git commit -m "Resolve title conflict"
\`\`\`

**Avoiding most conflicts before they happen**

- Pull before you start work: \`git pull origin main\`
- Keep branches short-lived; merge within days, not weeks
- Commit small and often; giant branches collide harder

AI coding tools raise the stakes here: an agent editing several files while you edit others is precisely the situation conflicts love. The habit from Stage 6 (commit before letting an agent touch the repo) is what keeps those collisions clean and rare.`,
        interactive: [
          {
            type: "challenge", id: "s3-conflict-resolve", xp: 20,
            title: "Clean up the conflict",
            intro: "Keep YOUR version (the headline wording from HEAD) and delete the incoming version plus every conflict marker.",
            code: `___
<h1>Welcome to my profile page</h1>
=======
<h1>Welcome to my personal homepage</h1>
___`,
            blanks: [
              { a: "<<<<<<< HEAD", ci: false },
              { a: ">>>>>>> feature-new-title", ci: false }
            ],
            hints: [
              "The first marker opens with three left angle brackets and names your branch's current state.",
              "The closing marker starts with three right angle brackets and names the incoming branch."
            ],
            success: "Resolved: one heading, zero markers. In a real repo you would git add and commit this file to finish the merge."
          }
        ]
      }
    ],
    "Module 4.2 — Access and Security Basics": [
      {
        title: "Lesson 5: How passwords should actually be stored",
        content: `You will never see a user's password in a well-run system, and neither should anyone else, including the company itself. Here is the machinery that makes that possible.

**Hashing in one paragraph**

A hash function scrambles any input into a fixed-length fingerprint that is effectively irreversible. Hash "hunter2" and you might get \`f52fbd...\`; there is no mathematical path back from the fingerprint to the password. At login, the site hashes what you typed and compares fingerprints instead of passwords.

**Why plain hashing is still not enough**

Identical passwords produce identical hashes, so attackers precompute millions of common ones (a rainbow table) and simply look matches up. The fix: add a **salt**, a random string unique to each user, mixed in before hashing. Same password, different stored hash on every account.

**Slow is a feature**

Modern password hashes (bcrypt, argon2) are deliberately slow, taking fractions of a second on purpose. For one login nobody notices; for an attacker testing billions of guesses, deliberate slowness is devastating.

**What this means for you in practice**

- Never store passwords yourself on a first project: use the built-in auth of Supabase or Firebase, which implements all of the above correctly
- If you ever inherit code storing plaintext or MD5-hashed passwords, treat it as a serious incident, not a quirk
- "We can email you your password" is a confession that a site never hashed them at all

Managed auth is not cheating. Hand-rolling crypto is how real breaches happen.`,
        interactive: [
          {
            type: "match", id: "s4-password-storage", xp: 15,
            title: "Storage strategies ranked",
            intro: "Each row describes an approach. Match it to its verdict.",
            pairs: [
              ["Password saved as readable text", "Never acceptable"],
              ["MD5 hash, no salt", "Broken by design"],
              ["bcrypt with unique salt per user", "Correct approach"],
              ["Delegated to Supabase/Firebase auth", "Best default for beginners"]
            ]
          }
        ]
      }
    ],
    "Module 6.4 — Workflow Habits": [
      {
        title: "Lesson 4: Leave a README your AI tool can use",
        content: `Most AI coding tools (Claude Code, Cursor, Codex-class agents) automatically read a special instruction file at the root of your project: commonly named CLAUDE.md, AGENTS.md, or .cursorrules. Treat it as persistent memory for every future session, because that is what it functionally is.

**What belongs in it**

- One paragraph: what this project IS ("A task tracker. Users sign up and manage personal to-do lists.")
- The stack, stated plainly: "Vanilla HTML/CSS/JS frontend. Supabase for database and auth. Deployed on Vercel."
- Conventions worth defending: "Plain CSS custom properties, no frameworks. Commit messages in present tense."
- The commands that run it: install, dev server, deploy
- Hard boundaries: "Never edit supabase/migrations directly. Ask before adding dependencies."

**What does not belong in it**

Aspirations, marketing copy, or half-finished thoughts. The file is operational, not inspirational. If a line would not change how the AI acts, cut it.

**Why this beats retyping context**

Without such a file, every session starts cold: you re-explain the stack, the conventions slip, the agent reaches for React in a no-framework project. With it, the boring-but-critical facts survive indefinitely, and your prompts shrink to just the task at hand.

Ten minutes writing this file saves an hour of corrections per week, and unlike your own memory, it never falls out of the context window.`,
        interactive: [
          {
            type: "steps", id: "s6-readme-steps", xp: 15,
            title: "Draft yours in four moves",
            steps: [
              { t: "Name the project honestly", d: "One sentence a stranger could act on: what it is and who it serves. Skip the pitch deck voice." },
              { t: "List the stack and the commands", d: "Languages, services, and the literal terminal commands: install, dev, deploy. Future-you at 11pm will thank present-you." },
              { t: "Set the boundaries", d: "Name what must not change without asking: migrations, dependency additions, auth flow. Agents respect explicit fences far better than implied ones." },
              { t: "Save it where the agent looks", d: "Project root, named for your tool of choice (CLAUDE.md or AGENTS.md). Next session, ask the agent what stack the project uses: its answer proves the file loaded." }
            ]
          }
        ]
      }
    ],
    "Closing Module — Where to Go Next": [
      {
        title: "Lesson 4: Write the README that gets your project taken seriously",
        content: `A deployed URL shows people WHAT you built. A good README shows them you can COMMUNICATE about what you built, and for hiring managers skimming ten repos in an evening, the README is often the deciding signal.

**The five-part structure**

1. **Title and one-liner.** "TaskTide: a minimal task tracker with accounts, deployed live at [URL]." The link goes at the very top; make people click before they have to scroll.
2. **Screenshot at the top.** One PNG of the running app beats three paragraphs of description. Store it in the repo and reference it with standard markdown.
3. **What it does.** Three bullets maximum: sign up, manage tasks, mark done. Resist listing every micro-feature.
4. **Built with.** Plain list: vanilla JavaScript, Supabase, Vercel. Recruiters and engineers both scan this line for signal.
5. **Run it locally.** The exact clone-install-run commands. This section quietly proves you understand your own project's lifecycle.

**What separates a strong README from a student one**

Student projects explain the assignment ("This project was created for a course"). Professional projects explain the product. Cut every mention of coursework: the work should stand as if you shipped it because you wanted it to exist, which ideally is true.

**Then say it out loud**

Post the link once, somewhere public, with two honest sentences about what was hard. Not a launch announcement, just a record. Portfolio anxiety keeps most beginners silent, and silence is the only strategy guaranteed to fail.`,
        interactive: [
          {
            type: "sort", id: "s7-readme-order", xp: 15,
            title: "Structure the README",
            prompt: "A stranger lands on your repo. Order the sections for how they should read.",
            items: [
              "Title with one-liner and live demo link",
              "Screenshot of the running app",
              "What it does, in three bullets",
              "Built with: the plain tech list",
              "Run it locally: clone, install, start"
            ],
            correct: [0, 1, 2, 3, 4]
          }
        ]
      }
    ]
  },

  // ==================== NEW CAPSTONE MODULE (STAGE 7) ====================
  modulesByStage: {
    "stage-7": [
      {
        title: "Capstone Module — The Ship-It Checklist",
        lessons: [
          {
            title: "Lesson 1: The pre-launch checklist",
            content: `Before you share the URL, walk this list. Each item is a real failure mode seen in first deployed apps.

**Function**

- Sign up with a NEW email address (not your dev account) and it works
- Log out, log back in: your data is still there
- Reload mid-task: nothing important vanishes
- Try to break it as a hostile user: empty task, 500-character task, emoji-only task. The app survives all three

**Appearance**

- Open it on an actual phone, not just a narrow browser window
- Check one screen at 200% zoom: nothing overlaps catastrophically
- Dark mode readers: if you did not build one, confirm the default is readable

**Hygiene**

- Console is clean: no red errors on load, no 404s for assets
- No API keys in the client-side code, ever
- The deployed version matches your latest commit (redeploy if unsure)

**Story**

- README has the live link, a screenshot, and run instructions
- You can explain any file in the repo in two sentences, because an interviewer may ask about exactly one random file

Failing an item is fine; not knowing you failed it is not. This checklist is how you find out before someone else does.`,
            interactive: [
              {
                type: "steps", id: "s7-prelaunch-steps", xp: 15,
                title: "Walk the checklist on your project",
                intro: "Run it against the real deployed app, not your localhost optimism.",
                steps: [
                  { t: "Hostile-user pass", d: "Empty inputs, absurd lengths, wrong characters. A surviving app is a credible app." },
                  { t: "Real-device pass", d: "Phone in hand, not devtools emulation. Touch targets and viewport quirks only show up on hardware." },
                  { t: "Console pass", d: "Zero red errors on load. Every 404 asset is a loose thread a reviewer will notice." },
                  { t: "Secrets pass", d: "Search the repo for your API key strings. Zero hits outside environment config, or you rotate keys tonight." }
                ]
              }
            ]
          },
          {
            title: "Lesson 2: Debugging a live app (when it works locally but not in production)",
            content: `The cruelest genre of bug: everything works on localhost, the deploy fails, and the error message lives in someone else's server. Work down this ladder, in order of likelihood.

**1. Check the deployment actually succeeded.** The platform's dashboard shows build logs. Half of "production bugs" are failed builds still serving the previous deploy.

**2. Open the browser console on the LIVE url.** Localhost forgives; production does not. Classic finds:

- Mixed content: your HTTPS site fetching http:// resources, blocked outright
- Wrong API URL: hardcoded http://localhost:3000/api that worked at home and points nowhere in the wild
- CORS: your frontend calling a backend that never allowed your domain

**3. Environment variables.** Anything configured via .env locally must be re-entered in the hosting dashboard. Missing env vars usually surface as undefined crashes on exactly the feature that needed them.

**4. Cache suspicion.** Sometimes the fix IS deployed and you are staring at a cached old version. Hard refresh (Ctrl+Shift+R) before doubting your work.

**5. Reproduce, then bisect.** If it still misbehaves, reproduce the failing request in isolation and feed the exact error text to your AI tool, Stage 5 style. Production debugging rewards people who read messages, not people who guess fastest.

Every one of these five has ended careers-long debugging sessions in minutes. The skill is not heroic cleverness; it is checking the boring suspects first.`,
            interactive: [
              {
                type: "sort", id: "s7-prod-debug", xp: 15,
                title: "Production triage order",
                prompt: "The deploy is broken but localhost is fine. Order the investigation.",
                items: [
                  "Check the platform dashboard: did the build even succeed?",
                  "Open the console on the live URL and read the errors",
                  "Verify environment variables exist in the hosting dashboard",
                  "Hard-refresh to rule out cache",
                  "Feed the exact error to your AI tool with context"
                ],
                correct: [0, 1, 2, 3, 4]
              },
              {
                type: "checkpoint", id: "s7-mixed-content", xp: 10,
                title: "Name that failure",
                question: "Live site loads over https:// but its fetch to http://api.example.com is blocked. What is this called?",
                options: ["Mixed content blocking", "A DNS outage", "Rate limiting", "A syntax error"],
                answer: 0,
                explanation: "Browsers refuse insecure requests from secure pages. Fix: serve the API over HTTPS too. This bites nearly every first deployment once."
              }
            ]
          }
        ]
      }
    ]
  }
};
