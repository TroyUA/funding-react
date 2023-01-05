import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Donation from './pages/Donation'
import Funds from './pages/Funds'
import Success from './pages/Success'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import SignUp from './pages/SignUp'
import LeaderboardPage from './pages/LeaderboardPage'
import PrivateRoutes from './components/PrivateRoutes'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="success" element={<Success />} />
        <Route element={<PrivateRoutes />}>
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="donation" element={<Donation />} />
          <Route path="funds" element={<Funds />} />
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
