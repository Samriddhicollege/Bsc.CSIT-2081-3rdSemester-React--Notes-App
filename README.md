# NoteNest — Modern Notes App
> *Smart Note Management System with React Frontend*

---

## Student Information
**Name:** Crystal Karki  
**Roll Number:** 08  
**Course / Program:** BSc.CSIT  
**Semester / Year:** 3rd Semester / 2026  

---

## Instructor Information
**Instructor Name:** Mr. Dipak Shrestha  
**Course Title:** React Development  
**College Name:** Samriddhi College  

---

## Project Overview
> This project is a feature-rich note-taking application designed for focus and organization developed using React and Vite. 
> It allows users to manage their notes efficiently by creating, organizing into specific categories, pinning important items, and searching notes in real-time. 
> The system also includes an integrated live weather dashboard to keep users updated while they work.
> The main goal is to provide a sleek, performant application and improve productivity and user experience through a modern interface.

---

## Objectives
- Build a responsive React application.
- Implement real-world features like categorized notes, rich text highlights, pinning, and live search.
- Understand frontend persistence by integrating browser LocalStorage.
- Apply clean UI/UX design principles with a seamless light and dark mode implementation.

---

## Technologies Used

**Frontend**
- React.js
- HTML, CSS, JavaScript (Vanilla Custom CSS)
- Vite

**Persistence**
- Browser LocalStorage

**Other Tools**
- Git & GitHub
- Axios (Weather API: Open-Mateo API)
- React Icons

---

## Key Features
- **Smart Categorization** — Organize notes into Work, Personal, Ideas, etc.
- **Advanced Editor** — Distraction-free writing with rich text highlighting.
- **LocalStorage Persistence** — Data stays on your device automatically.
- **Dynamic Search** — Real-time, debounced search filtering.
- **Weather Integration** — Live weather data in your workspace.
- **Dark Mode** — Toggle light and dark themes.
- **Pinning & Sorting** — Important notes stay at the top.

---

## Screens / Modules
- Home Page / Global Dashboard
- Note Editor Module
- Advanced Search & Filter System
- Live Weather Integration Panel

---

## Installation & Setup
```bash
# Clone repository
git clone https://github.com/your-username/notenest.git

# Go to project folder
cd notenest

# Install dependencies
npm install

# Run frontend (development server)
npm run dev

# Generate production build
npm run build
```

---

## Project Structure
```text
/notenest
│── src/              # Source code of the application
│   ├── components/   # Reusable UI components
│   ├── assets/       # Static assets like images and icons
│   └── utils/        # Global utility functions and custom hooks
│
│── index.html        # Entry HTML file
│── package.json      # Node.js project dependencies
│── README.md         # Project documentation
│── vite.config.js    # Vite configuration
│── vercel.json       # Deployment configuration
```

---

## GitHub & Live Demo
- **GitHub Repository:** [https://github.com/Samriddhicollege/Bsc.CSIT-2081-3rdSemester-React--Notes-App.git]
- **Live URL:** [https://bsc-csit-2081-3rd-semester-react-no.vercel.app/]

---

## Testing
- Tested UI responsiveness on different screen sizes (mobile, tablet, desktop).
- Verified seamless data persistence using browser `localStorage`.
- Checked edge cases such as empty notes, empty search queries, and component rendering limits.

---

## Challenges Faced
> Example:
- Difficulty in managing state synchronization between the NoteEditor, Sidebar, and App component.
- Implementing debounced real-time search functionality.
- Handling layout responsiveness and dark mode integration seamlessly.

---

## Future Enhancements
- Implement cloud synchronization (e.g., using Node.js or Supabase).
- Improve the editor text formatting capabilities (bold, italics, links).
- Add user authentication for multiple profiles.

---

## Acknowledgement
> I would like to thank my instructor **Mr. Dipak Shrestha** for his guidance and support throughout this React development project.

---

## Declaration
> I hereby declare that this project is my original work and has been completed as part of my academic submission for the BSc.CSIT program at Samriddhi College.
