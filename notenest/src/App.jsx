import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import useLocalStorage from './utils/useLocalStorage'
import { generateId, filterNotes, sortNotes, debounce, CATEGORIES } from './utils/helpers'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import NoteCard from './components/NoteCard'
import NoteSetupModal from './components/NoteSetupModal'
import NoteEditor from './components/NoteEditor'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  // ── Persisted state (localStorage) ──────────────────────────────
  const [notes, setNotes] = useLocalStorage('notenest_notes', [])
  const [darkMode, setDarkMode] = useLocalStorage('notenest_dark', false)

  // ── UI state ─────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [isSetupOpen, setIsSetupOpen] = useState(false)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  // ── Weather state ─────────────────────────────────────────────────
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState(false)

  // ── Apply dark mode to document ──────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // ── Fetch weather from Open-Meteo (free, no API key) ─────────────
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true)
        // Kathmandu coordinates using axios
        const res = await axios.get(
          'https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current_weather=true&temperature_unit=celsius'
        )
        const data = res.data
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode,
        })
        setWeatherError(false)
      } catch (err) {
        setWeatherError(true)
      } finally {
        setWeatherLoading(false)
      }
    }
    fetchWeather()
  }, [])

  // ── Debounced search ─────────────────────────────────────────────
  const debouncedSetQuery = useCallback(
    debounce((val) => setDebouncedQuery(val), 300),
    []
  )

  function handleSearchChange(val) {
    setSearchQuery(val)
    debouncedSetQuery(val)
  }

  // ── CRUD operations ──────────────────────────────────────────────
  function handleCreateNote(formData) {
    const newNote = {
      id: generateId(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      color: formData.color,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes((prev) => [newNote, ...prev])
    setIsModalOpen(false)
  }

  function handleUpdateNote(formData) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    )
    setEditingNote(null)
    setIsEditorOpen(false)
  }

  function handleDeleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  function handleTogglePin(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    )
  }

  function handleEditNote(note) {
    setEditingNote(note)
    setIsEditorOpen(true)
  }

  function handleOpenCreate() {
    setEditingNote(null)
    setIsSetupOpen(true)
  }

  function handleSetupConfirm(setupData) {
    const newNote = {
      id: generateId(),
      title: setupData.title,
      category: setupData.category,
      content: '', // Start empty
      color: CATEGORIES.find(c => c.id === setupData.category)?.color || '#6366f1',
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setEditingNote(newNote)
    setIsSetupOpen(false)
    setIsEditorOpen(true)
  }

  function handleSaveNote(noteData) {
    if (notes.find(n => n.id === noteData.id)) {
      handleUpdateNote(noteData)
    } else {
      setNotes(prev => [noteData, ...prev])
      setEditingNote(null)
      setIsEditorOpen(false)
    }
  }

  function handleCloseModals() {
    setEditingNote(null)
    setIsSetupOpen(false)
    setIsEditorOpen(false)
  }

  // ── Derive displayed notes ────────────────────────────────────────
  const filteredNotes = filterNotes(notes, activeCategory, debouncedQuery)
  const displayedNotes = sortNotes(filteredNotes, sortBy)

  // ── Category counts ───────────────────────────────────────────────
  function getCategoryCount(categoryId) {
    if (categoryId === 'all') return notes.length
    return notes.filter((n) => n.category === categoryId).length
  }

  return (
    <div className={`app-root ${darkMode ? 'dark' : ''}`}>
      <Navbar
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        weather={weather}
        weatherLoading={weatherLoading}
        weatherError={weatherError}
        onNewNote={handleOpenCreate}
        totalNotes={notes.length}
      />

      <div className="app-body">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          getCategoryCount={getCategoryCount}
        />

        <main className="main-content">
          <div className="main-header">
            <div className="breadcrumb">
              <span className="breadcrumb-link">Dashboard</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">All Notes</span>
            </div>
            <div className="main-title-row">
              <h1 className="main-title">My Notes</h1>
            </div>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {displayedNotes.length === 0 ? (
            <EmptyState
              isFiltered={debouncedQuery !== '' || activeCategory !== 'all'}
              onCreateNote={handleOpenCreate}
            />
          ) : (
            <div className="notes-grid">
              {displayedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onTogglePin={handleTogglePin}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {isSetupOpen && (
        <NoteSetupModal
          onConfirm={handleSetupConfirm}
          onClose={handleCloseModals}
        />
      )}

      {isEditorOpen && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onClose={handleCloseModals}
        />
      )}
    </div>
  )
}

// ── Empty State Component ─────────────────────────────────────────
function EmptyState({ isFiltered, onCreateNote }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="4" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
          <line x1="11" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="19" x2="15" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {isFiltered ? (
        <>
          <h2 className="empty-title">No matching notes</h2>
          <p className="empty-sub">Try a different search or category</p>
        </>
      ) : (
        <>
          <h2 className="empty-title">No notes yet</h2>
          <p className="empty-sub">
            Capture your thoughts, ideas, and tasks.<br />
            Click the button below to start your first collection.
          </p>
          <button className="empty-cta" onClick={onCreateNote}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Create New Note
          </button>

          <div className="empty-features">
            <div className="empty-feature">
              <div className="empty-feature-icon" style={{ background: '#eff6ff' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5" stroke="#3b82f6" strokeWidth="1.5"/>
                  <line x1="12" y1="12" x2="15" y2="15" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="empty-feature-title">Search Anything</p>
                <p className="empty-feature-sub">Find notes quickly with powerful filtering</p>
              </div>
            </div>
            <div className="empty-feature">
              <div className="empty-feature-icon" style={{ background: '#fff7ed' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="3" width="6" height="6" rx="1.5" stroke="#f97316" strokeWidth="1.5"/>
                  <rect x="10" y="3" width="6" height="6" rx="1.5" stroke="#f97316" strokeWidth="1.5"/>
                  <rect x="2" y="11" width="6" height="6" rx="1.5" stroke="#f97316" strokeWidth="1.5"/>
                  <line x1="10" y1="14" x2="16" y2="14" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="11" x2="13" y2="17" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="empty-feature-title">Organize Flow</p>
                <p className="empty-feature-sub">Use categories to keep your life in sync</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
