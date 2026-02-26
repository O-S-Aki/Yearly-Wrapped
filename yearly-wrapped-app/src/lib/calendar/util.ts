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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDate(date: Date | string): string {
  const parsedDate = typeof date == 'string' ? new Date(date) : date;
  return parsedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function datesAreEqual(day1: Date, day2: Date): boolean {
  const equal: boolean = day1.getFullYear() == day2.getFullYear()
    && day1.getMonth() == day2.getMonth()
    && day1.getDate() == day2.getDate();

  return equal;
}

export function getNextDayInYear(isoDate: string): string {
  const date: Date = new Date(isoDate);
  date.setDate(date.getDate() + 1);

  if (date.getMonth() == 0 && date.getDate() == 1) {
    date.setFullYear(date.getFullYear() - 1);
  }

  return convertToISODate(date);
}

export function getDayOfWeek (isoDate: string): number {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
};

export function getPreviousDayInYear(isoDate: string): string {
  const date: Date = new Date(isoDate);
  date.setDate(date.getDate() - 1);

  if (date.getMonth() == 11 && date.getDate() == 31) {
    date.setFullYear(date.getFullYear() + 1);
  }

  return convertToISODate(date);
}

export function getMonthName(month: number, shortened?: boolean): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  if (shortened) {
    return months[month - 1].slice(0, 3);
  }

  return months[month - 1];
}

export function getWeekdays(shortened?: boolean): string[] {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  if (shortened) {
    return weekdays.map((weekday: string) => weekday.slice(0, 3))
  }

  return weekdays;
}

export const moodMap: Record<string, number> = {
  S: 1.0,
  A: 0.85,
  B: 0.65,
  C: 0.45,
  D: 0.25,
  F: 0.05,
}