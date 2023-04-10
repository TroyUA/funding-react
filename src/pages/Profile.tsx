import React from 'react'
import ProfileSettings from '../components/ProfileSettings'
import User from '../components/User'
import { authAPI, useGetProfileQuery } from '../store/auth/service'
import { IUser } from '../store/users/types'

interface IProfilePageProps {
  // user: IUser
}

const Profile: React.FC<IProfilePageProps> = () => {
  // const {data:profile} =authAPI.useGetProfileQuery()

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
      <ProfileSettings />
    </>
  )
}

export default Profile
