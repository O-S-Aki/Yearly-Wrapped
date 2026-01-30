export default interface ICalendarState {
  selectedDate: Date;
  visibleYear: number;
  visibleMonth: number;
  changeMonth: (year: number, month: number) => void;
  selectDay: (day: Date) => void;
}