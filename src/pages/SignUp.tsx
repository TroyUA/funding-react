import { FormEventHandler } from 'react'
import Button from '../components/Button'
import { ZodError, z } from 'zod'
import { authAPI } from '../store/auth/service'
import { useNavigate } from 'react-router-dom'
import type { AuthModel } from './Login'
import { Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import Input from '../components/Input'
import { useAppDispatch } from '../hooks/redux'
import { setCredentials } from '../store/auth/slice'
import { LocalStorageApi } from '../api/localStorage'
import { ROUTES } from '../routes'

const signupSchema = z
  .object({
    teamName: z.string().min(3, 'TeamName should be at least 3 characters long'),
    password: z.string().min(6, 'Password should be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords should match',
        path: ['confirmPassword'],
      })
    }
  })

// type SignUpFormModel = z.infer<typeof signupSchema>

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp, { isLoading }] = authAPI.useSignUpMutation()
  const dispatch = useAppDispatch()

  return (
    <section className="sign-up">
      <div className="sign-up__container container">
        <h1>Sign Up</h1>
        <Formik
          initialValues={{ teamName: '', password: '', confirmPassword: '' }}
          validateOnChange={false}
          validationSchema={toFormikValidationSchema(signupSchema)}
          onSubmit={async (values, { setFieldError }) => {
            try {
              const response = await signUp(values).unwrap()
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
            <Form className="sign-up__form">
              <Field type="text" name="teamName" placeholder="Team Name" as={Input} />
              <Field type="password" name="password" placeholder="Password" as={Input} />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                as={Input}
              />
              <Button type="submit" disabled={isSubmitting} className="submit-btn btn_black">
                SIGN UP
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          to={ROUTES.LOGIN}
          className="move-to-btn btn_with-image"
          imgSrc={'/src/img/arrow.svg'}
        >
          Log In
        </Button>
      </div>
    </section>
  )
}

export default SignUp
