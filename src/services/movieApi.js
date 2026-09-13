import fallbackMovies from "../data/fallbackMovies";

export async function fetchMovies(query = "") {
    if (!query) {
        return fallbackMovies;
    }

    return fallbackMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );
}

export async function fetchMovieById(id) {
    return fallbackMovies.find(
        (movie) => movie.id === Number(id)
    );
}