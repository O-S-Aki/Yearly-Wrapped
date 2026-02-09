import React from 'react';

import { useMoods } from '../../hooks';
import { DayDetails, RecordDayModal } from '..'; 

import { formatDate } from '../../lib/calendar/util';

import type { ICalendarState, IDay, IDayRecordState, IMood } from '../../lib/interfaces';

import './day.css';

interface DayProps {
  calendarState: ICalendarState;
  day: IDay | null;
  isModalOpen: boolean;
  selectedMood: IMood | null;
  onSelectMood: (mood: IMood) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onRecordDay: (dayRecordState: IDayRecordState, mood: IMood | null) => void;
}

const Day: React.FC<DayProps> = ({ calendarState, day, isModalOpen, selectedMood, onSelectMood, onOpenModal, onCloseModal, onRecordDay }) => {
  const isoDate: string = calendarState.selectedIsoDate;
  const { moods } = useMoods();
  
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
            <button className="btn edit-day-button background-tertiary color-primary" onClick={() => onOpenModal()}>
              {day ? 'Edit Day' : 'Record Day'}
            </button>
          </div>
        </div>

        <RecordDayModal isOpen={isModalOpen} date={isoDate} initialDay={day} moods={moods} selectedMood={selectedMood} onClose={() => onCloseModal()} onSelectMood={onSelectMood} onRecordDay={onRecordDay} />
      </div>
    </>
  )
}

export default Day