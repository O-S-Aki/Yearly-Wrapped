import type { ISong } from "../../interfaces";

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