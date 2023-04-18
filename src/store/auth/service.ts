import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { TLoginModel } from '../../pages/Login'
import { baseQuery } from '../baseQuery'
import {
  IAuthError,
  ILoginRequest,
  ILoginResponse,
  ILoginSuccess,
  IProfileResponse,
  IValidationErrors,
} from './types'
import { IProfile } from '../users/types'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery,
  tagTypes: ['Auth', 'Profile'],
  endpoints: (build) => ({
    login: build.mutation<ILoginSuccess | IValidationErrors, TLoginModel>({
      transformResponse: (response: ILoginResponse, _, __) => {
        if (response.data.login.__typename === 'Auth') {
          // delete response.data.login.__typename
          return response.data.login as ILoginSuccess
        }
        if (response.data.login.__typename === 'ValidationErrors') {
          throw response.data.login as IValidationErrors
        }
        throw response
      },
      query: ({ teamName, password }) => ({
        url: '',
        method: 'POST',
        body: {
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
        } as ILoginRequest,
      }),
    }),
    getProfile: build.query<IProfile, void>({
      transformResponse: (response: IProfileResponse, _, __) => {
        if (response.data.profile.__typename === 'Profile') {
          delete response.data.profile.__typename
          return response.data.profile as IProfile
        }
        if (response.data.profile.__typename === 'AuthError') {
          throw response.data.profile as IAuthError
        }
        throw response.data
      },
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getProfile{
  profile{
    ...on Profile{
      teamName
      avatar
      country{ name iso2 emoji}
      district{ name }
      city{ name }
      
      __typename
    }
    
    ...on AuthError{
			message
      __typename
    }
  }
}`,
        },
      }),
      providesTags: ['Profile'],
    }),
  }),
})

export const { useLoginMutation, useGetProfileQuery } = authAPI
