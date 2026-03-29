import { useState, useEffect, useRef } from 'react'
import { CATEGORIES } from '../utils/helpers'
import './NoteEditor.css'

function NoteEditor({ note, onSave, onClose }) {
  const [content, setContent] = useState(note?.content || '')
  const [highlightColor, setHighlightColor] = useState('rgba(254, 240, 138, 0.5)')
  const [isHighlightActive, setIsHighlightActive] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const editorRef = useRef(null)

  const HIGHLIGHT_COLORS = [
    { name: 'None', value: 'transparent' },
    { name: 'Yellow', value: 'rgba(254, 240, 138, 0.5)' },
    { name: 'Green', value: 'rgba(187, 247, 208, 0.5)' },
    { name: 'Blue', value: 'rgba(191, 219, 254, 0.5)' },
    { name: 'Pink', value: 'rgba(254, 205, 211, 0.5)' },
    { name: 'Purple', value: 'rgba(233, 213, 255, 0.5)' },
  ]

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content
    }
  }, [])

  const handleSave = () => {
    const htmlContent = editorRef.current ? editorRef.current.innerHTML : content
    onSave({ ...note, content: htmlContent })
  }

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current.focus()
  }

  const toggleHighlight = (color = highlightColor) => {
    // If color is transparent, we effectively remove the highlight
    document.execCommand('backColor', false, color === 'transparent' ? 'initial' : color)
    editorRef.current.focus()
    setShowColorPicker(false)
  }

  const handleMainHighlight = () => {
    const nextState = !isHighlightActive
    setIsHighlightActive(nextState)
    toggleHighlight(nextState ? highlightColor : 'transparent')
  }

  const selectHighlightColor = (color) => {
    setHighlightColor(color)
    setIsHighlightActive(color !== 'transparent')
    toggleHighlight(color)
  }

  const handlePaperClick = (e) => {
    // Only trigger if clicking the paper or the editor div itself
    if (e.target !== e.currentTarget && !e.target.classList.contains('notepad-content')) return

    const editor = editorRef.current
    if (!editor) return

    // Focus editor first
    editor.focus()

    const rect = editor.getBoundingClientRect()
    const relativeY = e.clientY - rect.top
    const lineHeight = 32 // Matches CSS
    const targetLineIndex = Math.max(0, Math.floor(relativeY / lineHeight))

    // Ensure we have enough line elements (divs) to reach the clicked line
    let lines = Array.from(editor.children)
    
    // If the editor is empty or just has a text node, normalize it to divs
    if (lines.length === 0 && editor.innerHTML.trim() !== '') {
      const currentContent = editor.innerHTML
      editor.innerHTML = `<div>${currentContent}</div>`
      lines = Array.from(editor.children)
    }

    if (lines.length <= targetLineIndex) {
      // Append empty lines until we reach the target
      for (let i = lines.length; i <= targetLineIndex; i++) {
        const div = document.createElement('div')
        div.innerHTML = '<br>'
        editor.appendChild(div)
      }
      // Update state to sync the new HTML
      setContent(editor.innerHTML)
      lines = Array.from(editor.children)
    }

    // Move cursor to the target line
    const selection = window.getSelection()
    const range = document.createRange()
    const targetNode = lines[targetLineIndex] || editor
    
    range.selectNodeContents(targetNode)
    range.collapse(false) // Place at the end of the line
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const categoryData = CATEGORIES.find(c => c.id === note.category)

  return (
    <div className="editor-overlay">
      <div className="editor-container">
        <header className="editor-header">
          <div className="editor-header-left">
            <button className="btn-back" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="editor-meta">
              <h1 className="editor-title">{note.title}</h1>
              <span className="editor-category-badge" style={{ backgroundColor: categoryData?.color + '20', color: categoryData?.color }}>
                {categoryData?.label}
              </span>
            </div>
          </div>
          
          <div className="editor-actions">
            <button className="btn-save-main" onClick={handleSave}>
              Save Note
            </button>
          </div>
        </header>

        <div className="editor-toolbar">
          <div className="toolbar-group">
            <button className="toolbar-btn" onClick={() => execCommand('bold')} title="Bold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
              </svg>
            </button>
            <button className="toolbar-btn" onClick={() => execCommand('italic')} title="Italic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>
              </svg>
            </button>
            <div className="highlight-wrapper">
              <button 
                className={`toolbar-btn highlight-btn ${isHighlightActive ? 'active' : ''}`} 
                onClick={handleMainHighlight} 
                title="Highlight"
                style={{ borderBottom: `3px solid ${highlightColor}` }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
              </button>
              <button className="color-dropdown-btn" onClick={() => setShowColorPicker(!showColorPicker)}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showColorPicker && (
                <div className="color-picker-popover">
                  {HIGHLIGHT_COLORS.map(c => (
                    <button 
                      key={c.name} 
                      className={`color-option ${c.value === 'transparent' ? 'none' : ''}`} 
                      style={{ backgroundColor: c.value === 'transparent' ? 'transparent' : c.value }}
                      onClick={() => selectHighlightColor(c.value)}
                      title={c.name}
                    >
                      {c.value === 'transparent' && <span className="none-slash">/</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="toolbar-sep"></div>

          <div className="toolbar-group">
            <button className="toolbar-btn" onClick={() => execCommand('justifyLeft')} title="Align Left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
              </svg>
            </button>
            <button className="toolbar-btn" onClick={() => execCommand('justifyCenter')} title="Align Center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/>
              </svg>
            </button>
            <button className="toolbar-btn" onClick={() => execCommand('justifyRight')} title="Align Right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="toolbar-sep"></div>

          <div className="toolbar-group">
            <select className="font-size-select" onChange={(e) => execCommand('fontSize', e.target.value)} defaultValue="3">
              <option value="1">Small</option>
              <option value="3">Medium</option>
              <option value="5">Large</option>
              <option value="7">Extra Large</option>
            </select>
          </div>

          <div className="toolbar-sep"></div>

          <button className="toolbar-btn" onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="notepad-paper" onClick={handlePaperClick}>
          <div 
            className="notepad-content"
            contentEditable
            ref={editorRef}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            placeholder="Start typing your note here..."
          ></div>
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
