import React from 'react'

import { useNavigate } from 'react-router-dom';

import { MoodSelect } from '..';
import { useDayRecordState } from '../../hooks';

import type { IMood, IDayRecordState, IDayComponentState } from '../../lib/interfaces';

import './recordDayMobile.css';


interface RecordDayMobileProps {
  state: IDayComponentState;
  moods: IMood[];
  isoDate: string;
  onSave: (dayRecordState: IDayRecordState, mood: IMood | null) => void;
}

const RecordDayMobile: React.FC<RecordDayMobileProps> = ({ state, moods, isoDate, onSave }) => {
  const navigate = useNavigate();
  const recordState = useDayRecordState(state.day, isoDate);

  return (
    <div className='app-component color-primary'>
      <div className="day-section-container modal-summary-section pt-2 pb-3 mt-2">
        <h6 className="detail-section-title m-0">Summary <span className='color-accent'>*</span></h6>
        <p className="text-smaller">Leave a note about what happened</p>
        <textarea className="form-control summary-input" maxLength={650} rows={7} value={recordState.note} onChange={(e) => recordState.changeNote(e.target.value)}></textarea>
      </div>

      <div className="day-section-container py-2">
        <h6 className="detail-section-title m-0">Rating <span className='color-accent'>*</span></h6>
        <p className="m-0 text-smaller">Select the color that best describes your day</p>
        <div className="d-flex flex-row justify-content-center">
          <MoodSelect moods={moods} selectedMood={state.selectedMood} editable={true} onSelectMood={state.selectMood} />
        </div>
      </div>

      <div className="day-section-container form-section pt-2 pb-3 mt-2">
        <div className="d-flex flex-row justify-content-between mb-2">
          <div>
            <h6 className="detail-section-title m-0">Song of the Day</h6>
            <p className="m-0 text-smaller">Choose a song to link to this day</p>
          </div>
          {
            recordState.showSongSection ? (
            <>
              <div className="btn date-control-button background-background" onClick={recordState.toggleSongSection}>
                <i className="bi bi-dash-lg"></i>
              </div>
            </>) : (
            <>
              <div className="btn date-control-button background-background" onClick={recordState.toggleSongSection}>
                <i className="bi bi-plus-lg"></i>
              </div>
            </>)
          }
        </div>

        {
          recordState.showSongSection ? (
          <>
          <div className="d-flex flex-column gap-2">
            <div>
              <p className="ms-1 mb-0">Name</p>
              <input className='form-control' type='text' value={recordState.songName} onChange={(e) => recordState.changeSongName(e.target.value)} />
            </div>
            <div>
              <p className="ms-1 mb-0">Artist</p>
              <input className='form-control' type='text' value={recordState.songArtist} onChange={(e) => recordState.changeSongArtist(e.target.value)} />
            </div>
            <div>
              <p className="ms-1 mb-0">Spotify URL</p>
              <input className='form-control' type='text' value={recordState.songUrl} onChange={(e) => recordState.changeSongUrl(e.target.value)} />
            </div>
          </div>
          </>) : (<><p className="m-0">No song has been recorded</p></>)
        }
      </div>

      <div className="d-flex flex-row justify-content-center align-items-center gap-2 mt-2 py-3">
        <div className="btn date-control-button background-tertiary" onClick={() => navigate(`/day/${isoDate}`)}>
          <i className="bi bi-x-lg me-1"></i> Cancel
        </div>
        <div className="btn date-control-button background-tertiary" onClick={() => onSave(recordState, state.selectedMood)}>
          <i className="bi bi-floppy me-1"></i> Save
        </div>
      </div>

    </div>
  )
}

export default RecordDayMobile