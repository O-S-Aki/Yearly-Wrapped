import type { IMood, ISong, IMealHealth } from '../';

export default interface IDay {
  id: string;
  userId: string;
  date: Date;
  isoDate: string;
  note?: string | null;
  mood: IMood;
  song?: ISong | null;
  mealHealth?: IMealHealth | null;
}