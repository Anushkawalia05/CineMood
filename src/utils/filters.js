import { moodMap } from "./moodMap";


// Filter movies by search term
const filterBySearch = (movies, searchTerm) => {
    if (!searchTerm) {
        return movies;
    }

    const term = searchTerm.toLowerCase();

    return movies.filter((movie) =>
        movie.title?.toLowerCase().includes(term)
    );
};


// Filter movies by genre
const filterByGenre = (movies, genre) => {
    if (!genre) {
        return movies;
    }

    return movies.filter((movie) => {
        if (!movie.genre) {
            return false;
        }

        if (Array.isArray(movie.genre)) {
            return movie.genre.some(
                (item) => item.toLowerCase() === genre.toLowerCase()
            );
        }

        return movie.genre.toLowerCase().includes(genre.toLowerCase());
    });
};


// Filter movies by minimum rating
const filterByRating = (movies, minimumRating) => {
    if (minimumRating === undefined || minimumRating === null) {
        return movies;
    }

    return movies.filter(
        (movie) => Number(movie.rating) >= Number(minimumRating)
    );
};


// Filter movies according to a selected mood
const filterByMood = (movies, mood) => {
    if (!mood || !moodMap[mood]) {
        return movies;
    }

    const genres = moodMap[mood];

    return movies.filter((movie) => {
        if (!movie.genre) {
            return false;
        }

        if (Array.isArray(movie.genre)) {
            return movie.genre.some((movieGenre) =>
                genres.some(
                    (moodGenre) =>
                        movieGenre.toLowerCase() === moodGenre.toLowerCase()
                )
            );
        }

        return genres.some((moodGenre) =>
            movie.genre.toLowerCase().includes(moodGenre.toLowerCase())
        );
    });
};


export {
    filterBySearch,
    filterByGenre,
    filterByRating,
    filterByMood
};