import { useState, useEffect } from 'react';
import { useDayDetails } from '..';

import { buildUpsertPayload } from '../../lib/calendar/buildUpsertPayload';
import { upsertDay } from '../../lib/api/day';

import type { IDay, IMood, IDayRecordState, IUser, IDayComponentState } from '../../lib/interfaces';

export default function useDayComponentState(user: IUser | null, isoDate: string): IDayComponentState {
  const { day, refreshDayDetails } = useDayDetails(isoDate);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<IMood | null>(day ? day.mood : null);

  useEffect(() => {
    if (day && day.mood) {
      setSelectedMood(day.mood);
    } 
    else {
      setSelectedMood(null);
    }
  }, [day]);

  const recordDay = async (dayRecordState: IDayRecordState, mood: IMood | null): Promise<boolean> => {
    if (user && mood) {
      const upsertPayload = buildUpsertPayload(isoDate, dayRecordState, mood);
      const updatedDay: IDay | null = await upsertDay(user.id, upsertPayload);

      if (updatedDay) {
        refreshDayDetails(isoDate);
        setIsModalOpen(false);

        return true;
      }
    }

    return false;
  }

  const selectMood = (mood: IMood) => {
    setSelectedMood(mood);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedMood(day ? day.mood : null);
    refreshDayDetails(isoDate);
    setIsModalOpen(false);
  }

  return { day, isModalOpen, selectedMood, selectMood, openModal, closeModal, recordDay };
}