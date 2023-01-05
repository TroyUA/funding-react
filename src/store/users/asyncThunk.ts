import { AppDispatch } from '../store'
import { usersFetchingError, usersFetchingStart, usersFetchingSuccess } from './slice'
import { ILeaderboardResponse, IUser, IUsersRequest } from './types'
import { GraphQLApi } from '../../api/graphQL'

export const fetchUsers = (limit: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(usersFetchingStart())
    const response = await GraphQLApi.fetch<IUsersRequest, ILeaderboardResponse>({
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
    })

    dispatch(usersFetchingSuccess(response.data.data.leaderboards.items as IUser[]))
  } catch (error) {
    dispatch(usersFetchingError(JSON.stringify(error)))
    console.log(error)
  }
}
