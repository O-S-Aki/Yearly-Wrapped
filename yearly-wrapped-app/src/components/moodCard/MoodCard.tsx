import React from 'react';

import type { IMood } from '../../lib/interfaces';

import './moodCard.css';

interface MoodCardProps {
  mood: IMood;
  dayCount: number;
  totalDays: number;
}

const MoodCard: React.FC<MoodCardProps> = ({ mood, dayCount, totalDays }) => {
  const percentage: number = (dayCount / totalDays) * 100;
  return (
    <>
      <div className="mood-card color-primary background-tertiary prevent-select p-3 d-flex flex-column justify-content-start gap-2">
        <div className={`mood-card-icon background-${mood.label.toLowerCase()}`}></div>
        <div className="mood-card-content mt-1">
          <h5 className="mood-card-percentage text-center m-0">{percentage.toFixed(0)}%</h5>
          <p className="mood-card-count text-center m-0">{dayCount} of {totalDays} days</p>
        </div>
      </div>
    </>
  )
}

export default MoodCard