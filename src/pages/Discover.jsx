import { useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { moodMap } from "../utils/moodMap";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

function Discover() {
    const [query, setQuery] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const navigate = useNavigate();
    const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    });

    const {
        movies,
        loading,
        error
    } = useMovies(query);
    const filteredMovies = selectedMood
    ? movies.filter((movie) =>
        movie.genre?.some((genre) =>
            moodMap[selectedMood].includes(genre)
        )
    )
    : movies;

    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favoriteIds));
    }, [favoriteIds]);

    const handleFavorite = (movie) => {
      setFavoriteIds((current) =>
        current.includes(movie.id)
          ? current.filter((id) => id !== movie.id)
          : [...current, movie.id]
    );
};

    return (
    <main className="discover-page">
        <section className="discover-header">
            <p className="discover-tagline">Find your next watch</p>
            <h1>Discover Movies 🎬</h1>
            <p>
                Search for a movie or choose a mood to find something you'll love.
            </p>
        </section>

        <section className="discover-controls">
            <div className="mood-buttons">
                {Object.keys(moodMap).map((mood) => (
                    <button
                        key={mood}
                        type="button"
                        className={selectedMood === mood ? "mood-active" : ""}
                        onClick={() => setSelectedMood(mood)}
                    >
                        {mood}
                    </button>
                ))}

                <button
                    type="button"
                    className={selectedMood === "" ? "mood-active" : ""}
                    onClick={() => setSelectedMood("")}
                >
                    All
                </button>
            </div>

            <SearchBar onSearch={setQuery} />
        </section>

        {loading && <Loading />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
            <>
                {filteredMovies.length > 0 ? (
                    <MovieGrid
                      movies={filteredMovies}
                      onMovieClick={(movie) => {
                        navigate(`/movie/${movie.id}`);
                      }}
                      onFavorite={handleFavorite}
                      favorites={favoriteIds}
                    />
                ) : (
                    <div className="no-movies">
                        <h2>No movies found 😭</h2>
                        <p>Try another search or choose a different mood.</p>
                    </div>
                )}
            </>
        )}
    </main>
);
}

export default Discover;