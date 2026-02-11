import type { IDay, IMood, IDayRecordState } from '../'

export default interface IDayComponentState {
  day: IDay | null;
  isModalOpen: boolean;
  selectedMood: IMood | null;
  selectMood: (mood: IMood) => void;
  openModal: () => void;
  closeModal: () => void;
  recordDay: (dayRecordState: IDayRecordState, mood: IMood | null) => Promise<boolean>;
}