import { IUser } from '../users/types'

export interface IAuth {
  token: string | null
  profile: IUser | null
  isLoading: boolean
  error: string | IValidationError[]
}

export interface ILoginResponse {
  data: {
    data: {
      login: ILogin | IValidationErrors
    }
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

export interface ILogin {
  token: string
  profile: IUser
  __typename: 'Auth'
}

type TTypeName = 'Auth' | 'ValidationErrors'
