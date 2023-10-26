import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { LeaderboardPagination } from '../store/users/types'
import User from './User'
import { SerializedError } from '@reduxjs/toolkit'

interface UsersProps {
  leaderboard?: LeaderboardPagination
  isLoading: boolean
  error?: FetchBaseQueryError | SerializedError
}

const Users: React.FC<UsersProps> = ({ error, isLoading, leaderboard }) => {
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
