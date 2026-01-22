import React from 'react';

import './home.css';

interface PageProps {
}

const Home: React.FC<PageProps> = ({ }) => {

  return (
    <>
      <p>Home</p>
      <div>
      <h1>2026 Wrapped</h1>

      {/*<p>Logged in as {user.email}</p>
      <button className="btn btn-secondary" onClick={signOut}>Log out</button>*/}

    </div>
    </>
  )
}

export default Home