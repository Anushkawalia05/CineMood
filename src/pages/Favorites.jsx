import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import fallbackMovies from "../data/fallbackMovies";
import { useLibrary } from "../hooks/useLibrary";
import Icon from "../components/Icon";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/movie.css";

function Favorites() {
  const navigate = useNavigate();

  const { favoriteIds, watchlistIds, toggleFavorite, toggleWatchlist } = useLibrary();
  const [collection, setCollection] = useState("favorites");
  const activeIds = collection === "favorites" ? favoriteIds : watchlistIds;
  const activeMovies = fallbackMovies.filter((movie) => activeIds.includes(movie.id));

  return (
    <main className="favorites-page">
      <section className="discover-header">
        <p className="discover-tagline">
          Your collection
        </p>

        <h1>
          Favorite <span>Movies</span> <Icon className="discover-title-icon" name="heart" size={27} />
        </h1>

        <p>
          A little shelf of films you love and the ones you want to watch next.
        </p>
      </section>

      <div className="collection-tabs" role="tablist" aria-label="Your movie collection">
        <button type="button" role="tab" aria-selected={collection === "favorites"} className={collection === "favorites" ? "is-active" : ""} onClick={() => setCollection("favorites")}>Favorites <span>{favoriteIds.length}</span></button>
        <button type="button" role="tab" aria-selected={collection === "watchlist"} className={collection === "watchlist" ? "is-active" : ""} onClick={() => setCollection("watchlist")}>Watch later <span>{watchlistIds.length}</span></button>
      </div>

      {activeMovies.length > 0 ? (
        <MovieGrid
          movies={activeMovies}
          onMovieClick={(movie) => {
            navigate(`/movie/${movie.id}`);
          }}
          onFavorite={toggleFavorite}
          favorites={favoriteIds}
          onWatchlist={toggleWatchlist}
          watchlist={watchlistIds}
        />
      ) : (
        <div className="no-movies">
          <h2><Icon className="empty-state-icon" name="film" size={26} /> {collection === "favorites" ? "Your favorites shelf is waiting" : "Your watch-later list is empty"}</h2>
          <p>
            {collection === "favorites" ? "Tap the heart on a movie to keep it close." : "Tap the plus on a movie to save it for later."}
          </p>
          <Link className="empty-state-action" to="/movies">Explore the movie catalog <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </main>
  );
}

export default Favorites;
