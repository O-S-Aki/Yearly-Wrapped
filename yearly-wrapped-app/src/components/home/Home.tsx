import React from 'react';

import { Month, Day, Year } from '../';
import { useAuth, useCalendarState, useDayComponentState, useIsMobile, useMonthComponentState, useMoods } from '../../hooks';

import { formatDate, getNextDayInYear, getPreviousDayInYear } from '../../lib/calendar/util';

import type { IDayRecordState, IMood } from '../../lib/interfaces';

import './home.css';

interface HomeProps {
}

const Home: React.FC<HomeProps> = ({ }) => {
  const { user } = useAuth();
  const { moods } = useMoods();

  const calendarState = useCalendarState();
  const isMobile = useIsMobile();

  const isoDate: string = calendarState.selectedIsoDate;

  const dayComponentState = useDayComponentState(user, isoDate);
  const monthComponentState = useMonthComponentState(calendarState);

  const handleSaveAndRefetchCalendar = async (dayRecordState: IDayRecordState, mood: IMood | null) => {
    const success = await dayComponentState.recordDay(dayRecordState, mood);

    if (success) {
      monthComponentState.updateCalendar();
    }
  }

  const goNextDay = () => {
    calendarState.selectDate(getNextDayInYear(isoDate));
  }

  const goPreviousDay = () => {
    calendarState.selectDate(getPreviousDayInYear(isoDate));
  }

  return (
    <>
      <div className="app-page d-flex flex-column gap-1">
        {
          isMobile ? (
            <>
              <div className="calendar-section color-primary background-background p-3">
                <Month visibleYear={calendarState.visibleYear} state={monthComponentState} />
              </div>
              
              <div className='middle-section-home'>
                <div className='px-2 w-100 d-flex flex-row align-items-start justify-content-between gap-2'>
                  <div className="btn" onClick={goPreviousDay}><i className="bi bi-chevron-left"></i></div>
                  <div className='date-control-buttons-container'>
                    <div className="date-link-container">
                      <h6 className="mb-1 text-center">{formatDate(isoDate)}</h6>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2 mt-2">
                      <div className="btn date-control-button background-tertiary"><i className="bi bi-eye-fill"></i></div>
                      <div className="btn date-control-button background-tertiary"><i className="bi bi-pencil-fill"></i></div>
                    </div>
                  </div>
                  <div className="btn" onClick={goNextDay}><i className="bi bi-chevron-right"></i></div>
                </div>
                
                <p className="mt-3 mb-0 text-center">
                  Swipe on the calendar to navigate between months. Click on any day to view or record a summary for it.
                </p>
              </div>

              <div className="analytics-section background-primary color-background p-3 mt-3">
                <Year days={monthComponentState.days} moods={moods} />
              </div>
            </>) : (
            <>
            <div className="top-section d-flex flex-row justify-content-start">
              <div className="calendar-section p-3">
                <Month visibleYear={calendarState.visibleYear} state={monthComponentState} />
              </div>
              <div className="current-day-section p-3">
                <Day isoDate={isoDate} state={dayComponentState} moods={moods} onSave={handleSaveAndRefetchCalendar} />
              </div>
            </div>
            <div className="bottom-section background-primary color-background d-flex flex-row align-items-center justify-content-start">
              <div className="analytics-section w-100 p-3">
                <Year days={monthComponentState.days} moods={moods} />
              </div>
            </div>
            </>)
        }
      </div>
    </>
  )
}

export default Home