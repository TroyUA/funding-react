import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Donation from './pages/Donation'
import FundsPage from './pages/FundsPage'
import Success from './pages/Success'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import LeaderboardPage from './pages/LeaderboardPage'
import PrivateRoutes from './components/PrivateRoutes'
import { useGetProfileQuery } from './store/auth/service'
import { ROUTES } from './routes'

const App: React.FC = () => {
  useGetProfileQuery()

  return (
    <Routes>
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
    </Routes>
  )
}

export default App
