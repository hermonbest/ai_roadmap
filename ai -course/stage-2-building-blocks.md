# Stage 2 — The Three Building Blocks

This is where you start writing real code. Each lesson introduces one concept and immediately uses it, so nothing stays abstract for long.

Before you start: open VS Code, create a new folder called `profile-page`, and create a file inside it called `index.html`. You'll build on this same file through all of Module 2.1.

---

## Module 2.1 — HTML (structure)

### Lesson 1: Tags, elements, and attributes

HTML is built from tags. A tag wraps content and tells the browser what that content is.

```html
<p>This is a paragraph.</p>
```

`<p>` is the opening tag, `</p>` is the closing tag, and together with the text between them, this whole thing is called an element. Most tags come in pairs like this.

Tags can also carry attributes, which give extra information:

```html
<a href="https://example.com">Click here</a>
```

`href` is an attribute on the `<a>` (link) tag, telling the browser where the link should go.

### Lesson 2: Building a page: headings, paragraphs, links, images

Every HTML page needs a basic skeleton:

```html
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
```

- `<h1>` through `<h6>` are headings, `<h1>` being the largest and most important.
- `<p>` is a paragraph.
- `<a>` is a link. The `href` attribute holds the destination.
- `<img>` is an image. It has no closing tag. `src` points to the image file, `alt` describes it for screen readers and for when the image fails to load.

Put this into your `index.html` file and open it in a browser to see it rendered.

### Lesson 3: Lists, tables, and forms

Lists:

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>
```

`<ul>` is an unordered (bulleted) list. Use `<ol>` instead for a numbered list. Each item goes inside `<li>`.

Tables:

```html
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
```

`<tr>` is a row, `<th>` is a header cell, `<td>` is a regular cell.

Forms:

```html
<form>
  <input type="text" placeholder="Your name">
  <button type="submit">Submit</button>
</form>
```

Forms collect input from a user. You'll come back to these once JavaScript can make them do something.

### Lesson 4: Semantic HTML (why tag choice matters)

You could technically build an entire page using only `<div>` tags (a generic container with no built-in meaning) and it would look fine. It would also be harder for browsers, screen readers, and search engines to understand what's actually on the page.

Semantic tags describe their purpose:

```html
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<footer>...</footer>
```

A `<nav>` tag tells the browser and any assistive technology "this is navigation," instead of just "this is a box." Using the right tag for the job costs nothing extra and makes your page more usable for everyone, including people relying on screen readers.

### Project: A one-page personal profile (structure only)

Using what you've learned so far, build a page with:
- A heading with your name
- A paragraph describing yourself
- A list of three interests
- A link to something you like online
- An image (any placeholder image works)

Don't worry about how it looks yet. That's next.

### Resources for Module 2.1
- Website: [MDN – Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) — the standard reference for HTML basics, with practice exercises
- Video: [HTML Tutorial – Website Crash Course for Beginners (freeCodeCamp)](https://www.youtube.com/watch?v=916GWv2Qs08) — a good starting point for the HTML in this module

---

## Module 2.2 — CSS (style)

### Lesson 1: Selectors and the box model

CSS rules follow this pattern:

```css
selector {
  property: value;
}
```

Example:

```css
h1 {
  color: blue;
}
```

This selects every `<h1>` on the page and makes its text blue.

Every element on a page is a box, whether it looks like one or not. This is the box model:
- **Content** — the actual text or image
- **Padding** — space inside the box, between the content and its border
- **Border** — a line around the box
- **Margin** — space outside the box, between it and other elements

```css
p {
  padding: 10px;
  border: 1px solid black;
  margin: 20px;
}
```

### Lesson 2: Colors, fonts, spacing

```css
body {
  font-family: Arial, sans-serif;
  color: #333333;
  background-color: #f5f5f5;
}
```

Colors can be written as names (`blue`), hex codes (`#3498db`), or RGB values (`rgb(52, 152, 219)`). Hex codes are the most common in real projects.

