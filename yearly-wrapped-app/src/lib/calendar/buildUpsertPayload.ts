import type { IDayRecordState, IMood, IDayUpsertModel, ISongUpsertModel } from "../interfaces";

export function buildUpsertPayload(date: string, dayRecordState: IDayRecordState, mood: IMood): IDayUpsertModel {
  const songUpsertModel: ISongUpsertModel = {
    name: dayRecordState.songName,
    artist: dayRecordState.songArtist,
    url: dayRecordState.songUrl,
  }
  
  const upsertPayload: IDayUpsertModel = {
    date: date,
    moodId: mood.id,
    song: songUpsertModel,
    note: dayRecordState.note,
  }

  return upsertPayload
}