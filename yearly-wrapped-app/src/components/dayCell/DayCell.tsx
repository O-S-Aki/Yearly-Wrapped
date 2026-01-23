import React from 'react';

import type { ICalendarDay } from '../../lib/interfaces';

import './dayCell.css';

interface PageProps {
  day: ICalendarDay
}

const DayCell: React.FC<PageProps> = ({ day }) => {

  return (
    <>
      {
        day ? (
          <>
          </>) : (<></>)
      }
    </>
  )
}

export default DayCell