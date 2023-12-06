import type { AuthModel } from '../../pages/Login'
import type { ResponseTypes } from '../helpers'
import type { Profile } from '../users/types'

export interface IAuth {
  token: string | null
  profile: Profile | null
}

export interface AuthError {
  message: string
  __typename: ResponseTypes['AUTH_ERROR']
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
  __typename: ResponseTypes['VALIDATION_ERRORS']
}

export interface AuthSuccess extends IAuth {
  __typename: ResponseTypes['AUTH']
}

export interface GetProfileSuccess extends Profile {
  __typename: ResponseTypes['PROFILE']
}

export interface UpdateProfileResponse {
  data: { updateProfile: GetProfileSuccess | ValidationErrors | AuthError }
}

export interface SignUpResponse {
  data: { signUp: AuthSuccess | ValidationErrors }
}

export interface DonateResultSuccess {
  message: string
  __typename: ResponseTypes['DONATE_SUCCESS']
}

export interface RegisterDonateResponse {
  data: { registerDonate: DonateResultSuccess | AuthError | ValidationErrors }
}
