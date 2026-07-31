# Stage 3 — Tools of the Trade

You've written code. Now you need the tools that let you work on it efficiently, track changes to it, and share it with others. These are the same tools professional developers use every day.

---

## Module 3.1 — VS Code

### Lesson 1: Interface tour

VS Code has four areas you'll use constantly:

- **Editor** — the main area where you write and edit code
- **Sidebar** — the file explorer on the left, showing your project's folders and files
- **Terminal panel** — a command line built into the editor (open it with Ctrl+` on Windows/Linux, Cmd+` on Mac)
- **Status bar** — the strip along the bottom showing things like your current Git branch and file type

Open your `profile-page` folder from Stage 2 in VS Code now (File > Open Folder) and locate each of these four areas before moving on.

### Lesson 2: Extensions worth installing on day one

Extensions add features VS Code doesn't have by default. A few that matter early on:

- **Live Server** — lets you view your HTML file in a browser that auto-refreshes every time you save
- **Prettier** — automatically formats your code so it's consistent and readable
- **ESLint** — flags JavaScript mistakes before you run the code

Install these from the Extensions panel (the icon that looks like four squares, in the left sidebar).

### Lesson 3: Keyboard shortcuts that save real time

A handful worth memorizing immediately:

- Save: Ctrl+S / Cmd+S
- Find in file: Ctrl+F / Cmd+F
- Find and replace: Ctrl+H / Cmd+H
- Comment out a line: Ctrl+/ / Cmd+/
- Move a line up or down: Alt+Up/Down / Option+Up/Down
- Open the terminal: Ctrl+` / Cmd+`

These stop being "shortcuts you look up" and become automatic within a week of regular use.

### Lesson 4: Running and debugging code inside the editor

With Live Server installed, right-click your `index.html` file and choose "Open with Live Server." Your page opens in a browser, and any time you save a change in VS Code, the page updates automatically.

For JavaScript, VS Code has a built-in debugger that lets you pause code mid-run and inspect what's happening. You'll use this more once your code gets complex enough that `console.log` alone isn't enough to find a bug, which comes up in Stage 4's debugging module.

