# Language Detector & Reminder

<p align="center">
  <img src="https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png" alt="HERE AND NOW AI Logo" width="400" />
</p>

<p align="center">
  <em>An intelligent app that automatically detects the language of your notes and lets you set smart reminders in a single tap.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Gemini_API-v1-blue?logo=google&logoColor=white" alt="Gemini API">
</p>

---

This is a modern, single-page web application built with React and TypeScript, powered by the Google Gemini API. It provides a seamless experience for taking notes, automatically identifying the language of the text, and saving those notes as reminders.

## ✨ Features

*   **✍️ Real-time Note Editor:** A spacious, distraction-free textarea for drafting content.
*   **🌐 Automatic Language Detection:** As you type, the app intelligently detects the language using the Google Gemini API, debounced for performance.
*   **🔔 Smart Reminders:**
    *   Save notes as reminders with their detected language.
    *   Mark reminders as complete with a satisfying UI toggle.
    *   Delete reminders you no longer need.
*   **💾 Local Persistence:** All reminders are saved in your browser's `localStorage`, so they persist across sessions.
*   **🌓 Light & Dark Modes:** The UI respects your system's theme preference and adapts beautifully.
*   **📱 Fully Responsive:** A great experience on any device, from mobile phones to desktops.
*   **🚀 Zero Build Step:** Runs directly in the browser using modern ES Modules and Import Maps.

## 🛠️ Tech Stack

*   **Frontend:** [React 19](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **AI:** [Google Gemini API (`@google/genai`)](https://ai.google.dev/sdks/google_ai_javascript)
*   **Module System:** ES Modules with [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)

## 🚀 Getting Started

To run this project locally, follow these simple steps.

### Prerequisites

*   A modern web browser that supports Import Maps (Chrome, Edge, Firefox, Safari).
*   A local web server. You can use `npx serve` or Python's built-in server.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hereandnowai/language-detector.git
    cd language-detector
    ```

2.  **API Key Configuration:**
    This application requires a Google Gemini API key to function. The key must be available as an environment variable named `API_KEY`. The application code (`services/geminiService.ts`) is designed to read `process.env.API_KEY`.

    **Important:** The execution environment where you serve the files must provide this variable. This app **does not** have a UI for entering the key.

    For local development with simple servers, this can be tricky as they don't typically read `.env` files. This project is designed for deployment environments (like Vercel, Netlify, or custom servers) where you can set environment variables. For a very basic local setup, you might need to temporarily replace `process.env.API_KEY` in `services/geminiService.ts` with your actual key for testing purposes, but **never commit your key to Git**.

3.  **Run the application:**
    Start a local server from the project's root directory.

    *   **Using `npx` (Node.js required):**
        ```bash
        npx serve .
        ```

    *   **Using Python:**
        ```bash
        # For Python 3
        python3 -m http.server

        # For Python 2
        python -m SimpleHTTPServer
        ```

4.  **Open in browser:**
    Navigate to the local address provided by your server (e.g., `http://localhost:3000` or `http://localhost:8000`).

## 📁 Project Structure

The project is organized with a clear separation of concerns, making it easy to navigate and maintain.

```
.
├── README.md                 # This file
├── index.html                # Main HTML entry point
├── index.tsx                 # React application root
├── metadata.json             # App metadata
├── App.tsx                   # Main application component
├── types.ts                  # TypeScript type definitions
├── services/
│   └── geminiService.ts      # Handles all Gemini API communication
└── components/
    ├── NoteEditor.tsx        # UI for text input and actions
    ├── ReminderList.tsx      # UI for displaying reminders
    └── icons/                # SVG icon components
        └── ...
```

## 🧠 How It Works

The core logic revolves around the `NoteEditor` component and the `geminiService`.

1.  **Debouncing:** To prevent sending an API request on every keystroke, a `debounce` mechanism is used. The app waits for the user to pause typing (for 700ms) before triggering the language detection.
2.  **API Call:** The `geminiService` constructs a specific prompt asking the `gemini-2.5-flash` model to identify the language and return *only* its name.
3.  **State Management:** The main `App.tsx` component manages all state, including the list of reminders, the current note content, and the detected language. `useEffect` is used to sync the reminders with `localStorage`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/hereandnowai/language-detector/issues).

## 📄 License

This project is open-source, licensed under the MIT License.

## ✨ Acknowledgements

This project was created with passion by [HERE AND NOW AI](https://hereandnowai.com/).
