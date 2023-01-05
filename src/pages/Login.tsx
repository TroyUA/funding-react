import { useEffect, useRef } from 'react'
import type { FormEventHandler, FormEvent } from 'react'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchLogin } from '../store/auth/asyncThunk'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

const loginSchema = z.object({
  teamName: z.string().min(3),
  password: z.string().min(6),
})

export type TLoginFormInput = z.infer<typeof loginSchema>

const Login = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const auth = useAppSelector((state) => state.auth)

  const submitHandler: FormEventHandler = (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      const validatedForm: TLoginFormInput = loginSchema.parse(data)
      dispatch(fetchLogin(validatedForm.teamName, validatedForm.password))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="login">
      <div className="login__container container">
        <h1>Log In</h1>
        <form className="login__form" onSubmit={submitHandler}>
          <input
            type="text"
            className="input"
            placeholder="Team Name"
            name="teamName"
            required
            ref={nameRef}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            required
            min={6}
            ref={passwordRef}
          />
          <Button type="submit" className="submit-btn btn_black">
            LOG IN
          </Button>
        </form>
        <Button
          to={'../sign-up'}
          className="move-to-btn btn_with-image"
          imgSrc={'/src/img/arrow.svg'}
        >
          Sign Up
        </Button>
      </div>
    </section>
  )
}

export default Login
