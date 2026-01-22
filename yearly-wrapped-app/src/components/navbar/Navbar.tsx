import React from 'react';

import { Link } from 'react-router-dom';
import { UserModal } from '../';

import type { IUser } from '../../lib/interfaces';

import './navbar.css';

interface PageProps {
  user: IUser | null,
  logout: () => void,
}

const Navbar: React.FC<PageProps> = ({ user, logout }) => {
  
  return (
    <nav className="navbar navbar-expand-sm navbar-dark p-3">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex align-items-center flex-row">
          <Link className="navbar-brand m-0" to="/">
            <h2 className="bi bi-calendar-heart-fill navbar-icon m-0 me-2"></h2>
          </Link>
          <h5 className="m-0 ms-2 navbar-title">Yearly Wrapped</h5>
        </div>
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