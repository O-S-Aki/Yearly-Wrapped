import type { ISimpleDay } from './';

export default interface ICalendarDay {
  date: Date;
  isoDate: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  entry?: ISimpleDay | null;
}