import type { IDay, ISimpleDay, IMood, 
  ISong, IMealHealth } from "../interfaces";

export const mapResponseToDay = (data: any): IDay => {
  const day: IDay = {
    id: data.Id,
    userId: data.UserId,
    date: new Date(data.Date),
    note: data.Note,
    mood: mapResponeToMood(data.Mood),
    song: mapResponseToSong(data.Song),
    mealHealth: mapResponseToMealHealth(data.MealHealth),
  }

  return day;
}

export const mapResponseToSimpleDay = (data: any): ISimpleDay => {
  const simpleDay: ISimpleDay = {
    id: data.Id,
    date: new Date(data.Date),
    mood: mapResponeToMood(data.Mood),
  }

  console.log(simpleDay.date.getMonth())
  return simpleDay;
}

export const mapResponeToMood = (data: any): IMood => {
  const mood: IMood = {
    id: data.Id,
    label: data.Label,
    description: data.Description,
  }

  return mood;
}

export const mapResponseToSong = (data: any): ISong => {
  const song: ISong = {
    id: data.Id,
    name: data.Name,
    artist: data.Artist,
    url: data.Url,
  }

  return song;
}

export const mapResponseToMealHealth = (data: any): IMealHealth => {
  const mealHealth: IMealHealth = {
    id: data.Id,
    label: data.Label,
  }

  return mealHealth;
}