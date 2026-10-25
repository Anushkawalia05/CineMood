import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import MovieGrid from "../components/MovieGrid";
import useMovies from "../hooks/useMovies";
import { useLibrary } from "../hooks/useLibrary";
import { moodMap } from "../utils/moodMap";
import Icon from "../components/Icon";
import "../styles/home.css";
import "../styles/movie.css";
import "../styles/mood-match.css";

const energeticGenres = ["Action", "Adventure", "Thriller", "Science Fiction"];
const gentleGenres = ["Drama", "Romance", "Family"];
const timeChoices = [
  { label: "Any length", value: "any" },
  { label: "Under 90 min", value: "90" },
  { label: "Under 2 hours", value: "120" },
  { label: "Under 2.5 hours", value: "150" }
];
const moodIcons = { Happy: "sun", Sad: "moon", Romantic: "heart", Excited: "bolt", Angry: "bolt", Relaxed: "calm" };

function getEnergyFit(movie, energy) {
  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
  const normalized = genres.map((genre) => genre?.toLowerCase());
  const energetic = energeticGenres.some((genre) => normalized.includes(genre.toLowerCase()));
  const gentle = gentleGenres.some((genre) => normalized.includes(genre.toLowerCase()));
  const movieEnergy = energetic ? 5 : gentle ? 2 : 3;
  return 5 - Math.abs(movieEnergy - energy);
}

function MoodMatch() {
  const navigate = useNavigate();
  const { movies, loading, error } = useMovies("");
  const { favoriteIds, watchlistIds, toggleFavorite, toggleWatchlist } = useLibrary();
  const [mood, setMood] = useState("Happy");
  const [energy, setEnergy] = useState(3);
  const [timeLimit, setTimeLimit] = useState("any");

  const recommendations = useMemo(() => {
    const allowedGenres = moodMap[mood] || [];

    return movies
      .filter((movie) => {
        const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
        const moodFits = genres.some((genre) =>
          allowedGenres.some((allowed) => allowed.toLowerCase() === genre?.toLowerCase())
        );
        const timeFits = timeLimit === "any" || (movie.runtime && movie.runtime <= Number(timeLimit));
        return moodFits && timeFits;
      })
      .sort((first, second) =>
        getEnergyFit(second, energy) - getEnergyFit(first, energy) ||
        Number(second.rating || 0) - Number(first.rating || 0)
      );
  }, [movies, mood, energy, timeLimit]);

  const getMatchReason = (movie) => {
    const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
    const matchingGenres = genres.filter((genre) =>
      moodMap[mood]?.some((allowed) => allowed.toLowerCase() === genre?.toLowerCase())
    );
    const genreText = matchingGenres.length > 1
      ? `${matchingGenres.slice(0, -1).join(", ")} and ${matchingGenres.at(-1)}`
      : matchingGenres[0];
    const pace = getEnergyFit(movie, energy) >= 4
      ? "its pace is close to your energy level"
      : "it offers a moderate pace";
    const runtime = movie.runtime ? `${movie.runtime} min` : "runtime not listed";
    return `${genreText} fits your ${mood.toLowerCase()} mood; ${pace} (${energy}/5); ${runtime}.`;
  };

  return (
    <main className="mood-match-page">
      <section className="mood-match-intro">
        <p className="home-section-kicker">CineMood signature feature</p>
        <h1>Build your <span>mood match</span></h1>
        <p>Choose the feeling, energy, and time you have. We’ll show how each pick fits.</p>
      </section>

      <section className="mood-match-panel" aria-labelledby="mood-choice-title">
        <div className="mood-match-step-heading">
          <span className="mood-match-step">01</span>
          <div>
            <h2 id="mood-choice-title">What are you feeling?</h2>
            <p>Choose the mood you want your movie to match.</p>
          </div>
        </div>
        <div className="mood-match-options" role="group" aria-label="Choose a mood">
          {Object.keys(moodMap).map((option) => (
            <button
              key={option}
              type="button"
              className={`mood-match-option mood-${option.toLowerCase()} ${mood === option ? "is-selected" : ""}`}
              aria-pressed={mood === option}
              onClick={() => setMood(option)}
            >
              <Icon name={moodIcons[option]} size={17} /> {option}
            </button>
          ))}
        </div>

        <div className="mood-match-inputs">
          <label className="mood-match-range" htmlFor="energy-level">
            <span>
              <strong>Energy level</strong>
              <small>Low-key to high-energy</small>
            </span>
            <span className="mood-match-value">{energy}/5</span>
            <input
              id="energy-level"
              type="range"
              min="1"
              max="5"
              value={energy}
              onChange={(event) => setEnergy(Number(event.target.value))}
            />
          </label>

          <label className="mood-match-time" htmlFor="time-limit">
            <strong className="filter-label"><Icon name="clock" size={15} /> Time available</strong>
            <small>Keep recommendations realistic for tonight.</small>
            <select id="time-limit" value={timeLimit} onChange={(event) => setTimeLimit(event.target.value)}>
              {timeChoices.map((choice) => (
                <option key={choice.value} value={choice.value}>{choice.label}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="mood-match-results" aria-live="polite" aria-labelledby="match-results-title">
        <div className="home-section-heading">
          <div>
            <p className="home-section-kicker">Your recipe: {mood} · energy {energy}/5</p>
            <h2 id="match-results-title">Movies for this moment</h2>
          </div>
          <p className="mood-match-count">{recommendations.length} matches</p>
        </div>
        {loading && <Loading message="Finding movies for your mood..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && recommendations.length > 0 && (
          <MovieGrid
            movies={recommendations}
            onMovieClick={(movie) => navigate(`/movie/${movie.id}`)}
            matchReasonForMovie={getMatchReason}
            onFavorite={toggleFavorite}
            favorites={favoriteIds}
            onWatchlist={toggleWatchlist}
            watchlist={watchlistIds}
          />
        )}
        {!loading && !error && recommendations.length === 0 && (
          <div className="no-movies">
            <h2>No matches with those choices yet</h2>
            <p>Try a longer time limit or a different mood.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default MoodMatch;
