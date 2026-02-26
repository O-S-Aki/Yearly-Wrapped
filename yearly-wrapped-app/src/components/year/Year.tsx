import React from 'react';

import { useIsMobile } from '../../hooks';

import { getDayCountByMood } from '../../lib/calendar/getDayCountByMood';
import { getWeekdayAverages } from '../../lib/calendar/getWeekdayAverages';

import type { IMood, ISimpleDay } from '../../lib/interfaces';

import './year.css';

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

  const { weekdays, highest, lowest } = getWeekdayAverages(days);

const maxCount = Math.max(...moodCounts.map(m => m.count), 1);
  return (
    <>
      <div className={`app-component d-flex pt-2 flex-column ${isMobile ? 'text-center' : ''}`}>

        <div className="year-title-container pb-3">
          <h3 className='year-title m-0'>Insights</h3>
        </div>

        <p className="mt-3 mb-0 text-smaller">
          Over the course of the year so far, you have submitted recordings for <span className='weight-600'>{days.length}</span> days. Here is a breakdown of how you have felt on average. 
        </p>
        <div className="w-100 mood-graph-container mt-3">
          <div className="w-100 mood-graph background-background color-primary p-3 d-flex flex-column gap-1">
            {
              moodCounts.map(({ mood, count }) => (
                <div className="d-flex flex-row align-items-center mood-graph-bar-container pb-1" key={mood.label}>
                  <div className={`mood-graph-bar background-${mood.label.toLowerCase()}`}
                    style={{ width: `${Math.min(100, Math.max(1, (count / maxCount) * 100))}%`}}></div>
                  <p className="mb-0 ms-2 text-smaller weight-500">{`${((count / days.length) * 100).toFixed(0)}`}%</p>
                </div>
              ))
            }
          </div>
        </div>
        
        <p className="mt-3 mb-0 text-smaller">
          Over the course of the year so far, the day of the week that you've felt the best has been <span className="weight-600">{highest.name}</span>, and the day that you've felt the worst has been <span className="weight-600">{lowest.name}</span>. Here is a breakdown of how you have found each day of the week on average.
        </p>
        <div className="w-100 weekday-graph-container mt-3">
          <div className="w-100 weekday-graph background-background color-primary p-3 d-flex flex-row justify-content-center align-items-end">
            {
              weekdays.map((day) => (
                <div className={`d-flex flex-column weekday-graph-bar-container align-items-center gap-1 ${day.name == highest.name ? 'highest' : ''} ${day.name == lowest.name ? 'lowest' : ''}`} key={day.shortName}>
                  <div className='d-flex flex-column align-items-center w-100 bar-circle-container'>
                    <div className="weekday-graph-circle"></div>
                    <div className={`weekday-graph-bar background-primary`} style={{height: `${Math.min(200, Math.max(2, Math.pow(day.moodScore / day.count, 1.8) * 275)).toFixed(0)}px`
                    }}></div>
                  </div>
                  <p className="m-0 weekday-graph-label text-smaller weight-500">{day.shortName.toUpperCase()}</p>
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