import React from 'react';

import { DayCell } from '../';
import { getMonthName, getWeekdays } from '../../lib/calendar/calendarUtil';

import type { ICalendarDay } from '../../lib/interfaces';

import './monthCalendar.css';

interface MonthCalendarProps {
  year: number,
  month: number,
  weeks: ICalendarDay[][],
  onDaySelect: (day: ICalendarDay) => void,
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ year, month, weeks, onDaySelect }) => {
  const monthName: string = getMonthName(month, false);
  const weekdays: string[] = getWeekdays(true);

  return (
    <>
      {
        weeks ? (
          <>
            <div className="month-calendar background-tertiary mb-3 px-4 py-3 d-flex flex-column align-items-center">
              <div className="month-details-container py-3 d-flex flex-column align-items-center">
                <h6 className="month-year color-primary m-0">{year}</h6>
                <h2 className="month-full-name color-primary m-0">{monthName}</h2>
              </div>

              <div className="day-grid">
                <div className="weekday-row">
                  {
                    weekdays.map((weekday, index) => (
                      <div className="weekday-cell py-3" key={index}>
                        <p className="text-center weekday-label color-accent m-0">{weekday}</p>
                      </div>
                    ))
                  }
                </div>

                {
                  weeks.map((week, weekIndex) => (
                    <div className="week-row" key={weekIndex}>
                      {
                        week.map((day, index) => (
                          <div className={`day-cell-container px-3 py-3 ${day.isToday && day.isCurrentMonth ? 'today' : ''} ${day.isSelected && day.isCurrentMonth ? 'selected' : ''} ${day.isCurrentMonth ? 'current-month' : 'other-month'}`} key={index} onClick={() => onDaySelect(day)}>
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