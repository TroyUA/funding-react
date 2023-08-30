import { usersAPI } from '../store/users/service'
import User from './User'

interface IUsersProps {
  limit: number
  page?: number
  countryId?: number
  districtId?: number
  cityId?: number
}

const Users: React.FC<IUsersProps> = (props) => {
  const { data: leaderboard, isLoading, error } = usersAPI.useGetLeaderboardQuery({ ...props })

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
