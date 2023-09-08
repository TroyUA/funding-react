import React, { useEffect, useState } from 'react'
import ProfileSettings from '../components/ProfileSettings'
import User from '../components/User'
import { authAPI } from '../store/auth/service'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const { data } = authAPI.useGetMyStatisticQuery()
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
        <Button className="profile-page__edit-btn btn_black" onClick={() => setIsOpened(true)}>
          Edit Profile
        </Button>
      </section>
      <section className="profile-page__bottom">{data && <User {...data} />}</section>
      <ProfileSettings isOpened={isOpened} onClose={() => setIsOpened(false)} />
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default Profile
