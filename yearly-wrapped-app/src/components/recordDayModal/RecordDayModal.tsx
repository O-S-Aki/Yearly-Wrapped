import React from 'react';

import { MoodSelect } from '../';
import { useDayInput } from '../../hooks';
import { formatDate } from '../../lib/calendar/util';

import type { IDay, IMood } from '../../lib/interfaces';

import './recordDayModal.css';

interface RecordDayModalProps {
  isOpen: boolean;
  date: string;
  initialDay: IDay | null;
  moods: IMood[];
  selectedMood: IMood | null;
  onClose: () => void;
  onSelectMood: (mood: IMood) => void;
  //onSaveDay: (editedDay: IDayInput) => Promise<void>;
}

const RecordDayModal: React.FC<RecordDayModalProps> = ({ isOpen, date, initialDay, moods, selectedMood, onClose, onSelectMood }) => {
  const { dayInput } = useDayInput(initialDay);
  
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
                <MoodSelect moods={moods} selectedMood={selectedMood} onSelectMood={onSelectMood} />
              </div>
              <div className="day-section-container py-3 mt-2">
                <h5 className="detail-section-title">Song of the Day</h5>
                <p>{dayInput.song?.name || 'No song selected'}</p>
              </div>
              <div className="day-section-container modal-summary-section py-3 mt-2">
                <h5 className="detail-section-title">Summary</h5>
                <textarea className="form-control summary-input" placeholder="Write a summary of your day..." value={dayInput.note || ''}></textarea>
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