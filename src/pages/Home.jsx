import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Loading from "../components/Loading";
import MovieGrid from "../components/MovieGrid";
import useMovies from "../hooks/useMovies";
import { useLibrary } from "../hooks/useLibrary";
import Icon from "../components/Icon";
import "../styles/home.css";
import { moodMap } from "../utils/moodMap";

const moodShortcuts = [
  { name: "Happy", icon: "sun", description: "Something light and uplifting" },
  { name: "Relaxed", icon: "moon", description: "A calm, easy watch" },
  { name: "Excited", icon: "bolt", description: "Big energy and adventure" },
  { name: "Romantic", icon: "heart", description: "A story about connection" }
];

function Home() {
  const navigate = useNavigate();
  const { movies, loading, error } = useMovies("");
  const { favoriteIds, watchlistIds, toggleFavorite, toggleWatchlist } = useLibrary();
  const featuredMovies = movies.slice(0, 4);
  const [pickMood, setPickMood] = useState("Relaxed");
  const [pickRuntime, setPickRuntime] = useState("any");
  const [pickIndex, setPickIndex] = useState(0);
  const tonightPicks = useMemo(() => movies
    .filter((movie) => {
      const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
      const moodGenres = moodMap[pickMood] || [];
      return genres.some((genre) => moodGenres.some((item) => item.toLowerCase() === genre?.toLowerCase()))
        && (pickRuntime === "any" || (pickRuntime === "90" ? movie.runtime <= 90 : movie.runtime <= 120));
    })
    .sort((a, b) => b.rating - a.rating || a.id - b.id), [movies, pickMood, pickRuntime]);
  const tonightPick = tonightPicks.length ? tonightPicks[pickIndex % tonightPicks.length] : null;

  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-tagline">A better way to pick your next film</p>
          <h1 id="home-title">Your mood knows what to watch.</h1>
          <p className="home-description">
            Tell CineMood how you feel. Get movie ideas that fit the moment,
            then save the ones you want to watch.
          </p>
          <div className="home-actions">
            <Link className="home-discover-button" to="/movies">
              Explore movies <span aria-hidden="true">→</span>
            </Link>
            <Link className="home-secondary-link" to="/mood-match">Build my Mood Match <span aria-hidden="true">↗</span></Link>
          </div>
          <p className="home-promise">Browse freely. Your shelves stay saved in this browser.</p>
        </div>

        <div className="home-hero-art" aria-label="Movie poster previews">
          {movies.slice(0, 3).map((movie, index) => (
            <button
              className={`home-poster home-poster-${index + 1}`}
              key={movie.id}
              type="button"
              onClick={() => navigate(`/movie/${movie.id}`)}
              aria-label={`See ${movie.title} details`}
            >
              <img src={movie.poster} alt="" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/poster-placeholder.svg"; }} />
            </button>
          ))}
          <div className="home-art-note">
            <Icon name="sparkle" />
            Pick by feeling
          </div>
        </div>
      </section>

      <section className="tonight-section" aria-labelledby="tonight-title">
        <div className="tonight-copy">
          <p className="home-section-kicker">A small plan for tonight</p>
          <h2 id="tonight-title">Tonight’s Pick</h2>
          <p>Choose the feeling and how much time you have. CineMood will find a film from the catalog and tell you why it fits.</p>
          <div className="tonight-controls">
            <label>In the mood for
              <select value={pickMood} onChange={(event) => { setPickMood(event.target.value); setPickIndex(0); }}>
                {Object.keys(moodMap).map((mood) => <option key={mood} value={mood}>{mood}</option>)}
              </select>
            </label>
            <label>Time available
              <select value={pickRuntime} onChange={(event) => { setPickRuntime(event.target.value); setPickIndex(0); }}>
                <option value="any">Any runtime</option><option value="120">Under 2 hours</option><option value="90">Under 90 minutes</option>
              </select>
            </label>
          </div>
        </div>
        {tonightPick ? <article className="tonight-card">
          <button className="tonight-poster" type="button" onClick={() => navigate(`/movie/${tonightPick.id}`)} aria-label={`See ${tonightPick.title} details`}>
            <img src={tonightPick.poster || "/poster-placeholder.svg"} alt={`${tonightPick.title} poster`} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/poster-placeholder.svg"; }} />
          </button>
          <div className="tonight-card-copy">
            <p className="tonight-match-label"><Icon name="sparkle" size={15} /> Your {pickMood.toLowerCase()} pick</p>
            <h3>{tonightPick.title}</h3>
            <p className="tonight-meta">{tonightPick.year} · {tonightPick.runtime} min · ★ {tonightPick.rating}</p>
            <p className="tonight-reason">It fits your {pickMood.toLowerCase()} mood through its {tonightPick.genre.join(" and ").toLowerCase()} feel{pickRuntime !== "any" ? ` and fits your time limit` : ""}.</p>
            <div className="tonight-actions"><Link to={`/movie/${tonightPick.id}`}>Why this pick <span aria-hidden="true">→</span></Link><button type="button" onClick={() => setPickIndex((index) => index + 1)} disabled={tonightPicks.length < 2}>Pick another</button></div>
          </div>
        </article> : <div className="tonight-card tonight-empty"><h3>No match for those limits yet</h3><p>Try another mood or allow more time.</p></div>}
      </section>

      <section className="home-mood-section" id="choose-mood" aria-labelledby="mood-title">
        <div className="home-section-heading">
          <div>
            <p className="home-section-kicker">Start with the feeling</p>
            <h2 id="mood-title">What are you in the mood for?</h2>
          </div>
          <Link to="/movies" className="home-text-link">See all movies <span aria-hidden="true">→</span></Link>
        </div>

        <div className="home-mood-grid">
          {moodShortcuts.map((mood) => (
            <Link
              className="home-mood-card"
              key={mood.name}
              to={`/movies?mood=${encodeURIComponent(mood.name)}`}
            >
              <span className={`home-mood-symbol mood-tone-${mood.name.toLowerCase()}`} aria-hidden="true"><Icon name={mood.icon} size={21} /></span>
              <span className="home-mood-name">{mood.name}</span>
              <span className="home-mood-description">{mood.description}</span>
              <span className="home-mood-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-featured-section" aria-labelledby="featured-title">
        <div className="home-section-heading">
          <div>
            <p className="home-section-kicker">A few ideas to get you started</p>
            <h2 id="featured-title">Find your next favorite</h2>
          </div>
          <Link to="/movies" className="home-text-link">Browse the catalog <span aria-hidden="true">→</span></Link>
        </div>
        {loading && <Loading message="Finding movie picks..." />}
        {error && <p className="home-catalog-note" role="status">The starter picks are taking a moment to load.</p>}
        {!loading && !error && featuredMovies.length > 0 && (
          <MovieGrid
            movies={featuredMovies}
            onMovieClick={(movie) => navigate(`/movie/${movie.id}`)}
            onFavorite={toggleFavorite}
            favorites={favoriteIds}
            onWatchlist={toggleWatchlist}
            watchlist={watchlistIds}
          />
        )}
        {!loading && !error && featuredMovies.length === 0 && (
          <p className="home-catalog-note">No movies are available yet. Try again from Discover.</p>
        )}
      </section>
    </main>
  );
}

export default Home;
