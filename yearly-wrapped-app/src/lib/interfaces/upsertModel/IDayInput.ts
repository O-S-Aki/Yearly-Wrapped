import type ISongInput from "./ISongInput";

export default interface IDayInput {
  date: string;
  moodId: number;
  song?: ISongInput | null;
  note?: string | null;
}