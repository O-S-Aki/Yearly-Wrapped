import { client } from '../../supabaseClient';
import { mapResponseToSimpleDay } from '../../mappers';

import type { ISimpleDay } from '../../interfaces';

export const getDaysByDateRange = async (userId: string, startDate: string, endDate: string): Promise<ISimpleDay[]> => {
  const response = await client
    .from("Day")
    .select(`
      Id,
      Date,
      Mood: MoodId (
        Id,
        Label,
        Description
      )  
    `)
    .eq("UserId", userId)
    .gte("Date", startDate)
    .lte("Date", endDate)
    .order("Date", {ascending: true})

    const fetchedDays: any = response.data;
    const days: ISimpleDay[] = [];

    fetchedDays.forEach((day: any) => {
      const mappedDay = mapResponseToSimpleDay(day);
      days.push(mappedDay);
    });

    return days;
}