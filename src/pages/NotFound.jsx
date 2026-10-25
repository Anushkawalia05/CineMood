import { Link } from "react-router-dom";
import "../styles/home.css";

function NotFound() {
  return (
    <main className="simple-page">
      <section className="simple-page-content">
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link to="/">Return home</Link>
      </section>
    </main>
  );
}

export default NotFound;
