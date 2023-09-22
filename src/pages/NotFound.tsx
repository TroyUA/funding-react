import React from 'react'
import Button from '../components/Button'
import { ROUTES } from '../router'

const NotFound = () => {
  return (
    <div className="not-found">
      <label className="logo">Ukraine angels</label>
      <h1>404</h1>
      <p>Page not found</p>
      <Button to={ROUTES.HOME} className="not-found__home-btn btn_black">
        HOME
      </Button>
    </div>
  )
}

export default NotFound
