import React from 'react';

import { useDayDetails } from '../../hooks';

import type { ICalendarState } from '../../lib/interfaces';

import './day.css';

interface PageProps {
  calendarState: ICalendarState
}

const Day: React.FC<PageProps> = ({ calendarState }) => {
  const { day } = useDayDetails(calendarState.selectedIsoDate);
  const date: Date = calendarState.selectedDate;
  
  return (
    <>
      <div className="app-component p-3 d-flex flex-column align-items-start">
        <div className="day-title-container pb-3 w-100">
          <h2 className='m-0 w-100 day-full-date'>{date.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})}</h2>
        </div>
        <div className="day-details-container mt-3">
          <div>Hello</div>
        </div>
      </div>
    </>
  )
}

export default Day