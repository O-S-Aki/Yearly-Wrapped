import React, { useEffect } from 'react';

import { useState } from 'react';

import { useDayDetails, useMoods } from '../../hooks';
import { DayDetails, RecordDayModal } from '..'; 

import { formatDate } from '../../lib/calendar/util';

import type { ICalendarState, IMood } from '../../lib/interfaces';

import './day.css';

interface DayProps {
  calendarState: ICalendarState
}

const Day: React.FC<DayProps> = ({ calendarState }) => {
  const isoDate: string = calendarState.selectedIsoDate;
  
  const { day, refreshDayDetails } = useDayDetails(isoDate);
  const { moods } = useMoods();
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<IMood | null>(day ? day.mood : null);
  
  const handleSelectMood = (mood: IMood) => {
    setSelectedMood(mood);
  }

  const handleCloseModal = () => {
    setSelectedMood(day ? day.mood : null);
    refreshDayDetails(isoDate);
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (day && day.mood) {
      setSelectedMood(day.mood);
    } 
    else {
      setSelectedMood(null);
    }
  }, [day]);

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

        <RecordDayModal isOpen={isModalOpen} date={isoDate} initialDay={day} moods={moods} selectedMood={selectedMood} onClose={() => handleCloseModal()} onSelectMood={handleSelectMood} />
      </div>
    </>
  )
}

export default Day