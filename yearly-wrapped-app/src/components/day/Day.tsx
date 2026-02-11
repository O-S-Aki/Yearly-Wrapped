import React from 'react';

import { useMoods } from '../../hooks';
import { DayDetails, RecordDayModal } from '..'; 

import { formatDate } from '../../lib/calendar/util';

import type { IDayComponentState, IDayRecordState, IMood } from '../../lib/interfaces';

import './day.css';

interface DayProps {
  isoDate: string;
  state: IDayComponentState;
  onSave: (dayRecordState: IDayRecordState, mood: IMood | null) => void;
}

const Day: React.FC<DayProps> = ({ isoDate, state, onSave }) => {
  const { moods } = useMoods();
  
  return (
    <>
      <div className="app-component day-container">
        <div className="p-3 d-flex flex-column align-items-start">
          <div className="day-title-container pb-3 w-100">
            <h2 className='m-0 w-100 day-full-date'>{formatDate(isoDate)}</h2>
          </div>
          <div className="day-details-container">
            <DayDetails day={state.day} />
          </div>

          <div className="py-3 mt-2 edit-day-button-container">
            <button className="btn edit-day-button background-tertiary color-primary" onClick={() => state.openModal()}>
              {state.day ? 'Edit Day' : 'Record Day'}
            </button>
          </div>
        </div>

        <RecordDayModal isoDate={isoDate} dayComponentState={state} moods={moods} onSave={onSave} />
      </div>
    </>
  )
}

export default Day