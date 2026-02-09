import React from 'react';

import { useState, useEffect } from 'react';
import { useAuth, useCalendarState, useDayDetails } from '../../hooks';

import { Month, Day, Analytics } from '../';

import { upsertDay } from '../../lib/api/day';
import { buildUpsertPayload } from '../../lib/calendar/buildUpsertPayload';

import type { IMood, IDayRecordState, IDay } from '../../lib/interfaces';

import './home.css';

interface PageProps {
}

const Home: React.FC<PageProps> = ({ }) => {
  const calendarState = useCalendarState();
  const isoDate: string = calendarState.selectedIsoDate;

  const { user } = useAuth();
  
  const { day, refreshDayDetails } = useDayDetails(isoDate);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<IMood | null>(day ? day.mood : null);

  const handleRecordDay = async (dayRecordState: IDayRecordState, mood: IMood | null) => {
    if (user && mood) {
      const upsertPayload = buildUpsertPayload(isoDate, dayRecordState, mood);
      const updatedDay: IDay | null = await upsertDay(user.id, upsertPayload);

      if (updatedDay) {
        refreshDayDetails(isoDate);
        setIsModalOpen(false);
      }
    }
  }

  const handleSelectMood = (mood: IMood) => {
    setSelectedMood(mood);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedMood(day ? day.mood : null);
    refreshDayDetails(isoDate);
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (day && day.mood) {
      setSelectedMood(day.mood);
    } 
    else {
      setSelectedMood(null);
    }
  }, [day]);

  return (
    <>
      <div className="app-page d-flex flex-column mt-3 py-3 px-2 gap-4">
        <div className="top-section d-flex flex-row justify-content-start gap-4">
          <div className="calendar-section p-2 ">
            <Month calendarState={calendarState} />
          </div>
          <div className="current-day-section p-2">
            <Day calendarState={calendarState} day={day} isModalOpen={isModalOpen} selectedMood={selectedMood} onSelectMood={handleSelectMood} onOpenModal={handleOpenModal} onCloseModal={handleCloseModal} onRecordDay={handleRecordDay} />
          </div>
        </div>
        <div className="bottom-section d-flex flex-row align-items-center justify-content-start">
          <div className="analytics-section w-100 p-2">
            <Analytics calendarState={calendarState} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home