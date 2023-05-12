import { FormEventHandler } from 'react'
import Button from '../components/Button'
import { ZodError, z } from 'zod'
import { authAPI } from '../store/auth/service'
import { useNavigate } from 'react-router-dom'
import type { AuthModel } from './Login'

const signupSchema = z
  .object({
    teamName: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      })
    }
  })

type SignUpFormModel = z.infer<typeof signupSchema>

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp, { isLoading }] = authAPI.useSignUpMutation()
  const submitHandler: FormEventHandler = async (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData) as unknown as SignUpFormModel

    try {
      const validatedForm: SignUpFormModel = signupSchema.parse(data)
      const { confirmPassword, ...signUpArgs } = validatedForm
      const response = await signUp(signUpArgs as AuthModel).unwrap()
      if (response.__typename === 'Auth') {
        navigate('/')
      }
      if (response.__typename === 'ValidationErrors') {
        console.log('ValidationErrors: ', response.errors)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="sign-up">
      <div className="sign-up__container container">
        <h1>Sign Up</h1>
        <form className="sign-up__form" onSubmit={submitHandler}>
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
            name="confirmPassword"
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
