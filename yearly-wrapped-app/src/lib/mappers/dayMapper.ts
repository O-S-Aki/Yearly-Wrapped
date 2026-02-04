import type { IDay, ISimpleDay, IMood, ISong } from "../interfaces";

export const mapResponseToDay = (data: any): IDay => {
  const day: IDay = {
    id: data.Id,
    userId: data.UserId,
    date: new Date(data.Date),
    isoDate: data.Date,
    note: data.Note,
    mood: mapResponeToMood(data.Mood),
    song: mapResponseToSong(data.Song),
  }

  return day;
}

export const mapResponseToSimpleDay = (data: any): ISimpleDay => {
  const simpleDay: ISimpleDay = {
    id: data.Id,
    date: data.Date,
    mood: mapResponeToMood(data.Mood),
  }

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
    userId: data.UserId,
    date: data.Date,
  }

  return song;
}