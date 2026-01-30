import React, { useMemo } from 'react';

import { useState } from 'react';

import { Carousel } from '../';
import { MonthCalendar } from '../';

import { useDaysOfYear } from '../../hooks/';
import { buildYearCalendar } from '../../lib/calendar/buildYearCalendar';

import type { ICalendarMonth, ICalendarState } from '../../lib/interfaces';

import './month.css';

interface MonthProps {
  calendarState: ICalendarState;
}

const Month: React.FC<MonthProps> = ({ calendarState }) => {
  const { days: yearDays } = useDaysOfYear(calendarState.visibleYear);
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(calendarState.visibleMonth - 1);

  const yearCalendar: ICalendarMonth[] = useMemo(() => 
    buildYearCalendar(calendarState.visibleYear, yearDays), [calendarState.visibleYear, yearDays]);

  return (
    <>
      <div className="app-component">
        {
          yearCalendar ? (
            <>
              <div className="calendar-container">
                <Carousel initialIndex={activeMonthIndex} onSelect={(index) => setActiveMonthIndex(index)}>
                  {
                    yearCalendar.map(( { month, weeks }) => (
                      <MonthCalendar key={month} year={calendarState.visibleYear} month={month} weeks={weeks} />
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