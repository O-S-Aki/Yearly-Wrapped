import { client } from '../../supabaseClient';

import { upsertSong } from './upsertSong';
import { mapResponseToDay } from '../../mappers';

import type { IDay, IDayUpsertModel, ISong } from '../../interfaces';

export async function upsertDay(userId: string, dayInput: IDayUpsertModel): Promise<IDay | null> {
  const songInput: ISong | null = dayInput.song ? await upsertSong(userId, dayInput.date, dayInput.song) : null;

  const response = await client
  .from("Day")
  .upsert(
    {
      UserId: userId,
      Date: dayInput.date,
      Note: dayInput.note,
      MoodId: dayInput.moodId,
      SongId: songInput ? songInput.id : null,
    },
    { onConflict: 'UserId,Date' }
  )
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
  .single();

  if (response.error) {
    throw response.error;
  }

  const upsertedDay: any = response.data;
  const day: IDay | null = upsertedDay ? mapResponseToDay(upsertedDay) : null;

  return day;
}
