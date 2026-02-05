import { buildMonthGrid } from "./buildMonthGrid";
import { filterDaysByMonth } from "./util";

import type { ISimpleDay, ICalendarMonth, ICalendarDay } from "../interfaces";

export function buildYearCalendar(year: number, days: ISimpleDay[], selectedDate: Date): ICalendarMonth[] {
  const months: ICalendarMonth[] = [];

  for (let month = 1; month <= 12; month ++) {
    const monthDays: ISimpleDay[] = filterDaysByMonth(days, year, month);
    const weeks: ICalendarDay[][] = buildMonthGrid(year, month, monthDays, selectedDate);

    const calendarMonth: ICalendarMonth = { year, month, weeks }
    months.push(calendarMonth);
  }

  return months;
}