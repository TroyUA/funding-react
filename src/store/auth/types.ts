import { AuthModel } from '../../pages/Login'
import { IProfile } from '../users/types'

export interface IAuth {
  token: string | null
  profile: IProfile | null
}

export interface IAuthError {
  message: string
  __typename: 'AuthError'
}

export interface IAuthResponse {
  data: {
    login: IAuthSuccess | IValidationErrors
  }
}

export interface IAuthRequest {
  query: string
  variables: AuthModel
}

export interface IProfileResponse {
  data: {
    profile: IGetProfileSuccess | IAuthError
  }
}

export interface IValidationError {
  message: string
  key: string
}

export interface IValidationErrors {
  errors: IValidationError[]
  __typename: 'ValidationErrors'
}

export interface IAuthSuccess {
  token: string
  profile: IProfile
  __typename: 'Auth'
}

export interface IGetProfileSuccess extends IProfile {
  __typename: 'Profile'
}

export interface UpdateProfileArgs {
  teamName: string
  avatar: File
  countryId: number
  districtId: number
  cityId: number
  password: string
}

export interface UpdateProfileResponse {
  data: { updateProfile: IGetProfileSuccess | IValidationErrors | IAuthError }
}

export interface SignUpResponse {
  data: { signUp: IAuthSuccess | IValidationErrors }
}
