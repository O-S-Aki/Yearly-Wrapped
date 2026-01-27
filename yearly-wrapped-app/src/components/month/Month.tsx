import React from 'react';

import { useParams } from 'react-router-dom';

import { MonthCalendar } from '../';
import { useMonthCalendar } from '../../hooks/useMonthCalendar';

import './month.css';

interface PageProps {
}

const Month: React.FC<PageProps> = ({ }) => {
  const { year, month } = useParams();
  const chosenYear: number = Number(year);

  const chosenMonth: number = Number(month);
  const previousMonth: number = chosenMonth > 1 ? chosenMonth - 1 : 12;
  const nextMonth: number = chosenMonth < 12 ? chosenMonth + 1 : 1;

  const { weeks: calendarWeeks } = useMonthCalendar(chosenYear, chosenMonth);
  const { weeks: previousCalendarWeeks } = useMonthCalendar(chosenYear, previousMonth);
  const { weeks: nextCalendarWeeks } = useMonthCalendar(chosenYear, nextMonth);

  return (
    <>
      <div className="app-page">
        {
          calendarWeeks ? (
            <>
              <div className="calendar-container mt-2 d-flex flex-row justify-content-center gap-4">
                <MonthCalendar year={chosenYear} month={previousMonth} weeks={previousCalendarWeeks} />
                <MonthCalendar year={chosenYear} month={chosenMonth} weeks={calendarWeeks} />
                <MonthCalendar year={chosenYear} month={nextMonth} weeks={nextCalendarWeeks} />
              </div>
            </>) : (<></>)
        }
      </div>
    </>
  )
}

export default Month