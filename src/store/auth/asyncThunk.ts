import { axiosApi, GraphQLApi } from '../../api/graphQL'
import { LocalStorageApi } from '../../api/localStorage'
import { AppDispatch } from '../store'
import { authFetchingError, authFetchingStart, authFetchingSuccess } from './slice'
import { ILogin, ILoginResponse, IValidationErrors } from './types'

export interface ILoginRequest {
  query: string
  variables: {
    teamName: string
    password: string
  }
}

export const fetchLogin = (teamName: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(authFetchingStart())
  try {
    const response = await GraphQLApi.fetch<ILoginRequest, ILoginResponse>({
      query: `mutation Login($teamName:String! $password:String!){
  login(input:{teamName:$teamName password:$password}){
    ...on Auth{
      profile{
        teamName
        avatar
        country{
          name
        }
      }
      token
    }
    
    ...on ValidationErrors{
      errors{
        message
        key
      }
    }
__typename
  }
}`,
      variables: {
        teamName,
        password,
      },
    })

    const login = response.data.data.login
    if (login.__typename === 'Auth') {
      dispatch(authFetchingSuccess(login as ILogin))
      setAuthTokenInSystem(login.token)
    } else if ((login.__typename = 'ValidationErrors')) {
      dispatch(authFetchingError(login as IValidationErrors))
    }
  } catch (error) {
    console.log(error)
    dispatch(authFetchingError(JSON.stringify(error)))
  }
}

export function setAuthTokenInSystem(
  token: string,
  params: { setInLocalStorage?: boolean } = {}
): void {
  const { setInLocalStorage = true } = params
  axiosApi.defaults.headers.common.Authorization = `Bearer ${token}`
  if (setInLocalStorage) {
    LocalStorageApi.setAccessToken(token)
  }
}
