import { ICity } from '../../models/ICity'
import { ICountry } from '../../models/ICountry'
import { IDistrict } from '../../models/IDistrict'
import { IAuthError } from '../auth/types'

export interface IUsers {
  users: IUser[]
  isLoading: boolean
  error: string
}

export interface ILeaderboardResponse {
  data: {
    leaderboards: LeaderboardModel
  }
}

export interface LeaderboardModel {
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
export interface IProfile {
  teamName: string
  avatar: string
  country: ICountry
  district?: IDistrict
  city: ICity
}

export interface IUser extends IProfile {
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
    getMyStatistic: IAuthError | ILeaderboard
  }
}

export interface ILeaderboard extends IUser {
  __typename?: 'Leaderboard'
}
