import React from 'react';

import { useParams } from 'react-router-dom';

import { MonthCalendar } from '../';

import { buildMonthGrid } from '../../lib/calendar/buildMonthGrid';
import { useDaysOfMonth } from '../../hooks/useDaysOfMonth';

import type { ICalendarDay } from '../../lib/interfaces';

import './month.css';

interface PageProps {
}

const Month: React.FC<PageProps> = ({ }) => {
  const { year, month } = useParams();
  const chosenYear = Number(year);
  const chosenMonth = Number(month);

  const { days } = useDaysOfMonth(chosenYear, chosenMonth);
  const calendarDays: ICalendarDay[] = buildMonthGrid(chosenYear, chosenMonth, days);
  
  return (
    <>
      <div className="app-page">
        <h3 className='m-0'>Month</h3>
        {
          calendarDays ? (
            <>
              <MonthCalendar days={calendarDays} />
            </>) : (<></>)
        }
      </div>
    </>
  )
}

export default Month