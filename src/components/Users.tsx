import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { usersAPI } from '../store/users/service'
import { LeaderboardModel } from '../store/users/types'
import User from './User'
import { SerializedError } from '@reduxjs/toolkit'

// interface IUsersProps {
//   limit: number
//   page?: number
//   countryId?: number
//   districtId?: number
//   cityId?: number
// }
interface UserProps {
  leaderboard?: LeaderboardModel
  isLoading: boolean
  error?: FetchBaseQueryError | SerializedError
}

const Users: React.FC<UserProps> = ({ error, isLoading, leaderboard }) => {
  if (error) {
    return <div>{`Error: ${error}`}</div>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="users">
      {leaderboard?.items?.map((user) => (
        <User key={user.teamName} {...user} />
      ))}
    </div>
  )
}

export default Users
