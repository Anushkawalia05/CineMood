import React from "react";
import "../styles/movie.css";

function MovieModal({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  const {
    title,
    poster,
    rating,
    genre,
    year,
    description
  } = movie;

  return (
    <div
      className="movie-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="movie-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
      >
        <button
          type="button"
          className="movie-modal-close"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>

        <div className="movie-modal-content">
          {poster && (
            <img
              src={poster}
              alt={`${title} movie poster`}
              className="movie-modal-poster"
            />
          )}

          <div className="movie-modal-details">
            <h2 id="movie-modal-title">{title}</h2>

            <div className="movie-modal-info">
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

            {description && (
              <p className="movie-modal-description">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;