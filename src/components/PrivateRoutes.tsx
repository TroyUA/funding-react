import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

const PrivateRoutes = () => {
  const location = useLocation()
  const { token } = useAppSelector((state) => state.auth)
  return token ? <Outlet /> : <Navigate to={'/auth/login'} state={{ from: location }} replace />
}

export default PrivateRoutes
