import axios from 'axios'
import { IUser } from '../../models/IUser'
import { AppDispatch } from '../store'
import {
  ILeaderboardResponse,
  usersFetchingError,
  usersFetchingStart,
  usersFetchingSuccess,
} from './UsersSlice'

export const fetchUsers = (limit: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(usersFetchingStart)
    const response = await axios.post<ILeaderboardResponse>(
      import.meta.env.VITE_API_URL,
      {
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
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    dispatch(usersFetchingSuccess(response.data.data.leaderboards.items as IUser[]))
  } catch (error) {
    dispatch(usersFetchingError(error as string))
    console.log(error)
  }
}
