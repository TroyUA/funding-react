import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useAppSelector } from '../hooks/redux'
import { classNames } from '../utils'

const Footer: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const { isOpen: isSidebarOpen } = useAppSelector((state) => state.layout.sidebar)
  return (
    <footer className={classNames('footer', isSidebarOpen && 'hide')}>
      <div className="wrapper">
        <nav className="footer__nav">
          <ul className="footer__nav-links">
            <li>
              <Link to={'/funds'} className="footer__nav-link">
                Charity funds
              </Link>
            </li>
            <li>
              <Link to={'/leaderboard'} className="footer__nav-link">
                Leadboard
              </Link>
            </li>
            {!token && (
              <li>
                <Link to={'/auth/login'} className="footer__nav-link">
                  Log In
                </Link>
              </li>
            )}
            <li>
              <Link to={'/donation'} className="footer__nav-link">
                Register donation
              </Link>
            </li>
          </ul>
          <Link to={'#'} className="footer__support-link">
            supportua@gmail.com
          </Link>
        </nav>
        <Button to={'/donation'} className="footer__register-donation-btn btn_black">
          <span className="btn__text">register donation</span>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
