# Stage 7 — Build Something Real

Everything up to this point has been building toward one thing: a project that combines all six previous stages into something live on the internet. This stage is less about new concepts and more about applying what you already have.

Suggested project: a simple task tracker. Users can sign up, log in, and manage a personal list of tasks. It's small enough to finish, but touches every skill from Stages 1 through 6.

---

## Project A — A Small Full-Stack App

### Lesson 1: Planning the app

Before writing anything, write down:
- What the app does, in one sentence ("Users can log in and manage a personal to-do list")
- The core screens it needs (login page, main task list page)
- The core actions a user can take (sign up, log in, add a task, mark a task done, delete a task)

Keep this list short. The goal is a working app, not a feature-complete one. You can always add more once the basics work end to end.

### Lesson 2: Building the frontend

Using the HTML, CSS, and JavaScript from Stage 2, build the visual pieces first, with no real data yet:
- A login form
- A page showing a list of tasks (use fake, hardcoded tasks for now)
- A form to add a new task
- A way to mark a task complete and delete it

Getting the interface working with fake data first means you can see and test the app's structure before the added complexity of a real database.

### Lesson 3: Adding a database and basic backend

Now replace the fake, hardcoded tasks with real ones stored in a database, using the database concept from Stage 4. For a first project, a managed backend service (one that provides a database and basic server functions without you having to set up your own server from scratch) is the most beginner-friendly path. Supabase and Firebase are both common choices for this, since they handle a large part of the backend setup for you.

At this stage, connect your frontend so that adding a task saves it to the database, and loading the page pulls the current list from the database instead of a hardcoded array.

### Lesson 4: Adding login (authentication)

Add real authentication, from the concept covered in Stage 4: users should be able to sign up with an email and password, log in, and only see their own tasks, not everyone else's. Managed backend services like the ones mentioned above typically include authentication as a built-in feature, which saves you from building this security-sensitive piece entirely from scratch on your first project.

### Lesson 5: Using an AI tool for the parts that would normally take longest

This is where Stage 6 comes in directly. Use Cursor or Claude Code for the more repetitive or boilerplate-heavy parts: wiring up the database calls, writing the authentication flow, styling the task list. Write clear, specific prompts, the way you practiced in Stage 5, and review every change before accepting it.

### Lesson 6: Debugging what the AI gets wrong

Something will break. Use the debugging process from Stage 4: notice what's wrong, narrow down where, form a guess, test it. Read the actual error message before asking an AI tool to fix it, and give that tool the exact error text rather than a vague description, the same way you practiced in Stage 5.

### Lesson 7: Deploying it so it's live on the internet

Once the app works locally, deploy it using the concepts from Stage 1's introduction to hosting and deployment. For a frontend project like this, Vercel or Netlify both offer a straightforward path: connect your GitHub repository (from Stage 3), and they build and publish the site automatically each time you push a change.

Once deployed, you have a live, working URL you can share with anyone.

### Resources for Project A
- Website: [Supabase documentation](https://supabase.com/docs) — a common starting point for beginners needing a database and authentication without building a backend from scratch
- Website: [Vercel deployment guide](https://vercel.com/docs) — straightforward deployment docs, connects directly to a GitHub repository
- Video: [Supabase Full Project - The FASTEST Way to Ship a SaaS App?](https://www.youtube.com/watch?v=Q4rXmxQ1AUM) — builds and deploys a full-stack app with Supabase and Next.js, matching this exact stack

---

## Closing Module — Where to Go Next

### Lesson 1: How to pick your next project

Pick something slightly harder than what you just finished, tied to something you actually want to exist. Motivation matters more than difficulty when choosing a second project. A task tracker with a twist you care about (shared lists with friends, a habit tracker instead of a to-do list) will get finished. A generic project picked because it "sounds impressive" often won't.

### Lesson 2: Reading other people's code

Once your own project works, read through an open-source project on GitHub in a similar space. You won't understand everything, and that's fine. Reading real code, even partially, builds pattern recognition that writing alone doesn't, and shows you approaches you wouldn't have thought of.

### Lesson 3: Staying current without getting overwhelmed

New tools and frameworks appear constantly, and no one keeps up with all of them. Pick a small number of reliable sources (one newsletter, one YouTube channel, one community) instead of trying to track everything. The fundamentals from Stages 1 through 4 change slowly. The tools on top of them change fast. Knowing the difference keeps new releases from feeling like you're starting over each time.

### Resources for the Closing Module
- Website: [GitHub Explore](https://github.com/explore) — a starting point for finding open-source projects to read, organized by topic and language
- Website: [freeCodeCamp News](https://www.freecodecamp.org/news/) — a steady source of beginner-to-intermediate articles for staying current without chasing every new tool
- Video: [How to Read Other People's Code | Beginner Developer Skill](https://www.youtube.com/watch?v=5N98tJyrqGc) — approaches to Lesson 2

---

Course complete. You started with no coding background and now have a working, deployed, full-stack application, built using the same fundamentals and the same AI tools professional developers use daily.
