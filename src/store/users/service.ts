import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { GetLeaderboardArgs, GetLeaderboardResponse, LeaderboardModel } from './types'
import { baseQuery } from '../baseQuery'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery,
  endpoints: (build) => ({
    getLeaderboard: build.query<LeaderboardModel, GetLeaderboardArgs>({
      transformResponse: (response: GetLeaderboardResponse, _, __) => response.data.leaderboards,
      query: (args: GetLeaderboardArgs) => ({
        url: '',
        method: 'POST',
        body: {
          query: `query GetLeaderboard($limit:Int! $page:Int $countryId:Int $districtId:Int $cityId:Int){
          leaderboards(limit:$limit page:$page countryId:$countryId districtId:$districtId cityId:$cityId){
              currentPage
              totalItems
              items{
                  teamName
                  avatar
                  country{ name iso2 emoji }
                  city{ name }
                  totalDonation
                  position
                  }
              }
          }`,
          variables: args,
        },
      }),
    }),
  }),
})
