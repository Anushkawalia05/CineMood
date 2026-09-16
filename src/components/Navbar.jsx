import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-white">Cine</span>
          <span className="logo-pink">Mood</span>
        </Link>

        <div className="navbar-links">
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

          <Link
            to="/login"
            className={`navbar-link ${
              location.pathname === "/login" ? "active-link" : ""
            }`}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;