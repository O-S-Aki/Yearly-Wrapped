import React from 'react';
import { Link } from 'react-router-dom';

import type { IDay, IMood } from '../../lib/interfaces';

import './dayDetails.css';
import MoodSelect from '../moodSelect/MoodSelect';

interface DayDetailsProps {
  day: IDay | null;
  moods: IMood[];
}

const Day: React.FC<DayDetailsProps> = ({ day, moods }) => {

  return (
    <>
      <div className="app-component day-details d-flex flex-column w-100">
        <div className="day-section-container py-3">
          <MoodSelect moods={moods} selectedMood={day?.mood ?? null} editable={false} />
        </div>

        <div className="day-section-container mt-2 py-2">
          <h6 className="mb-2 detail-section-title color-primary">Summary</h6>
          <p className="m">{day?.note ?? 'No summary has been recorded for this day.'}</p>
        </div>

        <div className="py-2 mt-2">
          <h6 className="mb-2 detail-section-title color-primary">Song of the Day</h6>
          <div className="d-flex flex-row align-items-center gap-3">
            {
              day?.song ? (
                <>
                  <Link to={day.song.url} target="_blank">
                    <div className="song-image-container background-tertiary d-flex align-items-center justify-content-center">
                      <i className="bi bi-music-note-beamed song-play-button color-primary"></i>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <div className="song-image-container no-link background-tertiary d-flex align-items-center justify-content-center">
                    <i className="bi bi-music-note-beamed song-play-button color-primary"></i>
                  </div>
                </>)
            }
            <div className='d-flex flex-column'>
              <p className="m-0 song-of-the-day-title color-primary">{day?.song?.name ?? '-'}</p>
              <p className="m-0 song-of-the-day-artist color-primary">{day?.song?.artist ?? '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Day