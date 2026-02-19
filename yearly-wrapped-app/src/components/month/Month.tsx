import React from 'react';

import { Carousel, MonthCalendar } from '../';
import { useIsMobile } from '../../hooks';
import { formatDate } from '../../lib/calendar/util';

import type { IMonthComponentState } from '../../lib/interfaces';

import './month.css';

interface MonthProps {
  visibleYear: number;
  state: IMonthComponentState
  selectedDate?: string;
}

const Month: React.FC<MonthProps> = ({ visibleYear, state, selectedDate }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="app-component d-flex flex-column align-items-center">
        {
          state.yearCalendar ? (
            <>
              <div className={`calendar-container ${isMobile ? 'background-tertiary' : 'background-background'} py-2`}>
                <Carousel initialIndex={state.activeMonthIndex} onIndexChange={(index) => state.changeMonth(index)}>
                  {
                    state.yearCalendar.map(( { month, weeks }) => (
                      <MonthCalendar key={month} year={visibleYear} month={month} weeks={weeks} onDaySelect={state.selectDay}/>
                    ))
                  }
                </Carousel>
              </div>
              {
                isMobile && selectedDate ? (
                <>
                  <div className='mt-1 p-2 w-100 '>
                    <div className="date-link-container">
                      <h5 className="mb-1 text-center">{formatDate(selectedDate)}</h5>
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2 mt-2">
                      <div className="btn date-control-button background-tertiary"><i className="bi bi-eye-fill"></i></div>
                      <div className="btn date-control-button background-tertiary"><i className="bi bi-pencil-fill"></i></div>
                    </div>
                  </div>
                  
                  <p className="mt-2 mb-0 text-center">
                    Swipe on the calendar to navigate between months. Click on any day to view or record a summary for it.
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