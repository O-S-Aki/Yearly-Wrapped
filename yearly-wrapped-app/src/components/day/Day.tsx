import React from 'react';

import type { ICalendarState } from '../../lib/interfaces';

import './day.css';

interface PageProps {
  calendarState: ICalendarState
}

const Day: React.FC<PageProps> = ({ calendarState }) => {
  return (
    <>
      <div className="app-component">
        <p className='m-0'>Selected Date: {calendarState.selectedDate.toDateString()}</p>
      </div>
    </>
  )
}

export default Day