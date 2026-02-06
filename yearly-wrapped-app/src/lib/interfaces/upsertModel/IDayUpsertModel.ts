import type ISongUpsertModel from "./ISongUpsertModel";

export default interface IDayUpsertModel {
  date: string;
  moodId: number;
  song?: ISongUpsertModel | null;
  note?: string | null;
}