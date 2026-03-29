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
.
├── src/              # Source code of the application
│   ├── components/   # Reusable UI components
│   ├── assets/       # Static assets like images and icons
│   └── utils/        # Global utility functions and custom hooks
├── index.html        # Entry HTML file
├── package.json      # Node.js project dependencies and scripts
├── vite.config.js    # Vite configuration
├── vercel.json       # Deployment configuration for Vercel
├── .gitignore        # Files ignored by Git
└── README.md         # Project documentation
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
