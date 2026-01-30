import type ICalendarDay from "./ICalendarDay";

export default interface ICalendarMonth {
  year: number;
  month: number;
  weeks: ICalendarDay[][];
}