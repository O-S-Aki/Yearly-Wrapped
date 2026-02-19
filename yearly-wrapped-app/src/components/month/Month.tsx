import React from 'react';

import { Carousel, MonthCalendar } from '../';
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
              <div className={`calendar-container ${isMobile ? 'background-tertiary' : 'background-background'} py-2`}>
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