import { useState, useMemo } from 'react';
import { buildYearCalendar } from '../../lib/calendar/buildYearCalendar';
import { useDaysOfYear } from '../';

import type { ICalendarDay, ICalendarMonth, ICalendarState, IMonthComponentState } from '../../lib/interfaces';

export default function useMonthComponentState(calendarState: ICalendarState): IMonthComponentState {
  const { days, refreshDays } = useDaysOfYear(calendarState.visibleYear);
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(calendarState.visibleMonth - 1);

  const yearCalendar: ICalendarMonth[] = useMemo(() =>
    buildYearCalendar(calendarState.visibleYear, days, calendarState.selectedDate), [calendarState.visibleYear, days, calendarState.selectedDate]);

  const selectDay = (day: ICalendarDay) => {
    if (day.isCurrentMonth) {
      calendarState.selectDay(day.date);
    }
  }

  const changeMonth = (index: number) => {
    if (index === activeMonthIndex) {
      return;
    }

    setActiveMonthIndex(index);
    calendarState.changeMonth(calendarState.visibleYear, index + 1);
  }

  const updateCalendar = async () => {
    await refreshDays();
  }

  return { days, yearCalendar, activeMonthIndex, selectDay, changeMonth, updateCalendar }
}