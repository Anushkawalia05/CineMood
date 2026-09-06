import React from "react";
import "../styles/movie.css";

function MovieCard({
  movie,
  onMovieClick,
  onFavorite,
  isFavorite = false
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

  return (
    <article className="movie-card">
      <div
        className="movie-card-poster"
        onClick={() => onMovieClick && onMovieClick(movie)}
        role="button"
        tabIndex="0"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            onMovieClick && onMovieClick(movie);
          }
        }}
        aria-label={`View details for ${title}`}
      >
        {poster ? (
          <img
            src={poster}
            alt={`${title} movie poster`}
          />
        ) : (
          <div className="movie-card-no-poster">
            No Poster
          </div>
        )}

        <button
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
        </button>
      </div>

      <div className="movie-card-content">
        <h3 className="movie-card-title">
          {title}
        </h3>

        <div className="movie-card-info">
          {rating !== undefined && (
            <span>⭐ {rating}</span>
          )}

          {year && (
            <span>{year}</span>
          )}

          {genre && (
            <span>{genre}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;