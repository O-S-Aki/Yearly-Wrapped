import { client } from '../supabaseClient';

import type { IDay, ISimpleDay } from '../interfaces';
import { mapResponseToDay, mapResponseToSimpleDay } from '../mappers/dayMapper';
import { convertToISODate } from '../calendar/calendarUtil';

export async function getDaysByYear(userId: string, chosenYear?: number): Promise<ISimpleDay[]> {
  const year = chosenYear ?? new Date().getFullYear();

  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
  const days: ISimpleDay[] = await getDaysByDateRange(userId, startDate, endDate);
  return days;
}

export async function getDaysByMonth(userId: string, chosenYear?: number, chosenMonth?: number): Promise<ISimpleDay[]> {
  const year = chosenYear ?? new Date().getFullYear();
  const month = chosenMonth ?? new Date().getMonth() + 1;

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = new Date(year, month, 0).toISOString().split("T")[0];
  
  const days: ISimpleDay[] = await getDaysByDateRange(userId, startDate, endDate);
  return days;
}

export async function getDayByDate(userId: string, date: string): Promise<IDay | null> {
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
        Url
      ),
      MealHealth: MealHealthId (
        Id,
        Label
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

async function getDaysByDateRange(userId: string, startDate: string, endDate: string): Promise<ISimpleDay[]> {
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