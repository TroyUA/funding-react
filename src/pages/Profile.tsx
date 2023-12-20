import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ProfileSettings from '../components/ProfileSettings'
import User from '../components/User'
import { ROUTES } from '../router'
import { authAPI } from '../store/auth/service'
import Spiner from '../components/Spiner'

const Profile: React.FC = () => {
  const { data, isLoading } = authAPI.useGetMyStatisticQuery()
  const [isOpened, setIsOpened] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (data?.__typename === 'AuthError') navigate(ROUTES.LOGIN)
  }, [data])

  return data?.__typename === 'Leaderboard' ? (
    <div className="profile-page">
      <section className="profile-page__top">
        <img className="profile-page__icon" src={data?.avatar} alt="user avatar" />
        <h1>{data?.teamName}</h1>
        <Button
          className="profile-page__edit-btn btn_black"
          disabled={isLoading}
          onClick={() => setIsOpened(true)}
        >
          Edit Profile
        </Button>
      </section>
      <section className="profile-page__bottom">{data && <User {...data} />}</section>
      <ProfileSettings isOpened={isOpened} onClose={() => setIsOpened(false)} />
    </div>
  ) : (
    <Spiner />
  )
}

export default Profile
