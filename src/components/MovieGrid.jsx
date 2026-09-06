import React from "react";
import MovieCard from "./MovieCard";
import "../styles/movie.css";

function MovieGrid({
  movies = [],
  onMovieClick,
  onFavorite,
  favorites = []
}) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
          onFavorite={onFavorite}
          isFavorite={favorites.includes(movie.id)}
        />
      ))}
    </div>
  );
}

export default MovieGrid; 
