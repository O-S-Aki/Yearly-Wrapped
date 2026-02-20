import React from 'react';

import { useNavigate } from 'react-router-dom';
import { UserModal } from '../';

import { useIsMobile } from '../../hooks';

import type { IUser } from '../../lib/interfaces';

import './navbar.css';

interface NavbarProps {
  user: IUser | null,
  logout: () => void,
}

const Navbar: React.FC<NavbarProps> = ({ user, logout }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <nav className="navbar background-background navbar-expand-sm navbar-dark p-2">
      <div className="container-fluid p-0 d-flex flex-row align-items-center justify-content-start gap-3">
        {
          isMobile ? (
          <>
            <div className="profile-details-container d-flex flex-row align-items-center justify-content-start">
            {
              user ? (
                <>
                  <UserModal user={user} logout={logout} />
                </>) : (<></>)
            }
            </div>
            <h6 className="m-0 color-primary navbar-title" onClick={() => navigate('/home')}>Daily Tracker</h6>
            <p className="m-0 color-primary navbar-link" onClick={() => navigate('/home')}>Home</p>
          </>) : (
          <>
            <div className="navbar-brand m-0 d-flex align-items-center flex-row" onClick={() => navigate('/home')}>
              <h4 className="bi bi-calendar-heart-fill color-primary navbar-icon m-0 me-2"></h4>
              <h6 className="m-0 ms-2 color-primary navbar-title">Daily Tracker</h6>
            </div>
            <div className="profile-details-container d-flex flex-row align-items-center justify-content-end">
            {
              user ? (
                <>
                  <UserModal user={user} logout={logout} />
                </>) : (<></>)
            }
            </div>
          </>)
        }
        
      </div>
    </nav>
  )
}

export default Navbar