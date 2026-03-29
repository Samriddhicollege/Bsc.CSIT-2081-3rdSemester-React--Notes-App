import { useState, useEffect } from 'react'
import { CATEGORIES, ACCENT_COLORS } from '../utils/helpers'
import './NoteModal.css'

const MAX_CHARS = 500

function NoteModal({ note, onSave, onClose }) {
  const isEditing = Boolean(note)

  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [category, setCategory] = useState(note?.category || 'personal')
  const [color, setColor] = useState(note?.color || '#6366f1')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // ── Validation ────────────────────────────────────────────────────
  function validate() {
    const errs = {}
    if (!title.trim()) errs.title = 'Title cannot be empty'
    if (title.trim().length > 100) errs.title = 'Title must be under 100 characters'
    if (!content.trim()) errs.content = 'Content cannot be empty'
    return errs
  }

  function handleSubmit() {
    const errs = validate()
    setTouched({ title: true, content: true })
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSave({ title, content, category, color })
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
    if (touched.title) {
      setErrors((prev) => ({
        ...prev,
        title: e.target.value.trim() ? '' : 'Title cannot be empty',
      }))
    }
  }

  function handleContentChange(e) {
    if (e.target.value.length > MAX_CHARS) return
    setContent(e.target.value)
    if (touched.content) {
      setErrors((prev) => ({
        ...prev,
        content: e.target.value.trim() ? '' : 'Content cannot be empty',
      }))
    }
  }

  const charPercent = Math.round((content.length / MAX_CHARS) * 100)
  const isNearLimit = content.length >= MAX_CHARS * 0.85

  // Filter out "all" from category dropdown
  const categoryOptions = CATEGORIES.filter((c) => c.id !== 'all')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {isEditing ? 'Edit Note' : 'Create New Note'}
            </h2>
            {isEditing && (
              <p className="modal-subtitle">Modify your existing note details.</p>
            )}
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Title Field */}
        <div className="modal-field">
          <label className="field-label">Note Title *</label>
          <input
            type="text"
            className={`field-input ${touched.title && errors.title ? 'input-error' : ''}`}
            placeholder="Enter a descriptive title..."
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
            autoFocus
          />
          {touched.title && errors.title && (
            <p className="field-error">{errors.title}</p>
          )}
        </div>

        {/* Category + Color row */}
        <div className="modal-row">
          <div className="modal-field flex-1">
            <label className="field-label">Category</label>
            <select
              className="field-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-field">
            <label className="field-label">Label Color</label>
            <div className="color-picker-row">
              {ACCENT_COLORS.map((ac) => (
                <button
                  key={ac.id}
                  className={`color-dot ${color === ac.value ? 'selected' : ''}`}
                  style={{ background: ac.value }}
                  onClick={() => setColor(ac.value)}
                  title={ac.label}
                  aria-label={`Select ${ac.label} color`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Field */}
        <div className="modal-field">
          <div className="field-label-row">
            <label className="field-label">Content *</label>
            <span className={`char-counter ${isNearLimit ? 'near-limit' : ''}`}>
              {content.length} / {MAX_CHARS}
            </span>
          </div>
          <textarea
            className={`field-textarea ${touched.content && errors.content ? 'input-error' : ''}`}
            placeholder="What's on your mind? Start typing your note here..."
            value={content}
            onChange={handleContentChange}
            onBlur={() => setTouched((prev) => ({ ...prev, content: true }))}
            rows={5}
          />
          {touched.content && errors.content && (
            <p className="field-error">{errors.content}</p>
          )}
          <p className="field-hint">Use this space for thoughts, checklists, or detailed reminders.</p>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            {isEditing ? 'Update Note' : 'Save Note'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal
