import fallbackMovies from "../data/fallbackMovies";

// The app currently uses its bundled catalog, so it works without an API key.
export async function searchMovies(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return fallbackMovies;

  return fallbackMovies.filter((movie) =>
    [movie.title, movie.overview, ...movie.genre]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedQuery)
  );
}

export function getMovieById(id) {
  return fallbackMovies.find((movie) => String(movie.id) === String(id)) ?? null;
}
