import { ICity } from '../../models/ICity'
import { ICountry } from '../../models/ICountry'
import { IDistrict } from '../../models/IDistrict'

export interface IUsersState {
  users: IUser[]
  isLoading: boolean
  error: string
}

export interface ILeaderboardResponse {
  data: {
    data: {
      leaderboards: {
        items: IUser[]
      }
    }
  }
}

export interface IUser {
  teamName: string
  avatar: string
  country: ICountry
  district?: IDistrict
  city: ICity
  totalDonation: number
  position: number
}

export interface IUsersRequest {
  query: string
  variables: {
    limit?: number
  }
}
