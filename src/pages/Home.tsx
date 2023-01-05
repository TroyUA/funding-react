import React from 'react'
import CharityFunds from '../components/CharityFunds'
import HowItWorks from '../components/HowItWorks'
import Leaderboard from '../components/Leaderboard'

const Home = () => {
  return (
    <>
      <Leaderboard limit={3} />
      <HowItWorks />
      <CharityFunds />
    </>
  )
}

export default Home
