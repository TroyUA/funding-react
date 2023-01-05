import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchUsers } from '../store/users/asyncThunk'
import { IUser } from '../store/users/types'
import User from './User'

interface IUsersProps {
  limit: number
}

let isInitial = true

const Users: React.FC<IUsersProps> = ({ limit }) => {
  const { error, isLoading, users } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }
    dispatch(fetchUsers(limit))
  }, [limit])

  if (error) {
    return <div>Error ${error}</div>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="users">
      {/* {JSON.stringify(users, null, 2)} */}
      {users.map((user: IUser) => (
        <User key={user.teamName} {...user} />
      ))}
    </div>
  )
}

export default Users
