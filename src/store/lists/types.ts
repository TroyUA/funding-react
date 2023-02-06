import { ICity } from '../../models/ICity'
import { ICountry } from '../../models/ICountry'
import { IDistrict } from '../../models/IDistrict'

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
