import React from "react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <a href="/" className="navbar-logo">
          🎬 CineMood
        </a>

        <div className="navbar-links">
          <a href="/" className="navbar-link">
            Home
          </a>

          <a href="/movies" className="navbar-link">
            Movies
          </a>

          <a href="/favorites" className="navbar-link">
            Favorites
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;