# CineMood

CineMood is a React movie-discovery project. It helps someone choose a film based on their mood, preferred energy, genre, and available time, then keep a favorites shelf or a watch-later list.

## Run it

```bash
npm install
npm run dev
```

Open the local URL Vite prints. `npm run build` creates a production build; `npm run lint` checks the source.

## What works

- **Home:** product introduction, mood shortcuts, featured films.
- **Discover:** search the bundled catalog; filter by mood and genre; sort by rating, year, or runtime. Filter state is kept in the URL so a result view can be bookmarked or shared.
- **Mood Match:** choose a mood, energy level, and runtime limit. Movies are filtered by mood genres, ranked by genre-based energy fit, then rating; each card explains its match.
- **Movie details:** title, year, runtime, genres, score, synopsis, and save actions.
- **Favorites and Watch Later:** separate shelves that update across pages and persist in this browser.
- **Sign up and Sign in:** local classroom demo accounts. A password is PBKDF2-hashed in the browser and is never sent to a server. This is not production authentication: account data is local to this browser and has no server-side protection or cross-device sync. Never use a real password here.
- **About & Credits:** explains the discovery concept and credits TMDB as the source of the curated movie metadata and poster images. The site links to TMDB and does not host or stream films.
- **Feedback:** stores submitted feedback locally in this browser.
- **Responsive UI:** compact layouts, keyboard-visible focus, labels for form controls, and reduced-motion handling for the main interactive sections.

## Data and account limits

The catalog is a bundled educational sample of 34 films across 20 genres. It does not fetch live movie data, current ratings, or streaming availability. The movie scores are static sample values. TMDB artwork and metadata remain subject to their owners' rights and applicable TMDB terms; this student project is not endorsed or certified by TMDB.

Favorites, watch-later entries, feedback, and demo accounts are browser-local. To use real accounts or sync across devices, connect a server-side authentication and database service; do not put production credentials or password verification in the browser.

## How the app is organized

- `src/pages/` contains route-level screens.
- `src/components/` contains reusable navigation, forms, cards, and loading/error states.
- `src/data/fallbackMovies.js` is the static demo catalog.
- `src/services/movieApi.js` searches the local catalog; the name marks the boundary that can later call a real API.
- `src/features/movies/moviesSlice.js` manages asynchronous catalog loading and error status with Redux Toolkit.
- `src/contexts/LibraryContext.jsx` shares favorites and watch-later state across the app (Context API).
- `src/contexts/AuthContext.jsx` shares the local demo sign-in state (Context API).
- `src/hooks/` contains reusable hooks for movies and app context.
- `src/utils/` contains filtering, formatting, browser storage, and local demo password hashing helpers.

## Recommendation logic to explain in a viva

1. `moodMap` maps a chosen feeling to suitable movie genres.
2. Mood Match removes titles that do not have one of those genres.
3. The runtime choice removes titles that exceed the user's time limit.
4. A simple genre heuristic estimates energy (action/adventure/thriller/science fiction = high; drama/romance/family = gentle; otherwise balanced).
5. Results are ranked by closeness to the chosen energy, with the static rating as a tie-breaker.

This is a transparent rule-based recommender, not machine learning. The genre and energy assumptions are product decisions the team should review, tune, and be ready to explain.
