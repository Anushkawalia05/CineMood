import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎬 CineMood
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>

          <Link to="/movies" className="navbar-link">
            Movies
          </Link>

          <Link to="/favorites" className="navbar-link">
            Favorites
          </Link>

          <Link to="/login" className="navbar-link">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;