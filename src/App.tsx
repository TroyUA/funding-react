import React from 'react'

import { Routes, Route, Outlet, Link } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import Donation from './pages/Donation'
import Funds from './pages/Funds'
import Success from './pages/Success'
import Login from './pages/Login'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="donation" element={<Donation />} />
        <Route path="funds" element={<Funds />} />
        <Route path="success" element={<Success />} />
        <Route path="login" element={<Login />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
