import React from 'react';

import { useState } from 'react';

import { useDayDetails, useMoods } from '../../hooks';
import { DayDetails, RecordDayModal } from '..'; 

import { testUpsertDay } from '../../lib/calendar/testUpsert';
import { formatDate } from '../../lib/calendar/util';

import type { ICalendarState } from '../../lib/interfaces';

import './day.css';

interface DayProps {
  calendarState: ICalendarState
}

const Day: React.FC<DayProps> = ({ calendarState }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isoDate: string = calendarState.selectedIsoDate;
  
  const { day } = useDayDetails(isoDate);
  const { moods } = useMoods();

  const handleUpsertDay = async () => {
    await testUpsertDay(isoDate);
  };

  return (
    <>
      <div className="app-component day-container">
        <div className="p-3 d-flex flex-column align-items-start">
          <div className="day-title-container pb-3 w-100">
            <h2 className='m-0 w-100 day-full-date'>{formatDate(isoDate)}</h2>
          </div>
          <div className="day-details-container">
            <DayDetails day={day} />
          </div>

          <div className="py-3 mt-2 edit-day-button-container">
            <button className="btn edit-day-button background-tertiary color-primary" onClick={() => setIsModalOpen(true)}>
              {day ? 'Edit Day' : 'Record Day'}
            </button>
          </div>
        </div>

        <RecordDayModal isOpen={isModalOpen} date={isoDate} initialDay={day} moods={moods} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  )
}

export default Day