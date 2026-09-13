import { useEffect, useState } from "react";
import { fetchMovies } from "../services/movieApi";

function useMovies(query = "") {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadMovies() {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchMovies(query);

                if (isMounted) {
                    setMovies(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setMovies([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadMovies();

        return () => {
            isMounted = false;
        };
    }, [query]);

    return {
        movies,
        loading,
        error
    };
}

export default useMovies;