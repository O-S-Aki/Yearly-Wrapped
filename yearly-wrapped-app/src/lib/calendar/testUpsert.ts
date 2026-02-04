import { upsertDay, upsertSong } from "../api/day";

import type { IDayInput, ISongInput } from "../interfaces";

export const testUpsertSong = async(date: string) => {
  const userId: string = '16f8e304-32d6-4ec0-951f-894508506178';

  const songInput: ISongInput = {
    name: "Coming Down",
    artist: "Dum Dum Girls",
    url: "https://open.spotify.com/track/62o5ETvaR1U8CqxVYancy4?si=e1ad09b143584bc6"
  };

  const result = await upsertSong(userId, date, songInput);
  console.log(result);
}

export const testUpsertDay = async(date: string) => {
  const userId: string = '16f8e304-32d6-4ec0-951f-894508506178';

  const dayInput: IDayInput = {
    date: date,
    moodId: 2,
    song: {
      name: "Coming Down",
      artist: "Dum Dum girls",
      url: "https://open.spotify.com/track/62o5ETvaR1U8CqxVYancy4?si=e1ad09b143584bc6"
    },
    note: "This is a slightly edited test message so ignore this, but I will definitely say that today went well. I am very happy with what I have managed to achieve today.",
  }
  
  const result = await upsertDay(userId, dayInput);
  console.log(result);
}