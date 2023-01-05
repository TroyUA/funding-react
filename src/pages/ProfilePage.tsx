import React from 'react'
import User from '../components/User'
import { IUser } from '../store/users/types'

interface IProfilePageProps {
  // user: IUser
}

const ProfilePage: React.FC<IProfilePageProps> = () => {
  return (
    <>
      <section className="profile-page__top section">
        <h1>User Name</h1>
      </section>
      <section className="profile-page__bottom section">
        {/* <User
          //{...user}
          // avatar={user.avatar}
          // teamName={user.teamName}
          // country={user.country}
          // city={user.city}
          // totalDonation={user.totalDonation}
          // position={user.position}
        /> */}
      </section>
    </>
  )
}

export default ProfilePage
