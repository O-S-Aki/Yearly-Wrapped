import React from 'react';

import { getDayCountByMood } from '../../lib/calendar/getDayCountByMood';
import type { IMood, ISimpleDay } from '../../lib/interfaces';

import './year.css';
import MoodCard from '../moodCard/MoodCard';

interface YearProps {
  days: ISimpleDay[];
  moods: IMood[];
}

const Year: React.FC<YearProps> = ({ days, moods }) => {

  return (
    <>
      <div className="app-component d-flex py-2 flex-column">
        <div className="year-title-container pb-3">
          <h2 className='year-title m-0'>Year so Far</h2>
        </div>
        <p className="mt-3 mb-0">
          A record of the ratings that you have given to each day over the course of the year so far.
        </p>
        <div className="mood-card-container mt-3 d-flex flex-row align-items-center justify-content-start gap-4">
          {
            moods.map(mood => (
              <MoodCard key={mood.label} mood={mood} dayCount={getDayCountByMood(days, mood)} totalDays={days.length} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Year