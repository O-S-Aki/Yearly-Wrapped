import { buildMonthGrid } from "./buildMonthGrid";
import { filterDaysByMonth } from "./calendarUtil";

import type { ISimpleDay, ICalendarMonth, ICalendarDay } from "../interfaces";

export function buildYearCalendar(year: number, days: ISimpleDay[]): ICalendarMonth[] {
  const months: ICalendarMonth[] = [];

  for (let month = 1; month <= 12; month ++) {
    const monthDays: ISimpleDay[] = filterDaysByMonth(days, year, month);
    const weeks: ICalendarDay[][] = buildMonthGrid(year, month, monthDays);

    const calendarMonth: ICalendarMonth = { year, month, weeks }
    months.push(calendarMonth);
  }

  return months;
}