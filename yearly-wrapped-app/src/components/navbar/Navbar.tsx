import React from 'react';

import { Link } from 'react-router-dom';
import { UserModal } from '../';

import type { IUser } from '../../lib/interfaces';

import './navbar.css';

interface NavbarProps {
  user: IUser | null,
  logout: () => void,
}

const Navbar: React.FC<NavbarProps> = ({ user, logout }) => {
  
  return (
    <nav className="navbar background-background navbar-expand-sm navbar-dark p-2">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand m-0 d-flex align-items-center flex-row" to="/home">
          <h4 className="bi bi-calendar-heart-fill color-primary navbar-icon m-0 me-2"></h4>
          <h6 className="m-0 ms-2 color-primary navbar-title">Daily Tracker</h6>
        </Link>
        <div className="profile-details-container d-flex flex-row align-items-center justify-content-end">
        {
          user ? (
            <>
              <UserModal user={user} logout={logout} />
            </>) : (<></>)
        }
        </div>
      </div>
    </nav>
  )
}

export default Navbar