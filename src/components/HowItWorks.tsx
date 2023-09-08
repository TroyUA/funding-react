import React from 'react'
import Button from './Button'
import { ROUTES } from '../routes'

const HowItWorks = () => {
  return (
    <section className="how-it-works section">
      <h1>how it works</h1>
      <div className="how-it-works__steps">
        <article className="how-it-works__step article">
          <img
            className="how-it-works__step-img"
            src="src\img\create-account.png"
            alt="create account"
          />
          <h3 className="how-it-works__step-description">Create an account</h3>
        </article>
        <article className="how-it-works__step article">
          <img
            className="how-it-works__step-img"
            src="src\img\submit-donation.png"
            alt="submit donation"
          />
          <h3 className="how-it-works__step-description">Submit donation request</h3>
        </article>
        <article className="how-it-works__step article">
          <img className="how-it-works__step-img" src="src\img\compete.png" alt="compete" />
          <h3 className="how-it-works__step-description">Compete with others</h3>
        </article>
      </div>
      <Button to={ROUTES.DONATION} className="how-it-works__register-donation-btn btn_black">
        <span className="btn__text">register donation</span>
      </Button>
    </section>
  )
}

export default HowItWorks
