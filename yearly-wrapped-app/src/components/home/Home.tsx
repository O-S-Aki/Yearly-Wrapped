import React from 'react';

import { Month, Day, Analytics } from '../';
import { useAuth, useCalendarState, useDayComponentState, useMonthComponentState } from '../../hooks';

import type { IDayRecordState, IMood } from '../../lib/interfaces';

import './home.css';

interface HomeProps {
}

const Home: React.FC<HomeProps> = ({ }) => {
  const { user } = useAuth();
  const calendarState = useCalendarState();

  const isoDate: string = calendarState.selectedIsoDate;

  const dayComponentState = useDayComponentState(user, isoDate);
  const monthComponentState = useMonthComponentState(calendarState);

  const handleSaveAndRefetchCalendar = async (dayRecordState: IDayRecordState, mood: IMood | null) => {
    const success = await dayComponentState.recordDay(dayRecordState, mood);
    console.log('Save successful:', success);

    if (success) {
      monthComponentState.updateCalendar();
    }
  }

  return (
    <>
      <div className="app-page d-flex flex-column mt-3 py-3 px-2 gap-4">
        <div className="top-section d-flex flex-row justify-content-start gap-4">
          <div className="calendar-section p-2 ">
            <Month visibleYear={calendarState.visibleYear} state={monthComponentState} />
          </div>
          <div className="current-day-section p-2">
            <Day isoDate={isoDate} state={dayComponentState} onSave={handleSaveAndRefetchCalendar} />
          </div>
        </div>
        <div className="bottom-section d-flex flex-row align-items-center justify-content-start">
          <div className="analytics-section w-100 p-2">
            <Analytics />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home