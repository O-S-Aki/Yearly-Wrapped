import { useState } from "react"

import { convertToISODate } from "../../lib/calendar/util";
import type { ICalendarState } from "../../lib/interfaces";

export default function useCalendarState(): ICalendarState {
  const currentDay = new Date()

  const [selectedDate, setSelectedDate] = useState<Date>(currentDay);
  const [selectedIsoDate, setSelectedIsoDate] = useState<string>(convertToISODate(currentDay));
  const [visibleYear, setVisibleYear] = useState<number>(currentDay.getFullYear());
  const [visibleMonth, setVisibleMonth] = useState<number>(currentDay.getMonth() + 1);

  const changeMonth = (year: number, month: number) => {
    const date: Date = new Date(year, month - 1, 1);
    setSelectedDate(date);
    setSelectedIsoDate(convertToISODate(date));

    setVisibleYear(year);
    setVisibleMonth(month);
  }

  const selectDay = (date: Date) => {
    setSelectedDate(date);
    setSelectedIsoDate(convertToISODate(date));
  }

  return { selectedDate, selectedIsoDate, visibleYear, visibleMonth, changeMonth, selectDay }
}