import { getDaysByDateRange } from './';

import type { ISimpleDay } from '../../interfaces';

export async function getDaysByMonth(userId: string, chosenYear?: number, chosenMonth?: number): Promise<ISimpleDay[]> {
  const year = chosenYear ?? new Date().getFullYear();
  const month = chosenMonth ?? new Date().getMonth() + 1;

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = new Date(year, month, 0).toISOString().split("T")[0];
  
  const days: ISimpleDay[] = await getDaysByDateRange(userId, startDate, endDate);
  return days;
}