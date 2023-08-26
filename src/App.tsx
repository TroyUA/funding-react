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
import { useAppSelector } from './hooks/redux'
// import { skipToken } from '@reduxjs/toolkit/dist/query'

const App: React.FC = () => {
  // const { token } = useAppSelector((state) => state.auth)
  useGetProfileQuery()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="success" element={<Success />} />
        <Route element={<PrivateRoutes />}>
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="donation" element={<Donation />} />
          <Route path="funds" element={<FundsPage />} />
        </Route>
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
