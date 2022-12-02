import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__nav">
          <ul className="footer__nav-links">
            <li className="footer__nav-link">
              <a>Charity funds</a>
            </li>
            <li className="footer__nav-link">
              <a>Leadboard</a>
            </li>
            <li className="footer__nav-link">
              <a>Log In</a>
            </li>
            <li className="footer__nav-link">
              <a>Register donation</a>
            </li>
          </ul>
          <a href="" className="footer__support-link">
            supportua@gmail.com
          </a>
        </nav>
        <button className="footer__register-donation-btn btn_black" type="button">
          <span className="btn__text">register donation</span>
        </button>
      </div>
    </footer>
  )
}

export default Footer
