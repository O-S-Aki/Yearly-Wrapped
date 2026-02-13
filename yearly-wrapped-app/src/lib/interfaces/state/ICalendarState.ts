export default interface ICalendarState {
  selectedDate: Date;
  selectedIsoDate: string;
  visibleYear: number;
  visibleMonth: number;
  changeMonth: (year: number, month: number) => void;
  selectDay: (day: Date) => void;
}