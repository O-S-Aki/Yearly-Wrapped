import type { ISong } from "../../interfaces";

export const mapResponseToSong = (data: any): ISong => {
  const song: ISong = {
    id: data.Id,
    name: data.Name ? data.Name : null,
    artist: data.Artist ? data.Artist : null,
    url: data.Url ? data.Url : null,
    userId: data.UserId,
    date: data.Date,
  }

  return song;
}