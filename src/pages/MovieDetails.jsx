import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById } from "../services/movieApi";
import "../styles/movie.css";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie() {
            const data = await fetchMovieById(id);
            setMovie(data);
            setLoading(false);
        }

        loadMovie();
    }, [id]);

    if (loading) {
        return (
            <main className="movie-details-page">
                <p>Loading movie details...</p>
            </main>
        );
    }

    if (!movie) {
        return (
            <main className="movie-details-page">
                <h1>Movie not found</h1>
                <button
                    type="button"
                    onClick={() => navigate("/movies")}
                >
                    Back to Movies
                </button>
            </main>
        );
    }

    return (
        <main className="movie-details-page">
            <button
                type="button"
                className="movie-details-back"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <section className="movie-details">
                <div className="movie-details-poster">
                    {movie.poster ? (
                        <img
                            src={movie.poster}
                            alt={`${movie.title} movie poster`}
                        />
                    ) : (
                        <div className="movie-card-no-poster">
                            No Poster
                        </div>
                    )}
                </div>

                <div className="movie-details-content">
                    <h1>{movie.title}</h1>

                    <div className="movie-details-info">
                        <span>⭐ {movie.rating}</span>
                        <span>📅 {movie.year}</span>
                        <span>🎭 {movie.genre.join(", ")}</span>
                    </div>

                    {movie.overview && (
                        <p className="movie-details-description">
                            {movie.overview}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default MovieDetails;