import { client } from '../../supabaseClient';
import { mapResponseToSong } from '../../mappers';

import type { ISong, ISongUpsertModel } from '../../interfaces';

export async function upsertSong(userId: string, date: string, songInput: ISongUpsertModel): Promise<ISong | null> {
  const response = await client
  .from("Song")
  .upsert(
    {
      Name: songInput.name,
      Artist: songInput.artist,
      Url: songInput.url,
      UserId: userId,
      Date: date
    },
    { onConflict: 'UserId,Date' }
  )
  .select(`
    Id,
    Name,
    Artist,
    Url,
    UserId,
    Date
  `)
  .single();

  if (response.error) {
    throw response.error;
  }

  const upsertedSong: any = response.data;
  const song: ISong | null = upsertedSong ? mapResponseToSong(upsertedSong) : null;

  return song;
}