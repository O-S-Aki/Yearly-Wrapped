import { getWeekdays, getDayOfWeek, moodMap } from "./util";

import type { ISimpleDay, IWeekday } from "../interfaces";

export function getWeekdayAverages(days: ISimpleDay[]): { weekdays: IWeekday[]; highest: IWeekday; lowest: IWeekday } {
  const names: string[] = getWeekdays(false);
  const shortNames: string[] = getWeekdays(true);

  const weekdays: IWeekday[] = [];

  for (let i = 0; i < names.length; i ++) {
    weekdays.push({
      name: names[i],
      shortName: shortNames[i],
      moodScore: 0,
      count: 0,
    })
  }

  days.forEach((day) => {
    const index: number = getDayOfWeek(day.date);
    weekdays[index].moodScore += moodMap[day.mood.label.toUpperCase()];
    weekdays[index].count ++;
  })

  const highest: IWeekday = getHighestAverageLabel(weekdays);
  const lowest: IWeekday = getLowestAverageLabel(weekdays);

  return { weekdays, highest, lowest };
}

function getHighestAverageLabel (days: IWeekday[]): IWeekday {
  return days.reduce((best, current) => {
    const bestAvg = best.count === 0 ? 0 : best.moodScore / best.count;
    const currAvg = current.count === 0 ? 0 : current.moodScore / current.count;

    return currAvg > bestAvg ? current : best;
  });
};

function getLowestAverageLabel (days: IWeekday[]): IWeekday {
  return days.reduce((worst, current) => {
    const worstAvg = worst.count === 0 ? 0 : worst.moodScore / worst.count;
    const currAvg = current.count === 0 ? 0 : current.moodScore / current.count;

    return currAvg < worstAvg ? current : worst;
  });
};