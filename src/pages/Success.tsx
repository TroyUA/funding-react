import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Success = () => {
  return (
    <div className="success">
      <div className="wrapper">
        <div className="check"></div>
        <h1>All's Good!</h1>
        <p className="success__message">
          You screenshot has been sent. Once it will be approved, it will be added to your general
          balance
        </p>
        <Button to="/" className="return-home-btn btn_black">
          return home
        </Button>
        <Link to={'/donation'} className="donation-link">
          Register another donation
        </Link>
      </div>
    </div>
  )
}

export default Success
