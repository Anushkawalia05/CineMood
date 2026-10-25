import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Icon from "./Icon";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon"><Icon name="film" size={19} /></span>
          <span className="logo-white">Cine</span>
          <span className="logo-pink">Mood</span>
        </Link>

        <button className="navbar-menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <Icon name={menuOpen ? "close" : "menu"} size={21} />
        </button>

        <div id="primary-navigation" className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`} onClick={(event) => { if (event.target.closest("a, button")) setMenuOpen(false); }}>
          <Link
            to="/"
            className={`navbar-link ${
              location.pathname === "/" ? "active-link" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/movies"
            className={`navbar-link ${
              location.pathname === "/movies" ||
              location.pathname === "/discover"
                ? "active-link"
                : ""
            }`}
          >
            Movies
          </Link>

          <Link
            to="/favorites"
            className={`navbar-link ${
              location.pathname === "/favorites" ? "active-link" : ""
            }`}
          >
            Favorites
          </Link>

          <Link to="/mood-match" className={`navbar-link ${location.pathname === "/mood-match" ? "active-link" : ""}`}>
            Mood Match
          </Link>

          <Link to="/about" className={`navbar-link ${location.pathname === "/about" ? "active-link" : ""}`}>
            About
          </Link>
          <Link to="/feedback" className={`navbar-link ${location.pathname === "/feedback" ? "active-link" : ""}`}>
            Feedback
          </Link>
          {user ? (
            <div className="navbar-account">
              <span className="navbar-user-name">Hi, {user.name}</span>
              <button className="navbar-signout" type="button" onClick={signOut}>Sign out</button>
            </div>
          ) : (
            <Link to="/login" className={`navbar-link ${location.pathname === "/login" || location.pathname === "/signup" ? "active-link" : ""}`}>Sign in</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
