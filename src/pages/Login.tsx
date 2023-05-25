import { FormEventHandler, FormEvent, useState } from 'react'
import Button from '../components/Button'
import { authAPI } from '../store/auth/service'
import { z, ZodError } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux'
import { LocalStorageApi } from '../api/localStorage'
import { setCredentials } from '../store/auth/slice'
import Input from '../components/Input'
import { Formik } from 'formik/dist/Formik'

const loginSchema = z.object({
  teamName: z.string().min(3, 'TeamName should be at least 3 symbols long'),
  password: z.string().min(6, 'Password should be at least 6 symbols long'),
})

export type AuthModel = z.infer<typeof loginSchema>

const initialValues = { teamName: '', password: '' }

const Login = () => {
  const [errors, setErrors] = useState(initialValues)
  const navigate = useNavigate()
  const [login, { isError, isLoading }] = authAPI.useLoginMutation()
  const dispatch = useAppDispatch()

  const submitHandler: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    setErrors(initialValues)

    try {
      const validatedForm: AuthModel = loginSchema.parse(data)
      const response = await login(validatedForm).unwrap()
      if (response.__typename === 'Auth') {
        dispatch(setCredentials(response))
        LocalStorageApi.setAccessToken(response.token)
        navigate('/')
      }
      if (response.__typename === 'ValidationErrors') {
        response.errors.forEach((error) =>
          setErrors((prev) => ({ ...prev, [error.key]: error.message }))
        )
      }
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          issue.path.forEach((path) => setErrors((prev) => ({ ...prev, [path]: issue.message })))
        })
      } else console.log(error)
    }
  }

  return (
    <section className="login">
      <div className="login__container container">
        <h1>Log In</h1>
        {/* <Formik initialValues={initialValues} onSubmit={submitHandler}> */}
        <form className="login__form" onSubmit={submitHandler}>
          <Input
            type="text"
            placeholder="Team Name"
            name="teamName"
            required
            errorMsg={errors.teamName}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            required
            errorMsg={errors.password}
          />
          <Button type="submit" className="submit-btn btn_black">
            LOG IN
          </Button>
        </form>
        {/* </Formik> */}
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