### Resources for Module 3.1
- Website: [VS Code Docs – Getting Started](https://code.visualstudio.com/docs) — official documentation covering the interface, extensions, and debugging
- Video: [VS Code Tutorial – Become More Productive (freeCodeCamp)](https://www.youtube.com/watch?v=heXQnM99oAI) — a current walkthrough of the interface and extensions

---

## Module 3.2 — The Command Line

### Lesson 1: What the terminal is and why it's not scary

The terminal is a text-based way to give your computer instructions, instead of clicking through folders and menus. It looks intimidating because it's blank and gives no visual hints, but it only understands a small set of commands, and you'll use the same handful repeatedly.

Every command follows the same basic shape: you type an instruction, press Enter, and the terminal does it or tells you what went wrong.

### Lesson 2: Core commands

These work the same way on Mac and Linux. Windows users should use Git Bash (installed alongside Git in the next module) for identical behavior.

```bash
pwd                  # show the current folder you're in
ls                   # list files and folders here
cd folder-name        # move into a folder
cd ..                # move up one folder
mkdir new-folder      # create a new folder
touch file.txt        # create a new empty file
rm file.txt           # delete a file
```

Practice by navigating to your `profile-page` folder using only these commands, no clicking.

### Lesson 3: Running a project from the terminal

Many tools you'll use later, including AI coding tools, expect you to run commands from inside your project folder. For example, once you start using Node.js-based projects:

```bash
cd my-project
npm install
npm start
```

`npm install` downloads everything the project needs to run. `npm start` runs it. You'll see this pattern constantly from here on, so it's worth typing it out a few times now even without a real project behind it yet.

### Lesson 4: Reading error messages without panicking

Terminal errors look alarming because they're often long, but they usually tell you exactly what went wrong and where.

Example:

```
Error: Cannot find module 'express'
    at Function.Module._resolveFilename
```

Read the first line first. "Cannot find module 'express'" means the code is trying to use something called `express` that hasn't been installed. The fix, in this case, is running `npm install express`.

Habit worth building now: read the first line of any error before scrolling through the rest.

### Resources for Module 3.2
- Website: [freeCodeCamp – The Linux Commands Handbook](https://www.freecodecamp.org/news/the-linux-commands-handbook/) — covers the core commands from this module and more, at a beginner pace
- Video: [Command Line Basics for Beginners (freeCodeCamp)](https://www.youtube.com/watch?v=mABpAI-pCw0) — a visual walkthrough of navigating folders and core commands

---

## Module 3.3 — Git and GitHub

### Lesson 1: What version control solves

Without version control, "saving your work" means overwriting the last version, with no way back if something breaks. Version control keeps a full history of every change, so you can see what changed, when, and undo it if needed.

Git is the tool that tracks this history on your computer. GitHub is a website that stores a copy of that history online, so you can back it up and share it with others.

### Lesson 2: Git basics

First, tell Git who you are (one-time setup):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Then, inside a project folder:

```bash
git init                    # start tracking this folder with Git
git status                  # see what's changed
git add index.html           # stage a specific file for the next commit
git add .                   # stage everything that's changed
git commit -m "Add profile page structure"   # save a snapshot with a message
git log                     # see the history of commits
```

A commit is a saved snapshot of your project at a specific point, with a message describing what changed. Commit often, with clear messages. "Fixed stuff" tells you nothing six months from now. "Fix broken link in navigation" does.

### Lesson 3: GitHub basics

Create a free account at github.com, then create a new repository (an online storage location for a project). Connect your local project to it:

```bash
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

`git push` uploads your commits to GitHub. `git pull` downloads any changes from GitHub that aren't on your computer yet, which matters once you're working across multiple machines or with other people.

### Lesson 4: Branches and pull requests

A branch is a separate line of work that doesn't affect the main version until you merge it in.

```bash
git branch new-feature       # create a branch
git checkout new-feature     # switch to it
```

Or in one step:

```bash
git checkout -b new-feature
```

Real scenario: you want to try adding a dark mode toggle to your profile page, but you're not sure it'll work. Instead of risking your working page, you create a branch, build the feature there, and only merge it back into `main` once it works.

A pull request (on GitHub) is a formal request to merge one branch into another, with a place for comments and review before the merge happens. You'll use this constantly once working with other people, and it's good practice to use it even solo, since it keeps a clear record of what each change was for.

### Lesson 5: Undoing mistakes

```bash
git checkout -- file.html          # discard uncommitted changes to a file
git reset HEAD~1                    # undo the last commit, keep the changes
git revert <commit-hash>            # create a new commit that undoes a previous one
```

`git revert` is the safest option once you've pushed to GitHub, since it doesn't rewrite history that others might already have.

### Project: Push the profile page to GitHub

- Initialize Git in your `profile-page` folder
- Make at least three separate commits, each with a clear message, as you make small changes
- Create a GitHub repository and push your project to it
- Create a branch, make one change on it, and merge it back into `main`

### Resources for Module 3.3
- Website: [Git Documentation](https://git-scm.com/doc) — the official reference for every command in this module
- Website: [GitHub Docs – Hello World](https://docs.github.com/en/get-started/quickstart/hello-world) — official beginner walkthrough of creating a repository, branching, and opening a pull request
- Video: [Git & GitHub Crash Course for Beginners (freeCodeCamp)](https://www.youtube.com/watch?v=mAFoROnOfHs) — covers this whole module in one sitting

---

Stage 3 complete. You can now navigate a computer without a mouse when needed, and track and share your code the way professional teams do. Next: Stage 4, where you learn the concepts (databases, authentication, debugging, and more) that every piece of real software is built on.
