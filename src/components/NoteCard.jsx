import { formatDate, CATEGORY_BADGE_STYLES } from '../utils/helpers'
import './NoteCard.css'

// Reusable IconButton component
function IconButton({ onClick, title, danger, children }) {
  return (
    <button
      className={`note-action-btn ${danger ? 'danger' : ''}`}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  )
}

function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const badgeStyle = CATEGORY_BADGE_STYLES[note.category] || CATEGORY_BADGE_STYLES.other

  function handleDelete(e) {
    e.stopPropagation()
    if (window.confirm(`Delete "${note.title}"?`)) {
      onDelete(note.id)
    }
  }

  function handleEdit(e) {
    e.stopPropagation()
    onEdit(note)
  }

  function handlePin(e) {
    e.stopPropagation()
    onTogglePin(note.id)
  }

  return (
    <div
      className={`note-card ${note.pinned ? 'pinned' : ''}`}
      style={{ borderTopColor: note.color }}
      onClick={() => onEdit(note)}
    >
      {note.pinned && (
        <div className="pin-indicator" title="Pinned">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M5 0L6.2 3.8H10L7 6.1L8.1 10L5 7.6L1.9 10L3 6.1L0 3.8H3.8L5 0Z"/>
          </svg>
        </div>
      )}

      <h3 className="note-title">{note.title}</h3>
      <p 
        className="note-body" 
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></p>

      <div className="note-footer">
        <span
          className="note-category-badge"
          style={{ background: badgeStyle.bg, color: badgeStyle.text }}
        >
          {note.category}
        </span>

        <div className="note-actions" onClick={(e) => e.stopPropagation()}>
          <IconButton onClick={handlePin} title={note.pinned ? 'Unpin note' : 'Pin note'}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0.5L7.3 4H11L8.4 6.2L9.4 10L6 7.8L2.6 10L3.6 6.2L1 4H4.7L6 0.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill={note.pinned ? 'currentColor' : 'none'}
              />
            </svg>
          </IconButton>

          <IconButton onClick={handleEdit} title="Edit note">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>

          <IconButton onClick={handleDelete} title="Delete note" danger>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="2" y1="3.5" x2="10" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M4.5 3.5V2.5H7.5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M3 3.5L3.5 9.5H8.5L9 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="5" y1="6" x2="5" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="7" y1="6" x2="7" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </IconButton>
        </div>
      </div>

      <p className="note-date">
        {note.pinned ? 'Pinned · ' : ''}
        {formatDate(note.updatedAt)}
      </p>
    </div>
  )
}

export default NoteCard
