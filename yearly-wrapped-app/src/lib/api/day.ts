import { client } from '../supabaseClient';

import type { IDay, ISimpleDay } from '../interfaces';
import { mapResponseToDay, mapResponseToSimpleDay } from '../mappers/dayMapper';

export async function getDaysByYear(userId: string, chosenYear?: number): Promise<ISimpleDay[]> {
  const year = chosenYear ?? new Date().getFullYear();

  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
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

export async function getDayByDate(userId: string, date: string): Promise<IDay> {
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
    .single();

  const fetchedDay = response.data;
  const day: IDay = mapResponseToDay(fetchedDay)
    
  return day;
}

export async function getDayById(id: string): Promise<IDay> {
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
    .eq("Id", id)
    .single();
    
  const fetchedDay = response.data;
  const day: IDay = mapResponseToDay(fetchedDay)
    
  return day;
}