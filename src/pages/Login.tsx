import type { FormEventHandler, FormEvent } from 'react'
import Button from '../components/Button'
import { authAPI } from '../store/auth/service'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux'
import { LocalStorageApi } from '../api/localStorage'
import { setCredentials } from '../store/auth/slice'

const loginSchema = z.object({
  teamName: z.string().min(3),
  password: z.string().min(6),
})

export type AuthModel = z.infer<typeof loginSchema>

const Login = () => {
  const navigate = useNavigate()
  const [login, { isError, isLoading }] = authAPI.useLoginMutation()
  const dispatch = useAppDispatch()

  const submitHandler: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      const validatedForm: AuthModel = loginSchema.parse(data)
      const response = await login(validatedForm).unwrap()
      if (response.__typename === 'Auth') {
        dispatch(setCredentials(response))
        LocalStorageApi.setAccessToken(response.token)
      }
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
          <input type="text" className="input" placeholder="Team Name" name="teamName" required />
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            required
            min={6}
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
