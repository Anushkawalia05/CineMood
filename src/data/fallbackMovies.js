const fallbackMovies = [
    {
        id: 1,
        title: "The Dark Knight",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 9.0,
        runtime: 152,
        genre: ["Action", "Drama", "Crime"],
        year: 2008,
        overview:
            "Batman faces a criminal mastermind who creates chaos and challenges Gotham City's heroes."
    },

    {
        id: 2,
        title: "Inception",
        poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        rating: 8.8,
        runtime: 148,
        genre: ["Action", "Science Fiction", "Thriller"],
        year: 2010,
        overview:
            "A skilled thief who enters people's dreams is given a chance to erase his past by completing an unusual mission."
    },

    {
        id: 3,
        title: "Toy Story",
        poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
        rating: 8.0,
        runtime: 81,
        genre: ["Animation", "Comedy", "Family"],
        year: 1995,
        overview:
            "A group of toys comes to life when humans are not around, but their friendship is tested when a new toy arrives."
    },

    {
        id: 4,
        title: "Titanic",
        poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        rating: 7.9,
        runtime: 195,
        genre: ["Drama", "Romance"],
        year: 1997,
        overview:
            "Two people from different social backgrounds fall in love during the ill-fated voyage of the Titanic."
    },

    {
        id: 5,
        title: "The Hangover",
        poster: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg",
        rating: 7.7,
        runtime: 100,
        genre: ["Comedy"],
        year: 2009,
        overview:
            "Three friends wake up after a wild night in Las Vegas and try to figure out what happened before the wedding."
    },

    {
        id: 6,
        title: "Avengers: Endgame",
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        rating: 8.3,
        runtime: 181,
        genre: ["Action", "Adventure", "Science Fiction"],
        year: 2019,
        overview:
            "The remaining Avengers attempt to undo the devastating events caused by Thanos."
    },

    {
        id: 7,
        title: "The Notebook",
        poster: "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
        rating: 7.8,
        runtime: 123,
        genre: ["Romance", "Drama"],
        year: 2004,
        overview:
            "A passionate love story follows two people whose relationship survives separation and difficult circumstances."
    },

    {
        id: 8,
        title: "Inside Out",
        poster: "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
        rating: 8.1,
        runtime: 95,
        genre: ["Animation", "Comedy", "Family"],
        year: 2015,
        overview:
            "Inside the mind of a young girl, her emotions work together as she adjusts to a major change in her life."
    },

    {
        id: 9,
        title: "John Wick",
        poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
        rating: 7.4,
        runtime: 101,
        genre: ["Action", "Thriller"],
        year: 2014,
        overview:
            "A retired assassin returns to his dangerous former life after an event forces him back into action."
    },

    {
        id: 10,
        title: "The Pursuit of Happyness",
        poster: "https://image.tmdb.org/t/p/w500/lBYOKAMcxIvuk9s9hMuecB9dPBV.jpg",
        rating: 8.0,
        runtime: 117,
        genre: ["Drama"],
        year: 2006,
        overview:
            "A struggling father works to build a better life for himself and his young son despite difficult circumstances."
    },
    {
        id: 11,
        title: "Interstellar",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        rating: 8.7,
        runtime: 169,
        genre: ["Science Fiction", "Adventure", "Drama"],
        year: 2014,
        overview: "A team travels beyond this galaxy to discover whether mankind has a future among the stars."
    },
    {
        id: 12,
        title: "Parasite",
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        rating: 8.5,
        runtime: 133,
        genre: ["Thriller", "Drama", "Comedy"],
        year: 2019,
        overview: "A poor family finds its way into the lives of a wealthy household, with unexpected consequences."
    },
    {
        id: 13,
        title: "Spider-Man: Into the Spider-Verse",
        poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        rating: 8.4,
        runtime: 117,
        genre: ["Animation", "Action", "Adventure", "Science Fiction"],
        year: 2018,
        overview: "Miles Morales discovers what it means to be Spider-Man when heroes from other dimensions arrive."
    },
    {
        id: 14,
        title: "Coco",
        poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
        rating: 8.4,
        runtime: 105,
        genre: ["Animation", "Family", "Fantasy", "Music"],
        year: 2017,
        overview: "A young musician journeys to the Land of the Dead to uncover his family's story."
    },
    {
        id: 15,
        title: "Finding Nemo",
        poster: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
        rating: 8.2,
        runtime: 100,
        genre: ["Animation", "Adventure", "Family", "Comedy"],
        year: 2003,
        overview: "A cautious clownfish crosses the ocean with an unforgettable companion to find his missing son."
    },
    {
        id: 16,
        title: "Spirited Away",
        poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        rating: 8.5,
        runtime: 125,
        genre: ["Animation", "Fantasy", "Adventure", "Family"],
        year: 2001,
        overview: "A girl enters a mysterious spirit world and must find courage to free her parents and return home."
    },
    {
        id: 17,
        title: "La La Land",
        poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        rating: 8.0,
        runtime: 129,
        genre: ["Romance", "Drama", "Music", "Comedy"],
        year: 2016,
        overview: "An aspiring actor and a jazz musician fall in love while pursuing their dreams in Los Angeles."
    },
    {
        id: 18,
        title: "Get Out",
        poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
        rating: 7.6,
        runtime: 104,
        genre: ["Horror", "Thriller", "Mystery"],
        year: 2017,
        overview: "A weekend visit to meet his girlfriend's family turns into a disturbing mystery."
    },
    {
        id: 19,
        title: "Knives Out",
        poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
        rating: 7.9,
        runtime: 131,
        genre: ["Mystery", "Comedy", "Crime", "Drama"],
        year: 2019,
        overview: "A detective investigates a novelist's death, finding that every member of the family has a secret."
    },
    {
        id: 20,
        title: "Everything Everywhere All at Once",
        poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
        rating: 7.8,
        runtime: 140,
        genre: ["Science Fiction", "Adventure", "Action", "Comedy"],
        year: 2022,
        overview: "An overwhelmed laundromat owner discovers she may be the key to saving the multiverse."
    },
    {
        id: 21,
        title: "The Grand Budapest Hotel",
        poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
        rating: 8.1,
        runtime: 100,
        genre: ["Comedy", "Adventure", "Crime"],
        year: 2014,
        overview: "A hotel concierge and his protégé become tangled in a stolen painting and a family fortune."
    },
    {
        id: 22,
        title: "The Truman Show",
        poster: "https://image.tmdb.org/t/p/w500/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
        rating: 8.1,
        runtime: 103,
        genre: ["Comedy", "Drama", "Science Fiction"],
        year: 1998,
        overview: "A cheerful man begins to suspect that his picture-perfect life is being watched by the world."
    },
    {
        id: 23,
        title: "The Social Network",
        poster: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
        rating: 7.7,
        runtime: 120,
        genre: ["Drama", "History", "Biography"],
        year: 2010,
        overview: "A college project grows into a global social network and changes the lives of its creators."
    },
    {
        id: 24,
        title: "Pride & Prejudice",
        poster: "https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg",
        rating: 7.8,
        runtime: 127,
        genre: ["Romance", "Drama"],
        year: 2005,
        overview: "Elizabeth Bennet and Mr. Darcy navigate first impressions, family expectations, and growing affection."
    },
    {
        id: 25,
        title: "A Quiet Place",
        poster: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
        rating: 7.4,
        runtime: 90,
        genre: ["Horror", "Thriller", "Science Fiction"],
        year: 2018,
        overview: "A family must live in silence to survive in a world hunted by creatures that hear everything."
    },
    {
        id: 26,
        title: "The Princess Bride",
        poster: "https://image.tmdb.org/t/p/w500/dvjqlp2sAhUeFjUOfQDgqwpphHj.jpg",
        rating: 8.0,
        runtime: 98,
        genre: ["Adventure", "Comedy", "Fantasy", "Romance"],
        year: 1987,
        overview: "A farmhand sets off on a witty, swashbuckling quest to reunite with his true love."
    },
    {
        id: 27,
        title: "Whiplash",
        poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
        rating: 8.5,
        runtime: 107,
        genre: ["Drama", "Music"],
        year: 2014,
        overview: "A driven young drummer pushes himself to the limit under the demanding eye of a conductor."
    },
    {
        id: 28,
        title: "The Conjuring",
        poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
        rating: 7.5,
        runtime: 112,
        genre: ["Horror", "Thriller"],
        year: 2013,
        overview: "Paranormal investigators help a family facing a dark presence in their farmhouse."
    },
    {
        id: 29,
        title: "Paddington 2",
        poster: "https://image.tmdb.org/t/p/w500/1OJ9vkD5xPt3skC6KguyXAgagRZ.jpg",
        rating: 7.8,
        runtime: 104,
        genre: ["Adventure", "Comedy", "Family"],
        year: 2017,
        overview: "Paddington takes on a mystery to restore a special present and bring his community together."
    },
    {
        id: 30,
        title: "The Martian",
        poster: "https://image.tmdb.org/t/p/w500/3ndAx3weG6KDkJIRMCi5vXX6Dyb.jpg",
        rating: 8.0,
        runtime: 141,
        genre: ["Science Fiction", "Adventure", "Drama"],
        year: 2015,
        overview: "An astronaut stranded on Mars uses science, ingenuity, and humor to survive until rescue."
    },
    {
        id: 31,
        title: "Saving Private Ryan",
        poster: "https://image.tmdb.org/t/p/w500/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg",
        rating: 8.2,
        runtime: 169,
        genre: ["War", "Drama", "History"],
        year: 1998,
        overview: "A squad of soldiers crosses wartime France on a mission to bring one soldier home."
    },
    {
        id: 32,
        title: "Django Unchained",
        poster: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg",
        rating: 8.2,
        runtime: 165,
        genre: ["Western", "Drama", "Action"],
        year: 2012,
        overview: "A freed man and a bounty hunter travel across the American South to reunite him with his wife."
    },
    {
        id: 33,
        title: "Creed",
        poster: "https://image.tmdb.org/t/p/w500/1BfTsk5VWuw8FCocAhCyqnRbEzq.jpg",
        rating: 7.4,
        runtime: 133,
        genre: ["Sport", "Drama"],
        year: 2015,
        overview: "A young boxer trains with a retired champion while trying to build a legacy of his own."
    },
    {
        id: 34,
        title: "13th",
        poster: "https://image.tmdb.org/t/p/w500/tcKNWD6IFPPsvkpvyZ548naz0is.jpg",
        rating: 8.2,
        runtime: 100,
        genre: ["Documentary", "History"],
        year: 2016,
        overview: "A documentary examines the history of racial inequality and the US prison system."
    }
];

export default fallbackMovies;
