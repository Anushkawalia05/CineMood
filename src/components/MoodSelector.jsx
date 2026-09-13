import React, { useState } from "react";
import MoodCard from "./MoodCard";

const moods = [
  {
    id: 1,
    name: "Happy",
    emoji: "😊",
    description: "Feel-good movies to brighten your day."
  },
  {
    id: 2,
    name: "Sad",
    emoji: "😢",
    description: "Emotional movies for a quiet mood."
  },
  {
    id: 3,
    name: "Chill",
    emoji: "😌",
    description: "Relaxing movies for a laid-back mood."
  },
  {
    id: 4,
    name: "Excited",
    emoji: "🤩",
    description: "Fun and energetic movies full of excitement."
  },
  {
    id: 5,
    name: "Scared",
    emoji: "😱",
    description: "Thrilling movies for an adrenaline rush."
  },
  {
    id: 6,
    name: "Romantic",
    emoji: "❤️",
    description: "Love stories for a romantic mood."
  }
];

function MoodSelector({ onMoodSelect }) {
  const [selectedMood, setSelectedMood] = useState("");

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);

    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };

  return (
    <section className="mood-selector" aria-labelledby="mood-heading">
      <h2 id="mood-heading">What's your mood?</h2>

      <div className="mood-grid">
        {moods.map((mood) => (
          <MoodCard
            key={mood.id}
            name={mood.name}
            emoji={mood.emoji}
            description={mood.description}
            selected={selectedMood === mood.name}
            onSelect={handleMoodSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default MoodSelector;
