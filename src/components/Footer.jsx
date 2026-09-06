import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>🎬 CineMood</h2>
          <p>Find the perfect movie for your mood.</p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/favorites">Favorites</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 CineMood. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

