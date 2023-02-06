import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { authAPI } from '../store/auth/service'

const PrivateRoutes = () => {
  const location = useLocation()
  const { token } = useAppSelector((state) => state.auth)
  // const {entries}=authApi.useLoginMutation()
  return token ? <Outlet /> : <Navigate to={'/auth/login'} state={{ from: location }} replace />
}

export default PrivateRoutes
