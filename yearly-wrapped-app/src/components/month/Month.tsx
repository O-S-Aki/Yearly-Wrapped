import React from 'react';

import { Carousel } from '../';
import { MonthCalendar } from '../';
import { useIsMobile } from '../../hooks';

import type { IMonthComponentState } from '../../lib/interfaces';

import './month.css';

interface MonthProps {
  visibleYear: number;
  state: IMonthComponentState
}

const Month: React.FC<MonthProps> = ({ visibleYear, state }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="app-component d-flex flex-column align-items-center">
        {
          state.yearCalendar ? (
            <>
              <div className="calendar-container">
                <Carousel initialIndex={state.activeMonthIndex} onIndexChange={(index) => state.changeMonth(index)}>
                  {
                    state.yearCalendar.map(( { month, weeks }) => (
                      <MonthCalendar key={month} year={visibleYear} month={month} weeks={weeks} onDaySelect={state.selectDay}/>
                    ))
                  }
                </Carousel>
              </div>
              {
                isMobile ? (
                <>
                  <p className="mt-3 mb-0 text-center">
                    Swipe, or use the arrows to navigate between months. Click on any day on the calendar to view or record a summary for it.
                  </p>
                </>) : (<></>)
              }
            </>) : (<></>)
        }
      </div>
    </>
  )
}

export default Month