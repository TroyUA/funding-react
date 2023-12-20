import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { LocalStorageApi } from '../api/localStorage'
import Button from '../components/Button'
import Input from '../components/Input'
import { useAppDispatch } from '../hooks/redux'
import { ROUTES } from '../router'
import { authAPI } from '../store/auth/service'
import { setCredentials } from '../store/auth/slice'

const loginSchema = z.object({
  teamName: z.string().min(3, 'TeamName should be at least 3 characters long'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
})

export type AuthModel = z.infer<typeof loginSchema>

const Login = () => {
  const initialValues: AuthModel = { teamName: '', password: '' }
  const navigate = useNavigate()
  const [login] = authAPI.useLoginMutation()
  const dispatch = useAppDispatch()

  return (
    <section className="login">
      <div className="login__container container">
        <h1>Log In</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(loginSchema)}
          validateOnChange={false}
          onSubmit={async (values, { setFieldError }) => {
            try {
              const response = await login(values).unwrap()
              switch (response.__typename) {
                case 'Auth':
                  dispatch(setCredentials(response))
                  LocalStorageApi.setAccessToken(response.token!)
                  navigate(ROUTES.HOME)
                  break
                case 'ValidationErrors':
                  response.errors.forEach((error) => setFieldError(error.key, error.message))
                  break
                default:
                  throw new Error('Unexpected response')
              }
            } catch (err) {
              console.log(err)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="login__form">
              <Field placeholder="Team Name" name="teamName" as={Input} />
              <Field type="password" placeholder="Password" name="password" as={Input} />
              <Button type="submit" disabled={isSubmitting} className="submit-btn btn_black">
                LOG IN
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          to={ROUTES.SIGN_UP}
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
