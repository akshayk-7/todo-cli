#  Interactive To-Do CLI

A beautifully designed, interactive command-line to-do list application built with Node.js. 

I built this project to master Node.js CLI development, File System operations, and asynchronous programming. It completely replaces boring static commands with a vibrant, interactive terminal interface!

##  Features

- **Interactive Menus**: Navigate through your tasks using arrow keys.
- **Persistent Storage**: Tasks are saved locally to a `tasks.json` file so you never lose them.
- **Task Status Tracking**: Keep track of what's done with ✅ and ❌ indicators.
- **Timestamps**: Automatically records exactly when a task was created and when it was completed.
- **Beautiful UI**: Features gradient text, loading spinners, and perfect ASCII data tables.

## How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/akshayk-7/todo-cli.git
   cd todo-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the CLI**
   You can run it directly using node:
   ```bash
   node index.js
   ```

## Tech Stack

- **Node.js** - The core runtime
- **Inquirer.js** - For the interactive command-line prompts
- **cli-table3** - For drawing the beautiful data tables
- **Figlet & Gradient-String** - For the massive, colorful ASCII art header
- **Chalk & Picocolors** - For coloring the terminal text
- **Nanospinner** - For the sleek loading animations

## What I Learned

Building this wasn't just about making a simple to-do list. I learned how to:
- Structure a proper Node.js CLI project using ES Modules (`"type": "module"`).
- Use `fs/promises` to asynchronously read and write JSON files without blocking the event loop.
- Handle edge cases gracefully (like setting a fallback array if `tasks.json` doesn't exist yet).
- Manipulate arrays dynamically using `.map()`, `.findIndex()`, and `.splice()`.
- Architect a continuous application lifecycle using a `while` loop so the CLI stays alive until the user chooses to exit.