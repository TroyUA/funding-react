import React from 'react'
import Button from './Button'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <label className="header__logo">Ukraine angels</label>
        <button type="button" className="header__register-donation-btn btn_white">
          <span className="btn__text">register donation</span>
        </button>
        <nav className="header__menu">
          <Button
            className={'header__profile-btn btn'}
            imgSrc={'/src/img/user-icon-default.svg'}
            alt={'user icon'}
          ></Button>
          <button className="header__burger-btn btn">
            <div className="header__burger"></div>
          </button>
        </nav>
      </div>

      <div className="header__burger-sidebar">
        <div className="header__burger-nav-links">
          <a href="#" className="btn_with-image_white">
            <span className="btn__text">Charity Funds</span>
            <span className="btn__icon">
              <img src="@img/arrow.svg" alt="arrow" />
            </span>
          </a>
          <a href="#" className="btn_with-image_white">
            <span className="btn__text">Donations Leaderboards</span>
            <span className="btn__icon">
              <img src="@img/arrow.svg" alt="arrow" />
            </span>
          </a>
        </div>
        <a href="#" className="header__burger-contact-us">
          supportua@gmail.com
        </a>
      </div>
    </header>
  )
}

export default Header
