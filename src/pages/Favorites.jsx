import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import fallbackMovies from "../data/fallbackMovies";
import "../styles/home.css";
import "../styles/movie.css";

function Favorites() {
  const navigate = useNavigate();

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const favoriteMovies = fallbackMovies.filter((movie) =>
    favoriteIds.includes(movie.id)
  );

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  const handleFavorite = (movie) => {
    setFavoriteIds((current) =>
      current.includes(movie.id)
        ? current.filter((id) => id !== movie.id)
        : [...current, movie.id]
    );
  };

  return (
    <main className="favorites-page">
      <section className="discover-header">
        <p className="discover-tagline">
          Your collection
        </p>

        <h1>
          Favorite <span>Movies</span> ❤️
        </h1>

        <p>
          Keep the movies you never want to lose track of.
        </p>
      </section>

      {favoriteMovies.length > 0 ? (
        <MovieGrid
          movies={favoriteMovies}
          onMovieClick={(movie) => {
            navigate(`/movie/${movie.id}`);
          }}
          onFavorite={handleFavorite}
          favorites={favoriteIds}
        />
      ) : (
        <div className="no-movies">
          <h2>No favorites yet 🎬</h2>
          <p>
            Tap the ♡ on a movie to add it to your favorites.
          </p>
        </div>
      )}
    </main>
  );
}

export default Favorites;