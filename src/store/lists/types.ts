import { ICity } from '../../models/ICity'
import { ICountry } from '../../models/ICountry'
import { IDistrict } from '../../models/IDistrict'
import { IFund } from '../../models/IFund'

export type CitiesRequest = {
  countryId?: number
  districtId?: number
}

export type CitiesResponse = {
  data: {
    cities: ICity[]
  }
}
export type CountriesResponse = {
  data: {
    countries: ICountry[]
  }
}
export type DistrictsResponse = {
  data: {
    districts: IDistrict[]
  }
}

export type DistrictsRequest = {
  countryId?: number
}

export type FundsRequest = {
  limit?: number
}

export type FundsResponse = {
  data: {
    funds: IFund[]
  }
}
