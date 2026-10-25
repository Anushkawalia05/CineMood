import { useNavigate, useSearchParams } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { moodMap } from "../utils/moodMap";
import fallbackMovies from "../data/fallbackMovies";
import { useLibrary } from "../hooks/useLibrary";
import SearchBar from "../components/SearchBar";
import Icon from "../components/Icon";
import "../styles/home.css";
import "../styles/movie.css";

const moodIcons = { Happy: "sun", Sad: "moon", Romantic: "heart", Excited: "bolt", Angry: "bolt", Relaxed: "calm" };

function Discover() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("search") || "";
  const selectedMood = searchParams.get("mood") || "";
  const selectedGenre = searchParams.get("genre") || "";
  const sortBy = searchParams.get("sort") || "popular";

  const { favoriteIds, watchlistIds, toggleFavorite, toggleWatchlist } = useLibrary();

  const { movies, loading, error } = useMovies(query);

  const updateFilter = (key, value) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  };
  const clearFilters = () => setSearchParams({});

  const filteredMovies = movies
    .filter((movie) => {
      if (!selectedMood) return true;
      const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
      return genres.some((genre) =>
        moodMap[selectedMood]?.some(
          (moodGenre) => moodGenre.toLowerCase() === genre?.toLowerCase()
        )
      );
    })
    .filter((movie) => {
      if (!selectedGenre) return true;
      const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
      return genres.includes(selectedGenre);
    })
    .sort((first, second) => {
      if (sortBy === "rating") return second.rating - first.rating;
      if (sortBy === "newest") return second.year - first.year;
      if (sortBy === "shortest") return first.runtime - second.runtime;
      return first.id - second.id;
    });
  const genres = [...new Set(fallbackMovies.flatMap((movie) => movie.genre))].sort();

  return (
    <main className="discover-page">
      <section className="discover-header">
        <p className="discover-tagline">
          Find your next watch
        </p>

        <h1>
          Discover <span>Movies</span> <Icon className="discover-title-icon" name="film" size={31} />
        </h1>

        <p>
          Search for a movie or choose a mood to find something
          you'll love.
        </p>
      </section>

      <section className="discover-controls">
        <div className="mood-buttons">
          {Object.keys(moodMap).map((mood) => (
            <button
              key={mood}
              type="button"
              className={`mood-button mood-${mood.toLowerCase()} ${selectedMood === mood ? "mood-active" : ""}`}
              onClick={() => updateFilter("mood", mood)}
            >
              <Icon name={moodIcons[mood]} size={16} /> {mood}
            </button>
          ))}

          <button
            type="button"
            className={`mood-button mood-all ${selectedMood === "" ? "mood-active" : ""}`}
            onClick={() => updateFilter("mood", "")}
          >
            <Icon name="sparkle" size={16} /> All
          </button>
        </div>

        <SearchBar key={query} initialValue={query} onSearch={(value) => updateFilter("search", value)} />
        <div className="discover-refinements" aria-label="Refine movie results">
          <label>
            <span className="filter-label"><Icon name="film" size={14} /> Genre</span>
            <select value={selectedGenre} onChange={(event) => updateFilter("genre", event.target.value)}>
              <option value="">Every genre</option>
              {genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
            </select>
          </label>
          <label>
            <span className="filter-label"><Icon name="sparkle" size={14} /> Sort by</span>
            <select value={sortBy} onChange={(event) => updateFilter("sort", event.target.value === "popular" ? "" : event.target.value)}>
              <option value="popular">Featured</option>
              <option value="rating">Top rated</option>
              <option value="newest">Newest first</option>
              <option value="shortest">Shortest runtime</option>
            </select>
          </label>
        </div>
      </section>

      {(query || selectedMood || selectedGenre || sortBy !== "popular") && <div className="active-filters" aria-label="Active filters">
        <span className="active-filters-label">Showing:</span>
        {query && <button type="button" className="filter-chip" onClick={() => updateFilter("search", "")}>Search: “{query}” <span aria-hidden="true">×</span></button>}
        {selectedMood && <button type="button" className="filter-chip" onClick={() => updateFilter("mood", "")}>{selectedMood} mood <span aria-hidden="true">×</span></button>}
        {selectedGenre && <button type="button" className="filter-chip" onClick={() => updateFilter("genre", "")}>{selectedGenre} <span aria-hidden="true">×</span></button>}
        {sortBy !== "popular" && <button type="button" className="filter-chip" onClick={() => updateFilter("sort", "")}>{({ rating: "Top rated", newest: "Newest first", shortest: "Shortest runtime" })[sortBy] || "Featured"} <span aria-hidden="true">×</span></button>}
        <button type="button" className="clear-filters" onClick={clearFilters}>Clear all</button>
      </div>}

      {loading && <Loading />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <p className="discover-result-count" aria-live="polite">
            {filteredMovies.length} {filteredMovies.length === 1 ? "film" : "films"} to explore
          </p>
          {filteredMovies.length > 0 ? (
            <MovieGrid
              movies={filteredMovies}
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
              <h2><Icon className="empty-state-icon" name="film" size={26} /> No movies found</h2>
              <p>
                Try removing a filter, changing your search, or browsing the full catalog.
              </p>
              <button className="empty-state-action" type="button" onClick={clearFilters}>Clear filters and browse all movies</button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Discover;
