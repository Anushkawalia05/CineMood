import "../styles/movie.css";

function MovieCard({
  movie,
  onMovieClick,
  onFavorite,
  onWatchlist,
  isFavorite = false,
  isWatchlisted = false,
  matchReason
}) {
  if (!movie) {
    return null;
  }

  const {
    title,
    poster,
    rating,
    genre,
    year
  } = movie;
  const genres = Array.isArray(genre) ? genre.join(", ") : genre;

  return (
    <article className="movie-card">
      <div className="movie-card-poster">
        <button className="movie-card-poster-link" type="button" onClick={() => onMovieClick?.(movie)} aria-label={`View details for ${title}`}>
        {poster ? (
          <img
            src={poster}
            alt={`${title} movie poster`}
            loading="lazy"
            decoding="async"
            onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/poster-placeholder.svg"; }}
          />
        ) : (
          <img src="/poster-placeholder.svg" alt={`Poster unavailable for ${title}`} />
        )}
        </button>

        {(onFavorite || onWatchlist) && <div className="movie-card-actions">
        {onFavorite && <button
          type="button"
          className={`favorite-button ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();

            if (onFavorite) {
              onFavorite(movie);
            }
          }}
          aria-label={
            isFavorite
              ? `Remove ${title} from favorites`
              : `Add ${title} to favorites`
          }
          aria-pressed={isFavorite}
        >
          {isFavorite ? "♥" : "♡"}
        </button>}
        {onWatchlist && <button
          type="button"
          className={`watchlist-button ${isWatchlisted ? "watchlist-active" : ""}`}
          onClick={(event) => { event.stopPropagation(); onWatchlist(movie); }}
          aria-label={isWatchlisted ? `Remove ${title} from watch later` : `Add ${title} to watch later`}
          aria-pressed={isWatchlisted}
        >{isWatchlisted ? "✓" : "+"}</button>}
        </div>}
      </div>

      <div className="movie-card-content">
        <h3 className="movie-card-title">
          {title}
        </h3>

        <div className="movie-card-info">
          {rating !== undefined && (
            <span className="rating-chip"><span aria-hidden="true">★</span> {rating}</span>
          )}

          {year && (
            <span>{year}</span>
          )}

          {genre && (
            <span>{genres}</span>
          )}
        </div>
        {movie.runtime && <p className="movie-card-runtime">{movie.runtime} min</p>}
        {matchReason && <p className="movie-card-match-reason">{matchReason}</p>}
      </div>
    </article>
  );
}

export default MovieCard;