Link a CSS file to your HTML by adding this inside `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

Create a `style.css` file in the same folder and start styling your profile page.

### Lesson 3: Layout basics: flexbox

Flexbox is the most common way to arrange elements side by side or in a column, without fighting the browser's default layout behavior.

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

- `display: flex` turns an element into a flex container.
- `justify-content` controls spacing along the main direction (left to right by default).
- `align-items` controls alignment along the other direction.

Try wrapping your interests list in a `<div class="container">` and applying `display: flex` to see items line up horizontally instead of stacking.

### Lesson 4: Responsive design (making it work on phone and desktop)

A page that looks fine on a laptop can break on a phone. Media queries let you apply different styles based on screen size:

```css
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }
}
```

This rule only applies when the screen is 600 pixels wide or narrower, which covers most phones.

### Project: Style the profile page

Apply what you've learned to the profile page from Module 2.1:
- Give it a font, colors, and spacing that don't look like the browser's default
- Arrange the interests list using flexbox
- Add a media query so the layout adjusts on a narrow screen

### Resources for Module 2.2
- Website: [MDN – CSS first steps](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) — covers selectors, the box model, and layout basics in more depth
- Website: [Flexbox Froggy](https://flexboxfroggy.com/) — a short interactive game for practicing flexbox
- Video: [CSS Flexbox Crash Course (freeCodeCamp)](https://www.youtube.com/watch?v=tXIhdp5R7sc) — a visual walkthrough of Lesson 3

---

## Module 2.3 — JavaScript (behavior)

### Lesson 1: Variables and data types

A variable stores a value so you can use it later.

```javascript
let name = "Sam";
let age = 28;
let isStudent = false;
```

- `let` creates a variable that can change later.
- `const` creates a variable that can't be reassigned.
- Common data types: strings (text, in quotes), numbers, booleans (true or false).

### Lesson 2: Functions

A function is a named block of instructions you can run whenever you need it.

```javascript
function greet(name) {
  return "Hello, " + name;
}

greet("Sam"); // returns "Hello, Sam"
```

`name` here is a parameter, a placeholder for whatever value you pass in when you call the function.

### Lesson 3: Conditionals and loops

Conditionals let code make decisions:

```javascript
let age = 20;

if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("Not yet.");
}
```

Loops let code repeat:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

This runs the code inside the loop 5 times, with `i` counting from 0 to 4.

### Lesson 4: Working with the DOM (making a page react to clicks)

The DOM (Document Object Model) is how JavaScript sees and changes your HTML while the page is running.

```html
<button id="myButton">Click me</button>

<script>
  document.getElementById("myButton").addEventListener("click", function() {
    alert("Button clicked!");
  });
</script>
```

`getElementById` finds the element. `addEventListener` tells it to run a function whenever a specific event, like a click, happens.

### Lesson 5: Arrays and objects

An array holds a list of values:

```javascript
let interests = ["reading", "hiking", "coding"];
console.log(interests[0]); // "reading"
```

An object holds related values under named keys:

```javascript
let person = {
  name: "Sam",
  age: 28
};
console.log(person.name); // "Sam"
```

You'll use both constantly, especially once you start working with data from a database or an API.

### Project: Add an interactive element to the profile page

Add one of the following to your profile page:
- A button that shows or hides your list of interests when clicked
- A form field where typing a name updates a greeting on the page
- A counter that increases by one each time a button is clicked

Any of these uses everything from this module: variables, a function, an event listener, and the DOM.

### Resources for Module 2.3
- Website: [MDN – JavaScript first steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) — covers variables, functions, and the DOM with runnable examples
- Website: [javascript.info](https://javascript.info/) — a thorough, free, modern JavaScript tutorial for going deeper than this module
- Video: [Learn JavaScript – Full Course for Beginners (freeCodeCamp)](https://www.youtube.com/watch?v=PkZNo7MFNFg) — covers variables, functions, arrays, and the DOM from this module

---

Stage 2 complete. You now have a working page with structure, style, and interactivity, and the fundamentals to build more. Next: Stage 3, where you learn the tools professional developers use to manage and ship code like this.
