import { ICity } from '../../models/ICity'
import { ICountry } from '../../models/ICountry'
import { IDistrict } from '../../models/IDistrict'

export interface IUsers {
  users: IUser[]
  isLoading: boolean
  error: string
}

export interface ILeaderboardResponse {
  data: {
    leaderboards: {
      items: IUser[]
    }
  }
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

export interface IUsersRequest {
  query: string
  variables: {
    limit?: number
  }
}
