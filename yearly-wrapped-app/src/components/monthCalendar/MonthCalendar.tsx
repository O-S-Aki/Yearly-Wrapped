import React from 'react';

import { DayCell } from '../';
import { getMonthName, getWeekdays } from '../../lib/calendar/calendarUtil';

import type { ICalendarDay } from '../../lib/interfaces';

import './monthCalendar.css';

interface PageProps {
  year: number,
  month: number,
  weeks: ICalendarDay[][]
}

const MonthCalendar: React.FC<PageProps> = ({ year, month, weeks }) => {
  const monthName: string = getMonthName(month, false);
  const weekdays: string[] = getWeekdays(true);

  return (
    <>
      {
        weeks ? (
          <>
            <div className="month-calendar p-4 d-flex flex-column align-items-center">
              <div className="month-details-container py-3 d-flex flex-column align-items-center">
                <h5 className="month-year m-0">{year}</h5>
                <h1 className="month-full-name m-0">{monthName}</h1>
              </div>

              <div className="day-grid">
                <div className="weekday-row">
                  {
                    weekdays.map((weekday, index) => (
                      <div className="weekday-cell py-3" key={index}>
                        <h6 className="text-center weekday-label m-0">{weekday}</h6>
                      </div>
                    ))
                  }
                </div>

                {
                  weeks.map((week, weekIndex) => (
                    <div className="week-row" key={weekIndex}>
                      {
                        week.map((day, index) => (
                          <div className={`day-cell-container px-3 py-3 ${day.isToday ? 'today' : ''}`} key={index}>
                            <DayCell day={day} />
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>

            </div>
          </>) : (<></>)
      }
    </>
  )
}

export default MonthCalendar