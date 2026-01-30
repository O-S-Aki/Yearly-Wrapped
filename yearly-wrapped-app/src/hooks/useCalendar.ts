import { buildMonthGrid } from "../lib/calendar/buildMonthGrid";

import type { ISimpleDay, ICalendarDay } from "../lib/interfaces";
import { filterDaysByMonth } from "../lib/calendar/calendarUtil";

export default function useCalendar(yearDays: ISimpleDay[], year: number, month: number) {
  const monthDays: ISimpleDay[] = filterDaysByMonth(yearDays, year, month);
  const weeks: ICalendarDay[][] = buildMonthGrid(year, month, monthDays);

  return { monthDays, weeks }
}