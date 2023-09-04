import React from 'react'
import Button from '../components/Button'

const NotFound = () => {
  return (
    <div className="not-found">
      <label className="logo">Ukraine angels</label>
      <h1>404</h1>
      <p>Page not found</p>
      <Button to="/" className="not-found__home-btn btn_black">
        HOME
      </Button>
    </div>
  )
}

export default NotFound
