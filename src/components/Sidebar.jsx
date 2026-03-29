import { CATEGORIES } from '../utils/helpers'
import { getStorageUsage } from '../utils/helpers'
import './Sidebar.css'

function Sidebar({ activeCategory, onCategoryChange, getCategoryCount, isOpen, onClose }) {
  const storage = getStorageUsage()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-section">
          <p className="sidebar-label">Categories</p>
          <ul className="category-list">
            {CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat.id)
              const isActive = activeCategory === cat.id
              return (
                <li key={cat.id}>
                  <button
                    className={`category-item ${isActive ? 'active' : ''}`}
                    onClick={() => onCategoryChange(cat.id)}
                  >
                    <span className="category-left">
                      <span
                        className="category-dot"
                        style={{ background: cat.color }}
                      />
                      <span className="category-name">{cat.label}</span>
                    </span>
                    <span className="category-count">{count}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-divider" />
          <div className="storage-section">
            <div className="storage-header">
              <span className="storage-label">Storage</span>
              <span className="storage-used">{storage.usedKB} KB / {storage.maxKB}</span>
            </div>
            <div className="storage-bar-bg">
              <div
                className="storage-bar-fill"
                style={{ width: `${storage.percent}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
