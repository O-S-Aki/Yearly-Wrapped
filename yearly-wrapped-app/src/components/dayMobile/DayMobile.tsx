import React from 'react'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../hooks';

import './dayMobile.css';

interface DayMobileProps {
}

const DayMobile: React.FC<DayMobileProps> = ({ }) => {
  const { user } = useAuth();
  const { isoDate } = useParams();


  return (
    <div className='app-page d-flex flex-column mt-3 gap-2'>
      {isoDate}
    </div>
  )
}

export default DayMobile