import React, { useMemo } from 'react';

import { useState } from 'react';

import { Carousel } from '../';
import { MonthCalendar } from '../';

import { useDaysOfYear } from '../../hooks/';
import { buildYearCalendar } from '../../lib/calendar/buildYearCalendar';

import type { ICalendarDay, ICalendarMonth, ICalendarState } from '../../lib/interfaces';

import './month.css';

interface MonthProps {
  calendarState: ICalendarState;
}

const Month: React.FC<MonthProps> = ({ calendarState }) => {
  const { days: yearDays } = useDaysOfYear(calendarState.visibleYear);
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(calendarState.visibleMonth - 1);

  const yearCalendar: ICalendarMonth[] = useMemo(() => 
    buildYearCalendar(calendarState.visibleYear, yearDays, calendarState.selectedDate), [calendarState.visibleYear, yearDays, calendarState.selectedDate]);

  const handleDaySelect = (day: ICalendarDay) => {
    if (day.isCurrentMonth) {
      calendarState.selectDay(day.date);
    }
  }

  const handleMonthChange = (index: number) => {
    if (index === activeMonthIndex) {
      return;
    }

    setActiveMonthIndex(index);
    calendarState.changeMonth(calendarState.visibleYear, index + 1);
  }

  return (
    <>
      <div className="app-component">
        {
          yearCalendar ? (
            <>
              <div className="calendar-container">
                <Carousel initialIndex={activeMonthIndex} onIndexChange={(index) => handleMonthChange(index)}>
                  {
                    yearCalendar.map(( { month, weeks }) => (
                      <MonthCalendar key={month} year={calendarState.visibleYear} month={month} weeks={weeks} onDaySelect={handleDaySelect}/>
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