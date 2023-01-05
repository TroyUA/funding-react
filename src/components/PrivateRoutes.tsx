import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

const PrivateRoutes = () => {
  const auth = useAppSelector((state) => state.auth)
  return auth.token ? <Outlet /> : <Navigate to={'/auth/login'} />
}

export default PrivateRoutes
