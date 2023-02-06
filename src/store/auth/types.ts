import { IProfile } from '../users/types'

export interface IAuth {
  token: string | null
  profile: IProfile | null
  isLoading: boolean
  error: string | IValidationError[]
}

export interface IAuthError {
  message: string
  __typename: 'AuthError'
}

export interface ILoginResponse {
  data: {
    login: ILoginSuccess | IValidationErrors
  }
}

export interface ILoginRequest {
  query: string
  variables: {
    teamName: string
    password: string
  }
}

export interface IProfileResponse {
  data: {
    profile: IProfileSuccess | IAuthError
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

export interface ILoginSuccess {
  token: string
  profile: IProfile
  __typename: 'Auth'
}

export interface IProfileSuccess extends IProfile {
  __typename?: 'Profile'
}

// type TType = 'Auth' | 'ValidationErrors'
