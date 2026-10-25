import { Link, useNavigate, useParams } from "react-router-dom";
import fallbackMovies from "../data/fallbackMovies";
import { formatRating } from "../utils/formatters";
import { useLibrary } from "../hooks/useLibrary";
import MovieGrid from "../components/MovieGrid";
import "../styles/movie.css";

function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = fallbackMovies.find((item) => String(item.id) === movieId);
  const { favoriteIds, watchlistIds, toggleFavorite, toggleWatchlist } = useLibrary();
  const trailerSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie?.title || ""} ${movie?.year || ""} official trailer`)}`;
  const legalViewingSearch = `https://www.justwatch.com/in/search?q=${encodeURIComponent(movie?.title || "")}`;
  const relatedMovies = movie
    ? fallbackMovies
        .filter((item) => item.id !== movie.id && item.genre.some((genre) => movie.genre.includes(genre)))
        .sort((first, second) => {
          const firstOverlap = first.genre.filter((genre) => movie.genre.includes(genre)).length;
          const secondOverlap = second.genre.filter((genre) => movie.genre.includes(genre)).length;
          return secondOverlap - firstOverlap || second.rating - first.rating;
        })
        .slice(0, 4)
    : [];

  if (!movie) {
    return (
      <main className="simple-page">
        <section className="simple-page-content">
          <h1>Movie not found</h1>
          <p>That movie is not in the current movie collection.</p>
          <Link to="/movies">Back to movies</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="movie-details-page">
      <Link className="movie-details-back" to="/movies">← Back to movies</Link>
      <article className="movie-details">
        <div className="movie-details-poster">
          <img src={movie.poster} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/poster-placeholder.svg"; }} alt={`${movie.title} movie poster`} />
        </div>
        <div className="movie-details-content">
          <h1>{movie.title}</h1>
          <div className="movie-details-info">
            <span className="rating-chip"><span aria-hidden="true">★</span> {formatRating(movie.rating)}</span>
            <span>{movie.year}</span>
            <span>{movie.runtime} min</span>
            <span>{movie.genre.join(" · ")}</span>
          </div>
          <p className="movie-details-description">{movie.overview}</p>
          <div className="movie-why-fit"><span className="movie-why-label">Why it may fit your next watch</span><p>A {movie.genre.join(", ").toLowerCase()} story rated {formatRating(movie.rating)}. It’s approximately {movie.runtime} minutes long, so you can see if it fits the time you have.</p></div>
          <div className="movie-details-actions">
            <button type="button" onClick={() => toggleFavorite(movie)}>{favoriteIds.includes(movie.id) ? "♥ Saved to favorites" : "♡ Add to favorites"}</button>
            <button type="button" onClick={() => toggleWatchlist(movie)}>{watchlistIds.includes(movie.id) ? "✓ In watch later" : "+ Watch later"}</button>
          </div>
          <div className="movie-discovery-links" aria-label="Movie discovery links">
            <a href={trailerSearch} target="_blank" rel="noopener noreferrer">Search for the official trailer <span aria-hidden="true">↗</span></a>
            <a href={legalViewingSearch} target="_blank" rel="noopener noreferrer">Find legal viewing options in India <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </article>
      {relatedMovies.length > 0 && (
        <section className="movie-related-section" aria-labelledby="related-title">
          <p className="home-section-kicker">Keep the story going</p>
          <h2 id="related-title">More like {movie.title}</h2>
          <p>Picked because these films share one or more genres.</p>
          <MovieGrid
            movies={relatedMovies}
            onMovieClick={(item) => navigate(`/movie/${item.id}`)}
            onFavorite={toggleFavorite}
            favorites={favoriteIds}
            onWatchlist={toggleWatchlist}
            watchlist={watchlistIds}
            matchReasonForMovie={(item) => {
              const shared = item.genre.filter((genre) => movie.genre.includes(genre));
              return `Shares ${shared.join(", ")} with this pick.`;
            }}
          />
        </section>
      )}
    </main>
  );
}

export default MovieDetails;
