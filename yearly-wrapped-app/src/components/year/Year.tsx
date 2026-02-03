import React from 'react';

import './year.css';

interface YearProps {
}

const Year: React.FC<YearProps> = ({ }) => {
  return (
    <>
      <div className="app-component">
        <h3 className='m-0'>Year</h3>
      </div>
    </>
  )
}

export default Year