// ── Date formatting ──────────────────────────────────────────────
export function formatDate(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

// ── Debounce ─────────────────────────────────────────────────────
export function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// ── Generate unique ID ────────────────────────────────────────────
export function generateId() {
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

// ── Categories config ─────────────────────────────────────────────
export const CATEGORIES = [
  { id: 'all', label: 'All Notes', color: '#6366f1' },
  { id: 'personal', label: 'Personal', color: '#f87171' },
  { id: 'work', label: 'Work', color: '#60a5fa' },
  { id: 'ideas', label: 'Ideas', color: '#34d399' },
  { id: 'study', label: 'Study', color: '#fbbf24' },
  { id: 'health', label: 'Health', color: '#c084fc' },
  { id: 'other', label: 'Other', color: '#94a3b8' },
]

// ── Accent colors config ──────────────────────────────────────────
export const ACCENT_COLORS = [
  { id: 'red', value: '#f87171', label: 'Red' },
  { id: 'blue', value: '#60a5fa', label: 'Blue' },
  { id: 'green', value: '#34d399', label: 'Green' },
  { id: 'yellow', value: '#fbbf24', label: 'Yellow' },
  { id: 'purple', value: '#a78bfa', label: 'Purple' },
  { id: 'gray', value: '#94a3b8', label: 'Gray' },
]

// ── Category badge colors (bg + text) ────────────────────────────
export const CATEGORY_BADGE_STYLES = {
  personal: { bg: '#fef2f2', text: '#b91c1c' },
  work: { bg: '#eff6ff', text: '#1d4ed8' },
  ideas: { bg: '#f0fdf4', text: '#166534' },
  study: { bg: '#fefce8', text: '#854d0e' },
  health: { bg: '#faf5ff', text: '#6b21a8' },
  other: { bg: '#f8fafc', text: '#475569' },
}

// ── Sort notes ────────────────────────────────────────────────────
export function sortNotes(notes, sortBy) {
  const sorted = [...notes]
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    case 'az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'za':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return sorted
  }
}

// ── Filter + search notes ─────────────────────────────────────────
export function filterNotes(notes, category, searchQuery) {
  let result = [...notes]

  if (category && category !== 'all') {
    result = result.filter((note) => note.category === category)
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim()
    result = result.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    )
  }

  // Pinned notes always appear first
  result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  return result
}

// ── Calculate storage usage ───────────────────────────────────────
export function getStorageUsage() {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += (localStorage[key].length + key.length) * 2
    }
  }
  const usedKB = (total / 1024).toFixed(1)
  const maxKB = 5120
  const percent = Math.min((total / (maxKB * 1024)) * 100, 100).toFixed(1)
  return { usedKB, maxKB: '5MB', percent }
}
