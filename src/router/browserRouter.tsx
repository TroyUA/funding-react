import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ROUTES } from '.'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Success from '../pages/Success'
import PrivateRoutes from '../components/PrivateRoutes'
import LeaderboardPage from '../pages/LeaderboardPage'
import Profile from '../pages/Profile'
import Donation from '../pages/Donation'
import FundsPage from '../pages/FundsPage'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.SUCCESS} element={<Success />} />
        <Route element={<PrivateRoutes />}>
          <Route path={ROUTES.LEADERBOARD} element={<LeaderboardPage />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.DONATION} element={<Donation />} />
          <Route path={ROUTES.FUNDS} element={<FundsPage />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </>
  )
)
