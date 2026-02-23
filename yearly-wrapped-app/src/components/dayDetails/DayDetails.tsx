import React from 'react';
import { Link } from 'react-router-dom';

import MoodSelect from '../moodSelect/MoodSelect';

import type { IDay, IMood } from '../../lib/interfaces';

import './dayDetails.css';

interface DayDetailsProps {
  day: IDay | null;
  moods: IMood[];
}

const Day: React.FC<DayDetailsProps> = ({ day, moods }) => {
  return (
    <>
      <div className="app-component day-details d-flex flex-column w-100">
        <div className={`day-section-container mt-2 py-3`}>
          <h6 className="detail-section-title m-0">Summary</h6>
          <p className="text-smaller m-0 color-accent">A note about what happened on this day</p>
          <p className="mb-0 mt-1">{day?.note ?? 'No note has been recorded for this day.'}</p>
        </div>

        <div className={`day-section-container py-3`}>
          <h6 className="detail-section-title m-0">Rating</h6>
          <p className="m-0 text-smaller color-accent">The color that best describes your day</p>
          <div className="d-flex flex-row justify-content-center">
            <MoodSelect moods={moods} selectedMood={day?.mood ?? null} editable={false} />
        </div>
        </div>

        <div className="day-section-container py-3">
          <h6 className="m-0 detail-section-title color-primary">Song of the Day</h6>
          <p className="text-smaller color-accent m-0">A song to link to this day</p>
          {
            day?.song?.name? (
            <>
              <div className="d-flex flex-row align-items-center mt-2 gap-3">
                {
                  day?.song?.url ? (
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
            </>) : (<><p className="mb-0 mt-1">No song has been recorded for this day.</p></>)
          }
        </div>
      </div>
    </>
  )
}

export default Day