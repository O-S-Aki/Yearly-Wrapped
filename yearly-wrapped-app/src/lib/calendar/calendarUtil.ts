import type { ISimpleDay, ICalendarDay } from "../interfaces";

export function filterDaysByMonth(days: ISimpleDay[], year: number, month: number): ISimpleDay[] {
  return days.filter(day => {
    const date = new Date(day.date);
    return (
      date.getFullYear() == year && date.getMonth() + 1 == month
    )
  })
}

export function convertDaysIntoWeeks(days: ICalendarDay[]): ICalendarDay[][] {
  const weeks: ICalendarDay[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

export function convertToISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function datesAreEqual(day1: Date, day2: Date): boolean {
  const equal: boolean = day1.getFullYear() == day2.getFullYear()
    && day1.getMonth() == day2.getMonth()
    && day1.getDate() == day2.getDate();

  return equal;
}

export function getMonthName(month: number, shortened?: boolean): string {
  const date: Date = new Date(`01-01`);
  date.setMonth(month - 1);
  
  return date.toLocaleString('default', { month: `${shortened ? 'short' : 'long'}` });
}

export function getWeekdays(shortened?: boolean): string[] {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  if (shortened) {
    return weekdays.map((weekday: string) => weekday.slice(0, 3))
  }

  return weekdays;
}