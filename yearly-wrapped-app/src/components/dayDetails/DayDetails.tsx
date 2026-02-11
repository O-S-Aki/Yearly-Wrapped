import React from 'react';
import { Link } from 'react-router-dom';

import type { IDay } from '../../lib/interfaces';

import './dayDetails.css';

interface DayDetailsProps {
  day: IDay | null;
}

const Day: React.FC<DayDetailsProps> = ({ day }) => {
  

  return (
    <>
      <div className="app-component day-details d-flex flex-column">
        {
          day ? (
            <>
              <div className="day-section-container py-3 mt-1">
                <h5 className="mb-2 detail-section-title color-primary">Rating</h5>
                <div className="d-flex flex-row gap-3 align-items-center">
                  <h3 className='m-0'><i className={`bi bi-circle-fill day-rating-icon color-${day.mood.label.toLowerCase()}`}></i></h3>
                  <div className="rating-details">
                    <p className="m-0"><span className="rating-description">{day.mood.label.toUpperCase()}</span> - {day.mood.description}</p>
                  </div>
                </div>
              </div>

              {
                day.song ? (
                <>
                  <div className="day-section-container py-3 mt-1">
                    <h5 className="mb-2 detail-section-title color-primary">Song of the Day</h5>
                    <div className="d-flex flex-row align-items-center gap-3">
                      <Link to={day.song.url} target="_blank">
                        <div className="song-image-container background-tertiary d-flex align-items-center justify-content-center">
                          <i className="bi bi-play-fill song-play-button color-primary"></i>
                        </div>
                      </Link>
                      <div className='d-flex flex-column'>
                        <h6 className="m-0 song-of-the-day-title color-primary">{day.song.name}</h6>
                        <p className="m-0 color-primary">{day.song.artist}</p>
                      </div>
                    </div>
                  </div>
                </>) : (<></>)
              }

              <div className="day-section-container py-3 mt-1">
                <h5 className="mb-2 detail-section-title color-primary">Summary</h5>
                <p className="m-0 color-primary">{day.note ?? 'No summary has been recorded for this day.'}</p>
              </div>

              
            </>):(
            <>
              <div className="day-section-container py-3">
                <p className="m-0 color-primary">No data has been recorded for this day.</p>
              </div>
            </>)
        }
      </div>
    </>
  )
}

export default Day