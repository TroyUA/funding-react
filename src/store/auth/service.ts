import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { TLoginModel } from '../../pages/Login'
import { axiosBaseQuery } from '../baseQuery'
import {
  ILoginRequest,
  ILoginResponse,
  ILoginSuccess,
  IProfileResponse,
  IValidationErrors,
} from './types'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    login: build.mutation<ILoginSuccess | IValidationErrors, TLoginModel>({
      transformResponse: (response: ILoginResponse, _, __) => {
        return response.data.login
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
    getProfile: build.query({
      transformResponse: (response: IProfileResponse, _, __) => response.data.profile,
      query: () => ({
        url: '',
        method: 'POST',
        // credentials: 'include',
        body: {
          query: `query getProfile{
  profile{
    ...on Profile{
      teamName
      avatar
      country{id name iso2 emoji}
      district{id name country_id}
      city{id name country_id district_id}
      
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
    }),
  }),
})

export const { useLoginMutation, useGetProfileQuery } = authAPI
