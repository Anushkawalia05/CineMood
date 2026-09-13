const formatRating = (rating) => {
    if (rating === null || rating === undefined || rating === "") {
        return "N/A";
    }

    const number = Number(rating);

    if (Number.isNaN(number)) {
        return "N/A";
    }

    return `${number.toFixed(1)}/10`;
};


const formatDate = (date) => {
    if (!date) {
        return "Unknown";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
        return "Unknown";
    }

    return formattedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};


const getMovieYear = (date) => {
    if (!date) {
        return "Unknown";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
        return "Unknown";
    }

    return formattedDate.getFullYear();
};


export {
    formatRating,
    formatDate,
    getMovieYear
};