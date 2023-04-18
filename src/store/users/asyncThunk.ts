// import { ILeaderboardResponse, IUsersRequest } from './types'
// import { GraphQLApi } from '../../api/graphQL'
// import { createAsyncThunk } from '@reduxjs/toolkit'

// export const fetchUsers = (limit: number) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(usersFetchingStart())
//     const response = await GraphQLApi.fetch<ILeaderboardResponse, IUsersRequest>({
//       query: `query getUsers($limit:Int!){
//   leaderboards(limit:$limit){
//     items{
//       teamName
//       avatar
//       country{
//         name
//       }
//       city{name}
//       totalDonation
//       position
//     }
//   }
// }`,
//       variables: {
//         limit,
//       },
//     })

//     dispatch(usersFetchingSuccess(response.data.data.leaderboards.items as IUser[]))
//   } catch (error) {
//     dispatch(usersFetchingError(JSON.stringify(error)))
//     console.log(error)
//   }
// }

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async (limit: number, thunkApi) => {
//   try {
//     const response = await GraphQLApi.fetch<ILeaderboardResponse, IUsersRequest>({
//       query: `query getUsers($limit:Int!){
//   leaderboards(limit:$limit){
//     items{
//       teamName
//       avatar
//       country{
//         name
//       }
//       city{name}
//       totalDonation
//       position
//     }
//   }
// }`,
//       variables: {
//         limit,
//       },
//     })

//     return response.data.leaderboards.items
//   } catch (error) {
//     return thunkApi.rejectWithValue('Something goes wrong during fetching users!')
//   }
// })
