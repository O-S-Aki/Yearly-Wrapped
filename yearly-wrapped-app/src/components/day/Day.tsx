import React from 'react';

import { DayDetails, RecordDayModal } from '..'; 
import { formatDate } from '../../lib/calendar/util';

import type { IDayComponentState, IDayRecordState, IMood } from '../../lib/interfaces';

import './day.css';

interface DayProps {
  isoDate: string;
  state: IDayComponentState;
  moods: IMood[];
  onSave: (dayRecordState: IDayRecordState, mood: IMood | null) => void;
}

const Day: React.FC<DayProps> = ({ isoDate, state, moods, onSave }) => {
  
  return (
    <>
      <div className="app-component day-container w-100">
        <div className="pt-3 ps-1 d-flex flex-column align-items-start">
          <div className="day-title-container pb-3 w-100 d-flex flex-row align-items-center gap-3">
            <h3 className='m-0 day-full-date'>{formatDate(isoDate)}</h3>
            <div className="edit-day-button-container">
              <button className="btn edit-day-button background-tertiary color-primary" onClick={() => state.openModal()}>
                <i className="bi bi-pencil-fill"></i>
              </button>
            </div>
          </div>
          <div className="day-details-container w-100">
            <DayDetails day={state.day} moods={moods} />
          </div>
        </div>

        <RecordDayModal isoDate={isoDate} dayComponentState={state} moods={moods} onSave={onSave} />
      </div>
    </>
  )
}

export default Day