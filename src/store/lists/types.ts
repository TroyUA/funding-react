export interface City {
  id: number
  name: string
  country_id: number
  district_id: number
}
export interface Country {
  id: number
  name: string
  iso2: string
  emoji: string
}

export interface District {
  id: number
  name: string
  country_id: number
}

export interface Fund {
  id: string
  name: string
  link: string
  category: string
  img: string
}

export type GetCitiesArgs = {
  countryId?: number
  districtId?: number
}

export type GetCitiesResponse = {
  data: {
    cities: City[]
  }
}
export type GetCountriesResponse = {
  data: {
    countries: Country[]
  }
}
export type GetDistrictsResponse = {
  data: {
    districts: District[]
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
    funds: Fund[]
  }
}
