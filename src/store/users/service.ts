import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { ILeaderboardResponse } from './types'
import { baseQuery } from '../baseQuery'

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery,
  endpoints: (build) => ({
    getUsers: build.query({
      transformResponse: (response: ILeaderboardResponse, _, __) =>
        response.data.leaderboards.items,
      query: (limit: number) => ({
        url: '',
        method: 'POST',
        body: {
          query: `query getUsers($limit:Int!){
            leaderboards(limit:$limit){
              items{
                teamName
                avatar
                country{
                  name
                }
                city{name}
                totalDonation
                position
              }
            }    
          }`,
          variables: {
            limit,
          },
        },
      }),
    }),
  }),
})
