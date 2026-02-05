import { mapResponseToMood, mapResponseToSong } from "..";
import type { IDay } from "../../interfaces";

export const mapResponseToDay = (data: any): IDay => {
  const day: IDay = {
    id: data.Id,
    userId: data.UserId,
    date: new Date(data.Date),
    isoDate: data.Date,
    note: data.Note,
    mood: mapResponseToMood(data.Mood),
    song: mapResponseToSong(data.Song),
  }

  return day;
}