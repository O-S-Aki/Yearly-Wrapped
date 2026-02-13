import { mapResponseToMood } from "..";
import type { ISimpleDay } from "../../interfaces";

export const mapResponseToSimpleDay = (data: any): ISimpleDay => {
  const simpleDay: ISimpleDay = {
    id: data.Id,
    date: data.Date,
    mood: mapResponseToMood(data.Mood),
  }

  return simpleDay;
}