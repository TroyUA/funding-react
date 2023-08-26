import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { AuthModel } from '../../pages/Login'
import { baseQuery } from '../baseQuery'
import {
  IAuthError,
  IAuthRequest,
  IAuthResponse,
  IAuthSuccess,
  IProfileResponse,
  IGetProfileSuccess,
  ValidationErrors,
  SignUpResponse,
  RegisterDonateArgs,
  DonateResultSuccess,
  RegisterDonateResponse,
} from './types'
import { GetMyStatisticResponse, IProfile, IUser } from '../users/types'
import { setProfile } from './slice'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery,
  tagTypes: ['Auth', 'Profile', 'MyStatistic'],
  endpoints: (build) => ({
    login: build.mutation<IAuthSuccess | ValidationErrors, AuthModel>({
      transformResponse: (response: IAuthResponse, _, __) => response.data.login,
      query: (loginArgs) => ({
        url: '',
        method: 'POST',
        body: {
          query: `mutation Login($teamName:String! $password:String!){
  login(input:{teamName:$teamName password:$password}){
    ...on Auth{
      profile{
        teamName
        avatar
        country{ name iso2 emoji id}
        district{ name id}
        city{ name id}
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
          variables: loginArgs,
        } as IAuthRequest,
      }),
    }),
    signUp: build.mutation<IAuthSuccess | ValidationErrors, AuthModel>({
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
        } as IAuthRequest,
      }),
    }),
    getProfile: build.query<IGetProfileSuccess | IAuthError, void>({
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
      transformResponse: (response: IProfileResponse, _, __) => response.data.profile,
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getProfile{
  profile{
    ...on Profile{
      teamName
      avatar
      country{ name iso2 emoji id}
      district{ name id}
      city{ name id}
      
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
    getMyStatistic: build.query<IUser, void>({
      providesTags: ['MyStatistic'],
      transformResponse: (response: GetMyStatisticResponse) => {
        if (response.data.getMyStatistic.__typename === 'Leaderboard') {
          delete response.data.getMyStatistic.__typename
          return response.data.getMyStatistic as IUser
        } else if (response.data.getMyStatistic.__typename === 'AuthError') {
          throw response.data.getMyStatistic as IAuthError
        }
        throw response
      },
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `query GetMyStatistic{
    getMyStatistic{
        ...on Leaderboard{
            avatar
            city{name}
            country{name emoji iso2 id}
            position
            teamName
            totalDonation
        }
        ...on AuthError{
            message
        }
        __typename
    }
}`,
        },
      }),
    }),
    registerDonate: build.mutation<
      DonateResultSuccess | ValidationErrors | IAuthError,
      RegisterDonateArgs
    >({
      transformResponse: (response: RegisterDonateResponse) => response.data.registerDonate,
      query: (registerDonateArgs) => ({
        url: '',
        method: 'POST',
        body: {
          query: `mutation RegisterDonate($file: Upload!
          $amount: Float!
          $fundId: String!){
            registerDonate(file:$file amount:$amount fundId:$fundId){
                ...on DonateResultSuccess{
                  message
                  __typename
                }
                ...on AuthError{
                  message
                  __typename
                }
                ...on ValidationErrors{
                  errors{
                    message
                    key
                  }
                  __typename
                }
            }
          }`,
          variables: registerDonateArgs,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useGetProfileQuery } = authAPI
