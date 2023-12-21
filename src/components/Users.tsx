import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import type { LeaderboardPagination } from '../store/users/types'
import UserView from './UserView'
import { SerializedError } from '@reduxjs/toolkit'
import Spiner from './Spiner'

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
    return <Spiner />
  }

  return (
    <div className="users">
      {leaderboard?.items?.map((user) => (
        <UserView key={user.teamName} {...user} />
      ))}
    </div>
  )
}

export default Users
