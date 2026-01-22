import type { IMood } from './';

export default interface ISimpleDay {
  id: string;
  date: Date;
  mood: IMood;
}