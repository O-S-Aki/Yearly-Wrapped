import React from 'react';

import { Carousel } from '../';
import { MonthCalendar } from '../';

import type { IMonthComponentState } from '../../lib/interfaces';

import './month.css';

interface MonthProps {
  visibleYear: number;
  state: IMonthComponentState
}

const Month: React.FC<MonthProps> = ({ visibleYear, state }) => {

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
            </>) : (<></>)
        }
      </div>
    </>
  )
}

export default Month