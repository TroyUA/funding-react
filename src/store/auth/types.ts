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
    login: IAuthSuccess | ValidationErrors
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

export interface ValidationError {
  message: string
  key: string
}

export interface ValidationErrors {
  errors: ValidationError[]
  __typename: 'ValidationErrors'
}

export interface IAuthSuccess extends IAuth {
  __typename: 'Auth'
}

export interface IGetProfileSuccess extends IProfile {
  __typename: 'Profile'
}

export interface UpdateProfileArgs {
  teamName?: string
  avatar?: File | null
  countryId?: number
  districtId?: number
  cityId?: number
  password?: string
}

export interface UpdateProfileResponse {
  data: { updateProfile: IGetProfileSuccess | ValidationErrors | IAuthError }
}

export interface SignUpResponse {
  data: { signUp: IAuthSuccess | ValidationErrors }
}

export interface RegisterDonateArgs {
  file: File
  amount: number
  fundId: string
}

export interface DonateResultSuccess {
  message: string
  __typename: 'DonateResultSuccess'
}

export interface RegisterDonateResponse {
  data: { registerDonate: DonateResultSuccess | IAuthError | ValidationErrors }
}
