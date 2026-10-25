import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice";

function useMovies(query = "") {
  const dispatch = useDispatch();
  const { items, status, error, activeQuery } = useSelector((state) => state.movies);

  useEffect(() => {
    const request = dispatch(fetchMovies(query));
    return () => request.abort();
  }, [dispatch, query]);

  return {
    movies: items,
    loading: status === "idle" || status === "loading" || activeQuery !== query,
    error: status === "failed" ? error : ""
  };
}

export default useMovies;
