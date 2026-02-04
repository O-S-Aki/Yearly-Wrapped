import React from 'react';

import { useDayDetails } from '../../hooks';
import { DayDetails } from '..'; 

import { testUpsertDay, testUpsertSong } from '../../lib/calendar/testUpsert';

import type { ICalendarState } from '../../lib/interfaces';

import './day.css';

interface PageProps {
  calendarState: ICalendarState
}

const Day: React.FC<PageProps> = ({ calendarState }) => {
  const { day } = useDayDetails(calendarState.selectedIsoDate);
  const date: Date = calendarState.selectedDate;
  
  const handleUpsertDay = async () => {
    await testUpsertDay(calendarState.selectedIsoDate);
  };

  const handleUpsertSong = async () => {
    await testUpsertSong(calendarState.selectedIsoDate);
  };

  return (
    <>
      <div className="app-component day-container p-3 d-flex flex-column align-items-start">
        <div className="day-title-container pb-3 w-100">
          <h2 className='m-0 w-100 day-full-date'>{date.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})}</h2>
        </div>
        <div className="day-details-container">
          <DayDetails day={day} />
        </div>

        <div className="py-3 mt-2 edit-day-button-container">
          <button className="btn edit-day-button background-tertiary color-primary" onClick={handleUpsertDay}>
            {day ? 'Edit Day' : 'Record Day'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Day