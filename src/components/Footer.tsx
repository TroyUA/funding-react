import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import { useAppSelector } from '../hooks/redux'
import { classNames } from '../utils'
import { ROUTES } from '../routes'

const Footer: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth)
  const { isOpen: isSidebarOpen } = useAppSelector((state) => state.layout.sidebar)
  const { pathname } = useLocation()
  const { DONATION, LOGIN, SIGN_UP, SUCCESS } = ROUTES
  const isOnCertainePage = ([DONATION, LOGIN, SIGN_UP, SUCCESS] as string[]).includes(pathname)
  console.log({ isOnCertainePage, isSidebarOpen })

  return (
    <footer className={classNames('footer', (isSidebarOpen || isOnCertainePage) && 'hide')}>
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
