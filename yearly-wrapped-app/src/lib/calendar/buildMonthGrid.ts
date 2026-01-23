import { datesAreEqual } from "./dateUtil";

import type { ICalendarDay, ISimpleDay } from "../interfaces";

export function buildMonthGrid (year: number, month: number, days: ISimpleDay[]): ICalendarDay[] {
  const firstDayOfMonth: Date = new Date(year, month - 1, 1);
  const startDayOfWeek: number = firstDayOfMonth.getDay();

  const calendarStartDate: Date = new Date(firstDayOfMonth);
  calendarStartDate.setDate(calendarStartDate.getDate() - startDayOfWeek);

  const dayMap: Map<string, ISimpleDay> = new Map(days.map(day => [day.date, day]));

  const monthGrid: ICalendarDay[] = [];
  const maxNumberOfWeeks: number = 6;

  for (let i = 0; i < (7 * maxNumberOfWeeks); i ++) {
    const date: Date = new Date(calendarStartDate);
    date.setDate(i + calendarStartDate.getDate());

    const isoDate = date.toISOString().split("T")[0];

    const calendarDay: ICalendarDay = {
      date: date,
      isoDate: isoDate,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() == month - 1,
      isToday: datesAreEqual(date, new Date()),
      entry: dayMap.get(isoDate) ?? null
    };

    monthGrid.push(calendarDay)
  }

  return monthGrid;
}