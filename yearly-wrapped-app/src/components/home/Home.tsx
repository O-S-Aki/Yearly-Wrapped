import React from 'react';

import Month from '../month/Month';

import './home.css';
import { useCalendarState } from '../../hooks';

interface PageProps {
}

const Home: React.FC<PageProps> = ({ }) => {
  const calendarState = useCalendarState();

  return (
    <>
      <div className="app-page d-flex flex-column mt-4 p-4 gap-4">
        <div className="top-section d-flex flex-row justify-content-start gap-4">
          <div className="calendar-section p-2 ">
            <Month calendarState={calendarState} />
          </div>
          <div className="current-day-section p-2">
            DAY
          </div>
        </div>
        <div className="bottom-section d-flex flex-row align-items-center justify-content-start">
          <div className="analytics-section w-100 p-2 background-accent">
            ANALYTICS
          </div>
        </div>
      </div>
    </>
  )
}

export default Home