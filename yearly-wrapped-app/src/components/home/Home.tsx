import React from 'react';

import './home.css';

interface PageProps {
}

const Home: React.FC<PageProps> = ({ }) => {

  return (
    <>
      <div className="app-page">
        <h3 className='m-0'>Home</h3>
      </div>
    </>
  )
}

export default Home