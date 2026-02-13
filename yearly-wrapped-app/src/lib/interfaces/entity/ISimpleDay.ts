import type { IMood } from '../';

export default interface ISimpleDay {
  id: string;
  date: string;
  mood: IMood;
}