import { useState } from "react"
import type { ICalendarState } from "../lib/interfaces";

export default function useCalendarState(): ICalendarState {
  const currentDay = new Date()

  const [selectedDate, setSelectedDate] = useState<Date>(currentDay);
  const [visibleYear, setVisibleYear] = useState<number>(currentDay.getFullYear())
  const [visibleMonth, setVisibleMonth] = useState<number>(currentDay.getMonth() + 1);

  function changeMonth(year: number, month: number) {
    const date: Date = new Date(year, month - 1, 1);
    setSelectedDate(date);

    setVisibleYear(year);
    setVisibleMonth(month);
  }

  function selectDay(date: Date) {
    setSelectedDate(date);
  }

  return { selectedDate, visibleYear, visibleMonth, changeMonth, selectDay }
}