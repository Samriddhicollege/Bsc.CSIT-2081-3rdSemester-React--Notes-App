# NoteNest — Modern Notes App

A premium, feature-rich note-taking application designed for focus and organization. Built with React and Vite, featuring a sleek dark-mode UI, categorized note management, and real-time utility integrations.

## Features
- **Smart Categorization** — Organize notes into Work, Personal, Ideas, and more with color-coded tags.
- **Advanced Editor** — A distraction-free writing environment with support for rich text highlights.
- **Persistence** — All notes are automatically saved to `localStorage`, so your data stays on your device.
- **Dynamic Search** — Find notes instantly with real-time, debounced filtering.
- **Weather Integration** — Stay updated with live weather data in your workspace.
- **Dark Mode Support** — Seamlessly toggle between Light and Dark themes for comfortable viewing.
- **Pinning & Sorting** — Keep your most important thoughts at the top.

## Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18+, Vite |
| **Styling** | Vanilla CSS (Premium Custom Design) |
| **Networking** | Axios (Weather API) |
| **Persistence** | Browser LocalStorage |

## Project Structure
```text
src/
├── components/       # Reusable UI components (Navbar, NoteCard, Editor, etc.)
├── assets/           # Static assets like images and icons
├── utils/
│   ├── helpers.js    # Global utility functions (ID gen, sorting, filtering)
│   └── useLocalStorage.js # Custom hook for persistent state
├── App.jsx           # Main application logic and state management
├── App.css           # Core styling and design system tokens
├── index.css         # Reset and global base styles
└── main.jsx          # Application entry point
```

## Getting Started

### Prerequisites
- Node.js 18+

### Installation
1. Clone the repository
2. Navigate to the project folder:
   ```bash
   cd notenest
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```

### Build
Generate a production-ready bundle:
```bash
npm run build
```

## License
This project was developed as a B.Sc. CSIT 3rd Semester React coursework project at Samriddhi College.
