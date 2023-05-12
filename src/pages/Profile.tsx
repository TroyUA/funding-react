import React, { useState } from 'react'
import ProfileSettings from '../components/ProfileSettings'
import User from '../components/User'
import { authAPI } from '../store/auth/service'
import Button from '../components/Button'

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const { data: user } = authAPI.useGetMyStatisticQuery()
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className="profile-page">
      <section className="profile-page__top">
        <img className="profile-page__icon" src={user?.avatar} alt="user avatar" />
        <h1>{user?.teamName}</h1>
        <Button className="profile-page__edit-btn btn_black" onClick={() => setIsOpened(true)}>
          Edit Profile
        </Button>
      </section>
      <section className="profile-page__bottom">{user && <User {...user} />}</section>
      <ProfileSettings isOpened={isOpened} onClose={() => setIsOpened(false)} />
    </div>
  )
}

export default Profile
