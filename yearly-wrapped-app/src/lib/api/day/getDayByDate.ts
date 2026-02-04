import { client } from '../../supabaseClient';
import { mapResponseToDay } from '../../mappers';

import type { IDay } from '../../interfaces';

export const getDayByDate = async (userId: string, date: string): Promise<IDay | null> => {
  const response = await client
    .from("Day")
    .select(`
      Id,
      UserId,
      Date,
      Note,
      Mood: MoodId (
        Id,
        Label,
        Description
      ),
      Song: SongId (
        Id,
        Name,
        Artist,
        Url,
        UserId,
        Date
      )
    `)
    .eq("Date", date)
    .eq("UserId", userId)
    .maybeSingle();
  
  if (response.error) {
    console.error(`Failed to get details for ${date}: ${response.error}`);
  }
  const fetchedDay = response.data;
  const day: IDay | null = fetchedDay? mapResponseToDay(fetchedDay) : null
    
  return day;
}