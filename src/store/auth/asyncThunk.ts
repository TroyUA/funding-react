// import { GraphQLApi } from '../../api/graphQL'
// import { TLoginModel } from '../../pages/Login'
// import { AppDispatch } from '..'
// import {
//   authFetchingError,
//   authFetchingStart,
//   setCredentials,
//   profileFetchingError,
//   setProfile,
// } from './slice'
// import {
//   ILoginSuccess,
//   ILoginResponse,
//   IValidationErrors,
//   ILoginRequest,
//   IProfileResponse,
//   IProfileSuccess,
//   IAuthError,
// } from './types'
// import { setAuthTokenInSystem } from './helper'
// import { IProfile } from '../users/types'

// export const fetchLogin =
//   ({ teamName, password }: TLoginModel) =>
//   async (dispatch: AppDispatch) => {
//     dispatch(authFetchingStart())
//     try {
//       const response = await GraphQLApi.fetch<ILoginResponse, ILoginRequest>({
//         query: `mutation Login($teamName:String! $password:String!){
//   login(input:{teamName:$teamName password:$password}){
//     ...on Auth{
//       profile{
//         teamName
//         avatar
//         country{
//           name
//         }
//       }
//       token
//     }

//     ...on ValidationErrors{
//       errors{
//         message
//         key
//       }
//     }
// __typename
//   }
// }`,
//         variables: {
//           teamName,
//           password,
//         },
//       })

//       const login = response.data.data.login
//       if (login.__typename === 'Auth') {
//         dispatch(authFetchingSuccess(login as ILoginSuccess))
//         setAuthTokenInSystem(login.token)
//       } else if ((login.__typename = 'ValidationErrors')) {
//         dispatch(authFetchingError(login as IValidationErrors))
//       }
//     } catch (error) {
//       console.log(error)
//       dispatch(authFetchingError(JSON.stringify(error)))
//     }
//   }

// export const fetchProfile = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await GraphQLApi.fetch<IProfileResponse>({
//       query: `query getProfile{
//   profile{
//     ...on Profile{
//       teamName
//       avatar
//       country{id name iso2 emoji}
//       district{id name country_id}
//       city{id name country_id district_id}

//       __typename
//     }

//     ...on AuthError{
// 			message
//       __typename
//     }
//   }
// }`,
//       variables: {},
//     })

//     console.log(response)

//     let profile = response.data.profile
//     if (profile.__typename === 'Profile') {
//       delete profile['__typename']
//       console.log('Profile fetch success: ')
//       console.log(profile)

//       dispatch(setProfile(profile as IProfile))
//     } else if ((profile.__typename = 'AuthError')) {
//       console.log('Profile fetch failure: ')
//       console.log(profile)
//       dispatch(profileFetchingError(profile as IAuthError))
//     }
//   } catch (error) {
//     console.log(error)
//     dispatch(authFetchingError(JSON.stringify(error)))
//   }
// }

export {}
