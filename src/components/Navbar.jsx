import logo from '../assets/logo.svg'
import './Navbar.css'

const WEATHER_ICONS = {
  sunny: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="3" x2="4" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="13" y1="3" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="13" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  cloudy: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 10a3 3 0 0 1 3-3 3 3 0 0 1 5.83-1A2.5 2.5 0 1 1 12.5 11H3.5A.5.5 0 0 1 3 10z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    </svg>
  ),
  rainy: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8a3 3 0 0 1 3-3 3 3 0 0 1 5.83-1A2.5 2.5 0 1 1 12.5 9H3.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <line x1="5" y1="12" x2="4" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8" y1="12" x2="7" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="11" y1="12" x2="10" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
}

function getWeatherIcon(code) {
  if (code === 0) return WEATHER_ICONS.sunny
  if (code <= 3) return WEATHER_ICONS.cloudy
  return WEATHER_ICONS.rainy
}

function Navbar({ darkMode, onToggleDark, weather, weatherLoading, weatherError, onNewNote, onToggleSidebar }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onToggleSidebar} aria-label="Open sidebar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="4" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <img src={logo} alt="NoteNest Logo" width="16" height="16" />
          </div>
          <span className="nav-logo-text">NoteNest</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Weather Widget */}
        <div className="weather-widget">
          {weatherLoading ? (
            <span className="weather-loading">...</span>
          ) : weatherError ? (
            <span className="weather-error">--°C</span>
          ) : weather ? (
            <>
              <span className="weather-icon">{getWeatherIcon(weather.code)}</span>
              <span className="weather-temp">{weather.temp}°C</span>
            </>
          ) : null}
        </div>

        {/* Dark Mode Toggle */}
        <button
          className="icon-btn"
          onClick={onToggleDark}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="8" y1="1" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="8" y1="13.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="1" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="13.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        {/* New Note Button */}
        <button className="new-note-btn" onClick={onNewNote} aria-label="New note">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="1" x2="6" y2="11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="1" y1="6" x2="11" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="btn-text">New Note</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
