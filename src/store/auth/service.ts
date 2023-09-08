import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { AuthModel } from '../../pages/Login'
import { baseQuery } from '../baseQuery'
import type {
  AuthError,
  AuthRequest,
  AuthResponse,
  AuthSuccess,
  GetProfileResponse,
  GetProfileSuccess,
  ValidationErrors,
  SignUpResponse,
} from './types'
import { GetMyStatisticResponse, GetLeaderboardSuccess } from '../users/types'
import { setProfile } from './slice'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery,
  tagTypes: ['Auth', 'Profile', 'MyStatistic'],
  endpoints: (build) => ({
    login: build.mutation<AuthSuccess | ValidationErrors, AuthModel>({
      transformResponse: (response: AuthResponse, _, __) => response.data.login,
      query: (loginArgs) => ({
        url: '',
        method: 'POST',
        body: {
          query: `mutation Login($teamName:String! $password:String!){login(input:{teamName:$teamName password:$password}){ ...on Auth{profile { teamName avatar country{ name iso2 emoji id} district{ name id} city{ name id}} token } ...on ValidationErrors{ errors{ message key }} __typename }}`,
          variables: loginArgs,
        } as AuthRequest,
      }),
    }),
    signUp: build.mutation<AuthSuccess | ValidationErrors, AuthModel>({
      transformResponse: (response: SignUpResponse, _, __) => response.data.signUp,
      query: (signUpArgs) => ({
        url: '',
        method: 'POST',
        body: {
          query: `mutation SignUp($teamName:String! $password:String!){
  signUp(input:{teamName:$teamName password:$password}){
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
          variables: signUpArgs,
        } as AuthRequest,
      }),
    }),
    getProfile: build.query<GetProfileSuccess | AuthError, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.__typename === 'Profile') {
            const { __typename, ...profile } = data
            dispatch(setProfile(profile))
          }
        } catch (err) {
          console.log(err)
        }
      },
      transformResponse: (response: GetProfileResponse, _, __) => response.data.profile,
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getProfile{ profile{ ...on Profile{ teamName avatar country{ name iso2 emoji id} district{ name id} city{ name id}} ...on AuthError{ message } __typename  }}`,
        },
      }),
      providesTags: ['Profile'],
    }),
    getMyStatistic: build.query<AuthError | GetLeaderboardSuccess, void>({
      providesTags: ['MyStatistic'],
      transformResponse: (response: GetMyStatisticResponse) => response.data.getMyStatistic,
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `query GetMyStatistic{ getMyStatistic{ ...on Leaderboard{ avatar city{name} country{name emoji iso2 id} position teamName totalDonation} ...on AuthError{ message } __typename }}`,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useGetProfileQuery } = authAPI
