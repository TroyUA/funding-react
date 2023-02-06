import { usersAPI } from '../store/users/service'
import User from './User'

interface IUsersProps {
  limit: number
}

const Users: React.FC<IUsersProps> = ({ limit }) => {
  const { data: users, isLoading, error } = usersAPI.useGetUsersQuery(limit)

  if (error) {
    return <div>{`Error ${error}`}</div>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="users">
      {/* {JSON.stringify(users, null, 2)} */}
      {users?.map((user) => (
        <User key={user.teamName} {...user} />
      ))}
    </div>
  )
}

export default Users
