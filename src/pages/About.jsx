import "../styles/home.css";
import "../styles/about.css";

function About() {
  return (
    <main className="simple-page">
      <section className="about-page-content">
        <p className="home-section-kicker">A little less scrolling. A little more feeling.</p>
        <h1>Meet <span>CineMood</span></h1>
        <p className="about-lede">A movie discovery experience that starts with how you feel, how much energy you have, and how much time is left in your evening.</p>
        <div className="about-feature-grid">
          <article><span>01</span><h2>Find your feeling</h2><p>Explore moods or build a Mood Match from mood, energy, and runtime.</p></article>
          <article><span>02</span><h2>Choose your next watch</h2><p>Search a curated catalog, filter by genre, and sort by rating, year, or runtime.</p></article>
          <article><span>03</span><h2>Keep your own shelves</h2><p>Save favorites and keep a separate watch-later list in this browser.</p></article>
        </div>
        <section className="about-credits" aria-labelledby="credits-heading">
          <p className="home-section-kicker">Credits & viewing</p>
          <h2 id="credits-heading">Made for discovery, not streaming.</h2>
          <p>CineMood does not host or stream films. Movie metadata and poster images are attributed to <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">The Movie Database (TMDB)</a>; artwork rights remain with their respective owners.</p>
          <p>The catalog and scores are a static classroom demo, not live ratings or streaming availability. Demo accounts and saved lists stay in this browser and are not synced to a server.</p>
          <p className="tmdb-disclaimer">This project uses TMDB data and images; it is not endorsed or certified by TMDB.</p>
          <a className="tmdb-logo-link" href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" aria-label="Visit TMDB">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB logo" />
          </a>
          <a className="about-credit-link" href="https://www.themoviedb.org/about/logos-attribution" target="_blank" rel="noreferrer">TMDB source and logo attribution guidelines ↗</a>
        </section>
      </section>
    </main>
  );
}

export default About;
