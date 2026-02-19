import React from 'react';

import type { ICalendarDay } from '../../lib/interfaces';

import './dayCell.css';

interface DayCellProps {
  day: ICalendarDay
}

const DayCell: React.FC<DayCellProps> = ({ day }) => {

  return (
    <>
      {
        day ? (
          <>
            <div className={`day-cell py-1`}>
              <h6 className={`date text-center m-0 prevent-select ${day.isCurrentMonth ? '' : 'color-secondary'}`}>{day.dayNumber}</h6>
            </div>
            {
              day.entry?.mood ? (
                <>
                  <div className="mood-indicator d-flex flex-column">
                    <i className={`bi bi-circle-fill color-${day.entry.mood.label.toLowerCase()}`}></i>
                  </div>
                </>) : (<></>)
            }
          </>) : (<></>)
      }
    </>
  )
}

export default DayCell