import { getDaysByDateRange } from './';

import type { ISimpleDay } from '../../interfaces';

export async function getDaysByYear(userId: string, chosenYear?: number): Promise<ISimpleDay[]> {
  const year = chosenYear ?? new Date().getFullYear();

  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
  const days: ISimpleDay[] = await getDaysByDateRange(userId, startDate, endDate);
  return days;
}