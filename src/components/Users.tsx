import { usersAPI } from '../store/users/service'
import User from './User'

interface IUsersProps {
  limit: number
}

const Users: React.FC<IUsersProps> = ({ limit }) => {
  const { data: leaderboard, isLoading, error } = usersAPI.useGetLeaderboardQuery({ limit })

  if (error) {
    return <div>{`Error: ${error}`}</div>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="users">
      {/* {JSON.stringify(leaderboard?.items, null, 2)} */}
      {leaderboard?.items?.map((user) => (
        <User key={user.teamName} {...user} />
      ))}
    </div>
  )
}

export default Users
