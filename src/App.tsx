import React from 'react'

import { Routes, Route, Outlet, Link } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
