import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { ICity } from '../../models/ICity'
import { ICountry } from '../../models/ICountry'
import { IDistrict } from '../../models/IDistrict'
import { axiosBaseQuery } from '../baseQuery'
import { providesList } from './helper'
import type {
  CitiesRequest,
  CitiesResponse,
  CountriesResponse,
  DistrictsRequest,
  DistrictsResponse,
} from './types'

export const listsAPI = createApi({
  reducerPath: 'listsApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Cities', 'Districts', 'Countries'],
  endpoints: (build) => ({
    getCities: build.query<ICity[], CitiesRequest>({
      query: ({ countryId, districtId }) => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getCities($districtId:Int $countryId:Int ){
          cities(districtId:$districtId countryId:$countryId){
                        id
                        name
                        country_id
                    }          
        }`,
          variables: {
            countryId,
            districtId,
          },
        },
      }),
      transformResponse: (response: CitiesResponse) => response.data.cities,
      providesTags: (result) => providesList(result, 'Cities'),
    }),
    getCountries: build.query<ICountry[], void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getCountries{
          countries{
            name
            emoji
            id
            iso2
          }
        } 
  `,
        },
      }),
      transformResponse: (response: CountriesResponse) => response.data.countries,
      providesTags: (result) => providesList(result, 'Countries'),
    }),
    getDistricts: build.query<IDistrict[], DistrictsRequest>({
      query: ({ countryId }) => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getDistricts($countryId:Int){
          districts(countryId:$countryId){
              id
              name
              country_id
          }
        }
  `,
          variables: {
            countryId,
          },
        },
      }),
      transformResponse: (response: DistrictsResponse) => response.data.districts,
      providesTags: (result) => providesList(result, 'Districts'),
    }),
  }),
})