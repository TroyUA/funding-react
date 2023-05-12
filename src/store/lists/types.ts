import { ICity } from '../../models/ICity'
import { ICountry } from '../../models/ICountry'
import { IDistrict } from '../../models/IDistrict'
import { IFund } from '../../models/IFund'

export type GetCitiesArgs = {
  countryId?: number
  districtId?: number
}

export type GetCitiesResponse = {
  data: {
    cities: ICity[]
  }
}
export type GetCountriesResponse = {
  data: {
    countries: ICountry[]
  }
}
export type GetDistrictsResponse = {
  data: {
    districts: IDistrict[]
  }
}

export type GetDistrictsArgs = {
  countryId?: number
}

export type GetFundsArgs = {
  limit?: number
}

export type GetFundsResponse = {
  data: {
    funds: IFund[]
  }
}
