import React from 'react';

import { Month, Day, Year } from '../';
import { useAuth, useCalendarState, useDayComponentState, useIsMobile, useMonthComponentState, useMoods } from '../../hooks';

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

  return (
    <>
      <div className="app-page d-flex flex-column gap-2">
        {
          isMobile ? (
            <>
              <div className="calendar-section color-primary background-background p-3">
                <Month visibleYear={calendarState.visibleYear} state={monthComponentState} selectedDate={isoDate} />
              </div>
              <div className="analytics-section background-primary color-background p-3">
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