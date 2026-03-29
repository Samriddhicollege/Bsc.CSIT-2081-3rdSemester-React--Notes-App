import { useState, useEffect } from 'react'
import { CATEGORIES } from '../utils/helpers'
import './NoteSetupModal.css'

function NoteSetupModal({ initialData, onConfirm, onClose }) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [category, setCategory] = useState(initialData?.category || 'personal')
  const [error, setError] = useState('')

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleNext = () => {
    if (!title.trim()) {
      setError('Title is required to proceed')
      return
    }
    onConfirm({ title, category })
  }

  const filteredCategories = CATEGORIES.filter(c => c.id !== 'all')

  return (
    <div className="setup-overlay" onClick={onClose}>
      <div className="setup-card" onClick={(e) => e.stopPropagation()}>
        <div className="setup-header">
          <h2 className="setup-title">New Note Setup</h2>
          <p className="setup-subtitle">Choose a title and category to start writing.</p>
        </div>

        <div className="setup-body">
          <div className="setup-field">
            <label>Note Title</label>
            <input 
              type="text" 
              placeholder="e.g., Weekly Goals" 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setError('')
              }}
              autoFocus
            />
            {error && <span className="setup-error">{error}</span>}
          </div>

          <div className="setup-field">
            <label>Category</label>
            <div className="category-grid">
              {filteredCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-btn ${category === cat.id ? 'active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                  type="button"
                >
                  <span className="cat-dot" style={{ backgroundColor: cat.color }}></span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="setup-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-next" onClick={handleNext}>
            Proceed to Editor
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteSetupModal
