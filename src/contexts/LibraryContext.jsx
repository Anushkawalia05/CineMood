import { useEffect, useMemo, useState } from "react";
import { LibraryContext } from "./library";
import { getData, saveData } from "../utils/storage";

function readIds(key, legacyKey) {
  const stored = getData(key, null);
  const ids = stored ?? getData(legacyKey, []);
  return Array.isArray(ids) ? ids : [];
}

export function LibraryProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => readIds("cinemood:favorites", "favorites"));
  const [watchlistIds, setWatchlistIds] = useState(() => readIds("cinemood:watchlist", "watchlist"));
  const [notice, setNotice] = useState(null);

  useEffect(() => { saveData("cinemood:favorites", favoriteIds); }, [favoriteIds]);
  useEffect(() => { saveData("cinemood:watchlist", watchlistIds); }, [watchlistIds]);

  const value = useMemo(() => ({
    favoriteIds,
    watchlistIds,
    toggleFavorite(movie) {
      const previousIds = favoriteIds;
      const removing = previousIds.includes(movie.id);
      setFavoriteIds((current) => removing ? current.filter((id) => id !== movie.id) : [...current, movie.id]);
      setNotice({ text: removing ? `Removed ${movie.title} from favorites` : `Saved ${movie.title} to favorites`, undo: () => setFavoriteIds(previousIds) });
    },
    toggleWatchlist(movie) {
      const previousIds = watchlistIds;
      const removing = previousIds.includes(movie.id);
      setWatchlistIds((current) => removing ? current.filter((id) => id !== movie.id) : [...current, movie.id]);
      setNotice({ text: removing ? `Removed ${movie.title} from Watch later` : `Added ${movie.title} to Watch later`, undo: () => setWatchlistIds(previousIds) });
    }
  }), [favoriteIds, watchlistIds]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return <LibraryContext.Provider value={value}>{children}{notice && <div className="library-toast" role="status" aria-live="polite"><span>{notice.text}</span><button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); notice.undo(); setNotice(null); }}>Undo</button><button type="button" className="library-toast-close" aria-label="Dismiss notification" onClick={(event) => { event.stopPropagation(); setNotice(null); }}>×</button></div>}</LibraryContext.Provider>;
}
