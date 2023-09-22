import type { City, Country, District } from '../lists/types'
import type { AuthError } from '../auth/types'
import type { ResponseTypes } from '../helpers'

export interface IUsers {
  users: IUser[]
  isLoading: boolean
  error: string
}

export interface GetLeaderboardResponse {
  data: {
    leaderboards: LeaderboardPagination
  }
}

export interface LeaderboardPagination {
  currentPage: number
  totalItems: number
  items: IUser[]
}

export interface GetLeaderboardArgs {
  limit: number
  page?: number
  countryId?: number
  districtId?: number
  cityId?: number
}
export interface Profile {
  teamName: string
  avatar?: string
  country?: Country
  district?: District
  city?: City
}

export interface IUser extends Profile {
  totalDonation: number
  position: number
}

export interface GetUsersRequest {
  query: string
  variables: {
    limit?: number
  }
}

export interface GetMyStatisticResponse {
  data: {
    getMyStatistic: AuthError | GetLeaderboardSuccess
  }
}

export interface GetLeaderboardSuccess extends IUser {
  __typename: ResponseTypes['LEADERBOARD']
}
