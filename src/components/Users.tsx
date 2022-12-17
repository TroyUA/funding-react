import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IUser } from '../models/IUser'
import { fetchUsers } from '../store/reducers/ActionCreators'
import User from './User'

const Users = () => {
  const { error, isLoading, users } = useAppSelector((state) => state.usersReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers(3))
  }, [])

  if (error) {
    return <div>Error ${error}</div>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      {/* {JSON.stringify(users, null, 2)} */}
      {users.map((user: IUser) => (
        <User {...user} />
      ))}
    </>
  )
}

export default Users
