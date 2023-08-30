import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { City } from './ICity'
import { Country } from '../../models/ICountry'
import { District } from '../../models/IDistrict'
import { IFund } from '../../models/IFund'
import { baseQuery } from '../baseQuery'
import { providesList } from './helper'
import type {
  GetCitiesArgs,
  GetCitiesResponse,
  GetCountriesResponse,
  GetDistrictsArgs,
  GetDistrictsResponse,
  GetFundsArgs,
  GetFundsResponse,
} from './types'

export const listsAPI = createApi({
  reducerPath: 'listsApi',
  baseQuery,
  tagTypes: ['Cities', 'Districts', 'Countries', 'Funds'],
  endpoints: (build) => ({
    getCities: build.query<City[], GetCitiesArgs>({
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
      transformResponse: (response: GetCitiesResponse) => response.data.cities,
      providesTags: (result) => providesList(result, 'Cities'),
    }),
    getCountries: build.query<Country[], void>({
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
      transformResponse: (response: GetCountriesResponse) => response.data.countries,
      providesTags: (result) => providesList(result, 'Countries'),
    }),
    getDistricts: build.query<District[], GetDistrictsArgs>({
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
      transformResponse: (response: GetDistrictsResponse) => response.data.districts,
      providesTags: (result) => providesList(result, 'Districts'),
    }),
    getFunds: build.query<IFund[], GetFundsArgs>({
      query: ({ limit }) => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getFunds($limit:Int){
          funds(limit:$limit){
            id
            name
            link
            category
            img
          }
        }`,
          variables: {
            limit,
          },
        },
      }),
      transformResponse: (response: GetFundsResponse) => response.data.funds,
      providesTags: (result) => providesList(result, 'Funds'),
    }),
  }),
})
