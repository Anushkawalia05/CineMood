import React from "react";
import "../styles/mood.css";

function MoodCard({
  name,
  emoji,
  description,
  onSelect,
  selected = false
}) {
  return (
    <button
      className={`mood-card ${selected ? "mood-card-selected" : ""}`}
      onClick={() => onSelect(name)}
      type="button"
      aria-pressed={selected}
    >
      <span className="mood-card-emoji" aria-hidden="true">
        {emoji}
      </span>

      <h3 className="mood-card-title">{name}</h3>

      <p className="mood-card-description">
        {description}
      </p>
    </button>
  );
}

export default MoodCard;
