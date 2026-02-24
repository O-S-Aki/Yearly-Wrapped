import React from 'react';

import { getDayCountByMood } from '../../lib/calendar/getDayCountByMood';
import type { IMood, ISimpleDay } from '../../lib/interfaces';

import './year.css';
import MoodCard from '../moodCard/MoodCard';
import { useIsMobile } from '../../hooks';

interface YearProps {
  days: ISimpleDay[];
  moods: IMood[];
}

const Year: React.FC<YearProps> = ({ days, moods }) => {
  const isMobile = useIsMobile();

  const moodCounts = moods.map(mood => ({
    mood,
    count: getDayCountByMood(days, mood)
  }));

const maxCount = Math.max(...moodCounts.map(m => m.count), 1);
  return (
    <>
      <div className={`app-component d-flex py-2 flex-column ${isMobile ? 'text-center' : ''}`}>
        <div className="year-title-container pb-3">
          <h3 className='year-title m-0'>Year Summary</h3>
        </div>
        <p className="mt-3 mb-0">
          A record of the ratings given to each day over the course of the year so far.
        </p>

        <div className="w-100 mood-graph-container mt-2">
          <div className="w-100 mood-graph background-background p-2 d-flex flex-column gap-1">
            {
              moodCounts.map(({ mood, count }) => (
                <div className="d-flex flex-row" key={mood.label}>
                  <div className={`mood-graph-bar background-${mood.label.toLowerCase()}`}
                    style={{ width: `${Math.min(100, Math.max(1, (count / maxCount) * 100))}%`}}></div>
                  <p className="mb-0 ms-2 color-primary">{`${((count / days.length) * 100).toFixed(0)}`}%</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Year