import type { ICalendarDay, ICalendarMonth, ISimpleDay } from '../';

export default interface IMonthComponentState {
  days: ISimpleDay[];
  yearCalendar: ICalendarMonth[];
  activeMonthIndex: number;
  selectDay: (day: ICalendarDay) => void;
  changeMonth: (index: number) => void;
  updateCalendar: () => void;
}