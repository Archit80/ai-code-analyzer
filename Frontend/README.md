# AI Code Review App

A modern, full-stack web application for **AI-powered code review**. Paste your code, click "Analyse My Code", and get instant, structured feedback from an advanced AI model.

---

## Features

- **AI Code Review:** Get detailed, actionable feedback on your code using OpenRouter's DeepSeek model.
- **Live Markdown Preview:** Reviews are rendered with beautiful, readable Markdown (with syntax highlighting).

- **Fun Facts:** Enjoy a rotating stream of random developer facts while you wait for your review.
- **Customizable:** Built with React, Tailwind CSS, and Express—easy to extend and style.

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS 4, react-markdown, rehype-highlight, prismjs
- **Backend:** Node.js, Express 5, OpenRouter API (DeepSeek model)
- **Other:** Axios, Shadcn UI components, random fact API

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/ai-code-review.git
cd ai-code-review
```

### 2. Install Dependencies

**Frontend:**
```sh
cd Frontend
npm install
```

**Backend:**
```sh
cd ../Backend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `Backend` directory:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 4. Run the App

**Start the backend:**
```sh
cd Backend
node server.js
```

**Start the frontend:**
```sh
cd ../Frontend
npm run dev
```

- Frontend runs at [http://localhost:5173](http://localhost:5173)
- Backend runs at [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Paste your code into the editor on the left.
2. Click **"Analyse My Code"**.
3. Wait for the AI to review your code. Enjoy a random dev fact while you wait!
4. View the structured review with issues, suggestions, and cleaned-up code.

---

## Customization

- **Styling:** Uses Tailwind CSS and Shadcn UI. Edit `src/index.css` and `src/App.css` for custom styles.
- **AI Model:** The backend uses OpenRouter's DeepSeek model. You can swap models or prompts in [`Backend/src/services/ai.service.js`](Backend/src/services/ai.service.js).
- **Fun Facts:** Facts are fetched from [uselessfacts.jsph.pl](https://uselessfacts.jsph.pl/).

---

## File Structure

```
Frontend/
  src/
    App.jsx         # Main React app
    App.css         # Custom styles (grid, prose, editor)
    components/ui/  # Shadcn UI components
    index.css       # Tailwind and global styles
  vite.config.js    # Vite + Tailwind config

Backend/
  src/
    app.js          # Express app setup
    routes/         # API routes
    controllers/    # Route controllers
    services/       # AI service integration
  .env              # API keys
  server.js         # Server entry point
```

---

## Credits

- [OpenRouter](https://openrouter.ai/) for AI code review API
- [Shadcn UI](https://ui.shadcn.com/) for UI components
- [uselessfacts.jsph.pl](https://uselessfacts.jsph.pl/) for random facts

---


> **Made with ❤️ for developers who want better code reviews!**