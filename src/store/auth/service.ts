import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { AuthModel } from '../../pages/Login'
import { baseQuery } from '../baseQuery'
import {
  IAuthError,
  IAuthRequest,
  IAuthResponse,
  IAuthSuccess,
  IProfileResponse,
  IProfileSuccess,
  IValidationErrors,
  SignUpResponse,
  UpdateProfileArgs,
  UpdateProfileResponse,
} from './types'
import { GetMyStatisticResponse, IProfile, IUser } from '../users/types'
import { setCredentials, setProfile } from './slice'
import { LocalStorageApi } from '../../api/localStorage'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery,
  tagTypes: ['Auth', 'Profile', 'MyStatistic'],
  endpoints: (build) => ({
    login: build.mutation<IAuthSuccess | IValidationErrors, AuthModel>({
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
    signUp: build.mutation<IAuthSuccess | IValidationErrors, AuthModel>({
      transformResponse: (response: SignUpResponse, _, __) => response.data.signUp,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.__typename === 'Auth') {
            dispatch(setCredentials(data))
            LocalStorageApi.setAccessToken(data.token)
          }
        } catch (error) {
          console.log(error)
        }
      },
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
    getProfile: build.query<IProfileSuccess | IAuthError, void>({
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
    updateProfile: build.mutation<
      IProfileSuccess | IValidationErrors | IAuthError,
      Partial<UpdateProfileArgs>
    >({
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
      transformResponse: (response: UpdateProfileResponse) => response.data.updateProfile,
      query: (updateProfileArgs) => ({
        url: '',
        method: 'POST',
        body: {
          query: `mutation UpdateProfile($avatar: Upload
          $teamName: String
          $countryId: Int
          $districtId: Int
          $cityId: Int
          $password: String){
              updateProfile(input:{avatar:$avatar teamName:$teamName countryId:$countryId districtId:$districtId cityId:$cityId password:$password}){
          ...on Profile{
              teamName
                avatar
                country{ name iso2 emoji id}
                district{name id}
                city{ name id }
                __typename
          }
          ...on AuthError{
              message
          }
          ...on ValidationErrors{
            errors{
                message
                key
            }     
          }}}`,
          variables: updateProfileArgs,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useGetProfileQuery } = authAPI
