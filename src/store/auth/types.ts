import { AuthModel } from '../../pages/Login'
import { Profile } from '../users/types'

export interface IAuth {
  token: string | null
  profile: Profile | null
}

export interface AuthError {
  message: string
  __typename: 'AuthError'
}

export interface AuthResponse {
  data: {
    login: AuthSuccess | ValidationErrors
  }
}

export interface AuthRequest {
  query: string
  variables: AuthModel
}

export interface GetProfileResponse {
  data: {
    profile: GetProfileSuccess | AuthError
  }
}

export interface ValidationError {
  message: string
  key: string
}

export interface ValidationErrors {
  errors: ValidationError[]
  __typename: 'ValidationErrors'
}

export interface AuthSuccess extends IAuth {
  __typename: 'Auth'
}

export interface GetProfileSuccess extends Profile {
  __typename: 'Profile'
}

export interface UpdateProfileResponse {
  data: { updateProfile: GetProfileSuccess | ValidationErrors | AuthError }
}

export interface SignUpResponse {
  data: { signUp: AuthSuccess | ValidationErrors }
}

export interface DonateResultSuccess {
  message: string
  __typename: 'DonateResultSuccess'
}

export interface RegisterDonateResponse {
  data: { registerDonate: DonateResultSuccess | AuthError | ValidationErrors }
}
