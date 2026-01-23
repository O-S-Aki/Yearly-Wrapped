import React from 'react';

import type { ICalendarDay } from '../../lib/interfaces';

import './monthCalendar.css';

interface PageProps {
  days: ICalendarDay[]
}

const MonthCalendar: React.FC<PageProps> = ({ days }) => {

  return (
    <>
      {
        days ? (
          <>
            {
              days.map((day, index) => (
                <p key={index}>{day.isoDate} - {day.entry?.mood.label}</p>
              ))
            }
          </>) : (<></>)
      }
    </>
  )
}

export default MonthCalendar