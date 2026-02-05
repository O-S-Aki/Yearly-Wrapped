import React from 'react';

import type { IDay, IDayInput, IMood } from '../../lib/interfaces';

import './recordDayModal.css';
import { formatDate } from '../../lib/calendar/util';

interface RecordDayModalProps {
  isOpen: boolean;
  date: string;
  initialDay: IDay | null;
  moods: IMood[];
  onClose: () => void;
  //onSaveDay: (editedDay: IDayInput) => Promise<void>;
}

const RecordDayModal: React.FC<RecordDayModalProps> = ({ isOpen, date, initialDay, moods, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="app-component">
        <div className="modal-container">
          <div className="record-day-modal background-background p-4">
            <div className="record-day-modal-header day-title-container pb-3 d-flex flex-row justify-content-between align-items-start">
              <h3 className="m-0 day-full-date">{formatDate(date)}</h3>
              <h3 className="bi bi-x-square-fill m-0 color-primary close-modal" onClick={onClose}></h3>
            </div>
            <div className="record-day-modal-body">
              <div className="day-section-container py-3">
                <h5 className="detail-section-title">Rating</h5>
                <div className="rating-selection-container">
                  {
                    moods.map((mood) => (
                      <div className="rating-option my-2">
                        <h6 className='m-0'><i className={`bi bi-circle-fill me-2 color-${mood.label.toLowerCase()}`}></i> <span className='rating-label'> {mood.label} </span> - {mood.description}</h6>
                      </div>
                    ))
                  }
                </div>
                
                {/*<select className="form-select background-tertiary">
                  {moods.map((mood) => (
                    <option key={mood.id} value={mood.id} className='mood-select-option'>
                      {mood.description}
                    </option>
                  ))}
                </select>*/}
              </div>
              <div className="day-section-container py-3 mt-2">
                <h5 className="detail-section-title">Song of the Day</h5>
              </div>
              <div className="day-section-container modal-summary-section py-3 mt-2">
                <h5 className="detail-section-title">Summary</h5>
              </div>
            </div>
            <div className="record-day-modal-footer d-flex flex-row justify-content-end align-items-center gap-2 pt-3">
              <button className="btn modal-action-button" onClick={onClose}> <i className="bi bi-x-lg me-1"></i> Cancel </button>
              <button className="btn modal-action-button"> <i className="bi bi-floppy me-1"></i> Save </button>
            </div>
          </div>
        </div>
      </div>
        
      <div className="overlay"></div>
    </>
  )
}

export default RecordDayModal