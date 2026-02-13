import React from 'react';

import { useDayRecordState } from '../../hooks';

import { MoodSelect } from '../';
import { formatDate } from '../../lib/calendar/util';

import type { IMood, IDayComponentState, IDayRecordState } from '../../lib/interfaces';

import './recordDayModal.css';

interface RecordDayModalProps {
  isoDate: string;
  dayComponentState: IDayComponentState
  moods: IMood[];
  onSave: (dayRecordState: IDayRecordState, mood: IMood | null) => void;
}

const RecordDayModal: React.FC<RecordDayModalProps> = ({ dayComponentState, moods, isoDate, onSave }) => {
  const dayRecordState = useDayRecordState(dayComponentState.day, isoDate);

  if (!dayComponentState.isModalOpen) return null;

  return (
    <>
      <div className="app-component">
        <div className="modal-container">
          <div className="record-day-modal background-background p-4">
            <div className="record-day-modal-header day-title-container pb-3 d-flex flex-row justify-content-between align-items-start">
              <h3 className="m-0 day-full-date">{formatDate(isoDate)}</h3>
              <h3 className="bi bi-x-square-fill m-0 color-primary close-modal" onClick={dayComponentState.closeModal}></h3>
            </div>
            <div className="record-day-modal-body">
              
              <div className="day-section-container py-3">
                <h5 className="detail-section-title">Rating</h5>
                <MoodSelect moods={moods} selectedMood={dayComponentState.selectedMood} editable={true} onSelectMood={dayComponentState.selectMood} />
              </div>

              <div className="day-section-container modal-summary-section py-3 mt-1">
                <h5 className="detail-section-title">Summary</h5>
                <textarea className="form-control summary-input" maxLength={650} rows={3} value={dayRecordState.note} onChange={(e) => dayRecordState.changeNote(e.target.value)}></textarea>
              </div>

              <div className="day-section-container modal-song-section form-section py-3 mt-1">
                <h5 className="detail-section-title">Song of the Day</h5>
                <div className="row mt-2">
                  <div className="col col-12">
                    <p className="ms-1 mb-0">Name</p>
                    <input className='form-control' type='text' value={dayRecordState.songName} onChange={(e) => dayRecordState.changeSongName(e.target.value)} />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col col-12 col-md-6">
                    <p className="ms-1 mb-0">Artist</p>
                    <input className='form-control' type='text' value={dayRecordState.songArtist} onChange={(e) => dayRecordState.changeSongArtist(e.target.value)} />
                  </div>
                  <div className="col col-12 col-md-6">
                    <p className="ms-1 mb-0">Spotify URL</p>
                    <input className='form-control' type='text' value={dayRecordState.songUrl} onChange={(e) => dayRecordState.changeSongUrl(e.target.value)} />
                  </div>
                </div>
              </div>

            </div>
            <div className="record-day-modal-footer d-flex flex-row justify-content-end align-items-center gap-2 pt-3">
              <button className="btn modal-action-button" onClick={dayComponentState.closeModal}>
                <i className="bi bi-x-lg me-1"></i> Cancel
              </button>
              <button className="btn modal-action-button" onClick={() => onSave(dayRecordState, dayComponentState.selectedMood)}>
                <i className="bi bi-floppy me-1"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
        
      <div className="overlay"></div>
    </>
  )
}

export default RecordDayModal