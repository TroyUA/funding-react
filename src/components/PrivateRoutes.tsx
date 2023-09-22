import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { ROUTES } from '../router'

const PrivateRoutes = () => {
  const location = useLocation()
  const { token } = useAppSelector((state) => state.auth)
  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
}

export default PrivateRoutes
