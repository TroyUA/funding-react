import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import Button from './Button'
import { useAppDispatch } from '../hooks/redux'
import { logout } from '../store/auth/slice'
import { classNames } from '../utils'
import { setIsSidebarOpen, toggleOpen } from '../store/layout/slice'
import Sidebar from './Sidebar'

const Header: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const { isOpen } = useAppSelector((state) => state.layout.sidebar)
  const dispatch = useAppDispatch()

  return (
    <header className="header">
      <div className="wrapper">
        <Link to="/" className={'header__logo'}>
          Ukraine Angels
        </Link>
        <Button to="/donation" className="header__register-donation-btn btn_white">
          register donation
        </Button>
        <nav className="header__menu">
          <Button
            to="/profile"
            className={'header__profile-btn btn'}
            imgSrc={'/src/img/user-icon-default.svg'}
            alt={'profile'}
          ></Button>
          {token && (
            <Button
              onClick={() => {
                dispatch(logout())
              }}
              className={'header__logout-btn btn'}
              imgSrc={'/src/img/logout.svg'}
              alt={'logout'}
            ></Button>
          )}

          <button
            className={classNames('header__burger-btn btn')}
            onClick={() => dispatch(setIsSidebarOpen(!isOpen))}
          >
            <div className={classNames('header__burger', isOpen && 'open')}></div>
          </button>
        </nav>
      </div>

      <Sidebar />
    </header>
  )
}

export default Header
