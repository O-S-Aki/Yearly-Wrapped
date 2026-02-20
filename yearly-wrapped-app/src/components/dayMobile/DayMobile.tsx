import React from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, useDayComponentState, useMoods } from '../../hooks';

import { DayDetails } from '..';
import { convertToISODate, formatDate, getNextDayInYear, getPreviousDayInYear } from '../../lib/calendar/util';

import type { IDayComponentState } from '../../lib/interfaces';

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

  const goPreviousDay = () => {
    navigate(`/day/${getPreviousDayInYear(isoDate)}`);
  }

  const goNextDay = () => {
    navigate(`/day/${getNextDayInYear(isoDate)}`);
  }

  return (
    <div className='app-page d-flex flex-column'>
      <div className={`day-title-container py-3 text-center w-100 background-tertiary d-flex flex-row ${editMode ? 'justify-content-center' : 'justify-content-between'}`}>
        {
          editMode ? (<></>) : (<div className="btn" onClick={goPreviousDay}><i className="bi bi-chevron-left"></i></div>)
        }
        <h5 className="mt-2 mb-0 day-full-date">{formatDate(isoDate)}</h5>
        {
          editMode ? (<></>) : (<div className="btn" onClick={goNextDay}><i className="bi bi-chevron-right"></i></div>)
        }
      </div>
      {
        editMode ? (
          <>
            {isoDate} - EDIT
          </>) : (
          <>
            <div className="px-4">
              <div className="day-details-container w-100">
                <DayDetails day={state.day} moods={moods} />
              </div>
            </div>
            <div className="mt-3 background-primary color-background">
              Bottom Section
            </div>
          </>)
      }
    </div>
  )
}

export default DayMobile