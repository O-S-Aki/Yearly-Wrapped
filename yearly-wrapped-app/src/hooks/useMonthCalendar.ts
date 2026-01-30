import { useDaysOfMonth } from './';
import { buildMonthGrid } from '../lib/calendar/buildMonthGrid';

import type { ICalendarDay } from '../lib/interfaces';

export default function useMonthCalendar(year: number, month: number) {
  const { days } = useDaysOfMonth(year, month);
  const weeks: ICalendarDay[][] = buildMonthGrid(year, month, days);
  
  return { days, weeks };
}