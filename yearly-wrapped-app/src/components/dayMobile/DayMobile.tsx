import React from 'react'

import toast from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, useDayComponentState, useMoods } from '../../hooks';

import { DayDetails, RecordDayMobile } from '..';
import { convertToISODate, formatDate, getNextDayInYear, getPreviousDayInYear } from '../../lib/calendar/util';

import type { IMood, IDayComponentState, IDayRecordState } from '../../lib/interfaces';

import './dayMobile.css';


interface DayMobileProps {
  editMode: boolean;
}

const DayMobile: React.FC<DayMobileProps> = ({ editMode }) => {
  const { user } = useAuth();
  const { date } = useParams();
  const { moods } = useMoods();

  const navigate = useNavigate();

  const isoDate = date ?? convertToISODate(new Date());
  const state: IDayComponentState = useDayComponentState(user, isoDate);

  const goPreviousDay = (show: boolean) => {
    if (show) {
      navigate(`/day/${getPreviousDayInYear(isoDate)}`);
    }
  }

  const goNextDay = (show: boolean) => {
    if (show) {
      navigate(`/day/${getNextDayInYear(isoDate)}`);
    }
  }

  const handleSave = async (dayRecordState: IDayRecordState, mood: IMood | null) => {
    const loadingNotification = toast.loading('Saving...');
    const success = await state.recordDay(dayRecordState, mood);

    if (success) {
      toast.remove(loadingNotification);
      toast.success(`Entry saved for ${formatDate(isoDate)}`);

      navigate(`/day/${isoDate}`);
    }
    else {
      toast.remove(loadingNotification);
      toast.error(`Failed to save entry for ${formatDate(isoDate)}`);
    }
  }

  const handleCancel = (uri: string) => {
    toast.error('Cancelled');
    navigate(uri);
  }

  return (
    <div className='app-page d-flex flex-column'>
      <div className={`day-title-container py-3 text-center w-100 background-tertiary d-flex flex-row ${editMode ? 'justify-content-center' : 'justify-content-between'}`}>
        {
          <div className={`btn ${editMode ? 'color-tertiary' : 'color-primary'}`} onClick={() => goPreviousDay(editMode ? false : true)}><i className="bi bi-chevron-left"></i></div>
        }
        <h5 className="mt-2 mb-0 day-full-date">{formatDate(isoDate)}</h5>
        {
          <div className={`btn ${editMode ? 'color-tertiary' : 'color-primary'}`} onClick={() => goNextDay(editMode ? false : true)}><i className="bi bi-chevron-right"></i></div>
        }
      </div>
      {
        editMode ? (
          <>
            <div className="px-4">
              <div className="day-edit-container w-100">
                <RecordDayMobile state={state} moods={moods} isoDate={isoDate} onSave={handleSave} onCancel={handleCancel} />
              </div>
            </div>
          </>) : (
          <>
            <div className="px-4">
              <div className="day-details-container w-100">
                <DayDetails day={state.day} moods={moods} />
                <div className="mt-2 py-3 d-flex flex-row justify-content-center gap-2">
                  <div className="btn date-control-button background-tertiary" onClick={() => navigate(`/home`)}> <i className="bi bi-reply-fill"></i> To Calendar </div>
                  <div className="btn date-control-button background-tertiary" onClick={() => navigate(`/day/${isoDate}/edit`)}> {state.day ? <><i className="bi bi-pencil-fill"></i> Edit Day</> : <><i className="bi bi-pencil-fill"></i> Record Day</>} </div>
                </div>
              </div>
            </div>
          </>)
      }
    </div>
  )
}

export default DayMobile