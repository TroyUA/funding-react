import React from 'react'
import Button from '../components/Button'

const SignUp = () => {
  const submitHandler: React.FormEventHandler = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <div className="login">
      <div className="sign-up__container container">
        <h1>Sign Up</h1>
        <form className="login__form" onSubmit={submitHandler}>
          <input type="text" className="input" name="teamName" placeholder="Team Name" required />
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
            required
            minLength={6}
          />
          <input
            type="password"
            className="input"
            name="confirm-password"
            placeholder="Confirm Password"
            required
            minLength={6}
          />
          <Button type="submit" className="submit-btn btn_black">
            SIGN UP
          </Button>
        </form>
        <Button
          to={'../login'}
          className="move-to-btn btn_with-image"
          imgSrc={'/src/img/arrow.svg'}
        >
          Log In
        </Button>
      </div>
    </div>
  )
}

export default SignUp
