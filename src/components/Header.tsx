import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import Button from './Button'
import { useAppDispatch } from '../hooks/redux'
import { logout } from '../store/auth/slice'

const Header: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="header">
      <div className="wrapper">
        <Link to="/" className={'header__logo'}>
          Ukraine Angels
        </Link>
        {/* <label className="header__logo">Ukraine angels</label> */}
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
              onClick={() => handleLogout()}
              className={'header__logout-btn btn'}
              imgSrc={'/src/img/logout.svg'}
              alt={'logout'}
            ></Button>
          )}

          <button className="header__burger-btn btn">
            <div className="header__burger"></div>
          </button>
        </nav>
      </div>

      <div className="header__burger-sidebar">
        <div className="header__burger-nav-links">
          <Button to="#" className="btn_with-image_white" imgSrc="/src/img/arrow.svg" alt="arrow">
            Charity Funds
          </Button>
          <Button to="#" className="btn_with-image_white" imgSrc="/src/img/arrow.svg" alt="arrow">
            Donations Leaderboards
          </Button>
        </div>
        <a href="#" className="header__burger-contact-us">
          supportua@gmail.com
        </a>
      </div>
    </header>
  )
}

export default Header
