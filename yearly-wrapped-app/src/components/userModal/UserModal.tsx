import React from 'react';

import { useState } from 'react';

import type { IUser } from '../../lib/interfaces';

import './userModal.css';

interface PageProps {
  user: IUser | null,
  logout: () => void,
}

const UserModal: React.FC<PageProps> = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((state: any) => !state)
  }

  const closeAndLogout = () => {
    toggleDropdown();
    logout();
  }

  return (
    <>
      <div className='user-icon-container px-2 py-1'>
        <h4 className='m-0'>
          <i className='user-icon bi bi-person-fill' onClick={toggleDropdown}></i>
        </h4>
      </div>
      
      {
        isOpen && user ? (
          <>
            <div className="user-modal-container position-absolute">
              <div onClick={toggleDropdown} className=" dropdown-section p-2 pb-1 m-1">
                  <p className="m-0">{user.email}</p>
                </div>
              <div onClick={closeAndLogout} className="dropdown-section clickable p-2 pt-1 m-1">
                <p className="m-0"><i className="bi bi-box-arrow-left"></i> Log Out</p>
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default UserModal