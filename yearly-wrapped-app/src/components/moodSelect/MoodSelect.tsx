import React from 'react'

import type { IMood } from '../../lib/interfaces';

import './moodSelect.css';

interface MoodSelectProps {
  moods: IMood[];
  selectedMood: IMood | null;
  onSelectMood: (mood: IMood) => void;
}

const MoodSelect: React.FC<MoodSelectProps> = ({ moods, selectedMood, onSelectMood }) => {
  return (
    <div className="mood-select-container d-flex flex-row align-items-center gap-2">
      {
        moods.map((mood) => (
          <div key={mood.id} className={`mood-option p-2 d-flex flex-column align-items-center gap-2 ${selectedMood?.id == mood.id ? 'selected' : ''}`} onClick={() => onSelectMood(mood)}>
            <button className={`mood-option-button background-${mood.label.toLowerCase()}`}></button>
            <h6 className="mood-option-label m-0">{mood.label}</h6>
          </div>
        ))
      }
    </div>
  )
}

export default MoodSelect