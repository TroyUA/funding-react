import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useAppSelector } from '../hooks/redux'
import { classNames } from '../utils'
import { ROUTES } from '../router'

const Footer: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const { isOpen: isSidebarOpen } = useAppSelector((state) => state.layout.sidebar)

  return (
    <footer
      className={classNames(
        'footer',
        isSidebarOpen && 'hide'
        // isOnCertainePage && 'on-certain-page'
      )}
    >
      <div className="wrapper">
        <nav className="footer__nav">
          <ul className="footer__nav-links">
            <li>
              <Link to={ROUTES.FUNDS} className="footer__nav-link">
                Charity funds
              </Link>
            </li>
            <li>
              <Link to={ROUTES.LEADERBOARD} className="footer__nav-link">
                Leadboard
              </Link>
            </li>
            {!token && (
              <li>
                <Link to={ROUTES.LOGIN} className="footer__nav-link">
                  Log In
                </Link>
              </li>
            )}
            <li>
              <Link to={ROUTES.DONATION} className="footer__nav-link">
                Register donation
              </Link>
            </li>
          </ul>
          <a href={'#'} className="footer__support-link">
            supportua@gmail.com
          </a>
        </nav>
        <Button to={ROUTES.DONATION} className="footer__register-donation-btn btn_black">
          <span className="btn__text">register donation</span>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
