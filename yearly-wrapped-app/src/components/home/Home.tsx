import React from 'react';

import { useCalendarState } from '../../hooks';

import { Month, Day } from '../';

import './home.css';

interface PageProps {
}

const Home: React.FC<PageProps> = ({ }) => {
  const calendarState = useCalendarState();

  return (
    <>
      <div className="app-page d-flex flex-column mt-3 py-3 px-2 gap-4">
        <div className="top-section d-flex flex-row justify-content-start gap-4">
          <div className="calendar-section p-2 ">
            <Month calendarState={calendarState} />
          </div>
          <div className="current-day-section p-2">
            <Day calendarState={calendarState} />
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