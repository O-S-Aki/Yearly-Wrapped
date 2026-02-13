import type { IMood, ISimpleDay } from "../interfaces";

export function getDayCountByMood(days: ISimpleDay[], mood: IMood): number {
  return days.filter(day => day.mood.label == mood.label).length;
}