import React, { useState } from "react";
import "../styles/home.css";

function SearchBar({
  onSearch,
  placeholder = "Search for a movie..."
}) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(searchText.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <span className="search-icon">⌕</span>

        <input
          id="movie-search"
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />

        <button type="submit" className="search-button">
          <span>⌕</span>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;