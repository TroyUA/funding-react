import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from '../baseQuery'
import type {
  AuthError,
  DonateResultSuccess,
  GetProfileSuccess,
  RegisterDonateResponse,
  UpdateProfileResponse,
  ValidationErrors,
} from '../auth/types'
import type { DonationModel } from '../../pages/Donation'
import { UpdateProfileModel } from '../../components/ProfileSettings'

export const uploadAPI = createApi({
  reducerPath: 'uploadAPI',
  baseQuery,
  endpoints: (build) => ({
    updateProfile: build.mutation<
      GetProfileSuccess | ValidationErrors | AuthError,
      Omit<UpdateProfileModel, 'confirmPassword'>
    >({
      query: (updateProfileArgs) => {
        const { avatar, ...variables } = updateProfileArgs
        const query =
          'mutation UpdateAvatar($avatar: Upload $teamName: String $countryId: Int $districtId: Int $cityId: Int $password: String) { updateProfile(input:{avatar:$avatar teamName:$teamName countryId:$countryId districtId:$districtId cityId:$cityId password:$password}) { ...on Profile { teamName avatar country{ name iso2 emoji id} district{name id} city{ name id } __typename } ...on ValidationErrors { errors { message key } __typename} ...on AuthError{ message __typename }}}'

        const formData = new FormData()
        if (avatar) {
          formData.append(
            'operations',
            JSON.stringify({
              query,
              variables,
            })
          )
          formData.append('map', JSON.stringify({ '0': ['variables.avatar'] }))
          formData.append('0', avatar)
        }

        return {
          url: '',
          method: 'POST',
          body: avatar ? formData : { query, variables },
        }
      },
      transformResponse: (response: UpdateProfileResponse) => response.data.updateProfile,
    }),
    registerDonate: build.mutation<
      DonateResultSuccess | ValidationErrors | AuthError,
      DonationModel
    >({
      transformResponse: (response: RegisterDonateResponse) => response.data.registerDonate,
      query: (registerDonateArgs) => {
        const { file, ...variables } = registerDonateArgs
        const query = `mutation RegisterDonate($file: Upload! $amount: Float! $fundId: String!){ registerDonate(file:$file amount:$amount fundId:$fundId){ ...on DonateResultSuccess { message } ...on AuthError { message } ...on ValidationErrors { errors { message key } } __typename}}`

        const formData = new FormData()
        formData.append(
          'operations',
          JSON.stringify({
            query,
            variables,
          })
        )
        formData.append('map', JSON.stringify({ '0': ['variables.file'] }))
        formData.append('0', file)
        return {
          url: '',
          method: 'POST',
          body: formData,
        }
      },
    }),
  }),
})
