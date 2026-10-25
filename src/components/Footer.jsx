import { Link } from "react-router-dom";
import Icon from "./Icon";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2><span className="footer-brand-icon"><Icon name="film" size={17} /></span> CineMood</h2>
          <p>Find the perfect movie for your mood.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/mood-match">Mood Match</Link>
          <Link to="/about">About & credits</Link>
          <Link to="/feedback">Feedback</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 CineMood. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

