import React from 'react'
import User from '../components/User'

const ProfilePage = () => {
  return (
    <>
      <section className="profile-page__top section">
        <h1>User Name</h1>
      </section>
      <section className="profile-page__bottom section">
        <User
          avatar={`/src/img/user-icon1.png`}
          teamName={'Lorem ipsum dolor sit amet.'}
          address={'New York, US'}
          amount={10000}
          rank={1}
        />
      </section>
    </>
  )
}

export default ProfilePage
