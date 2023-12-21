import React from 'react'
import type { User } from '../store/users/types'
import Button from './Button'

const DEFAULT_ICON = '/src/img/user-icon3.svg'

const UserView: React.FC<User> = ({ avatar, teamName, city, totalDonation, position, country }) => {
  const formatter = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  })

  return (
    <div className="user">
      <img
        className="user__icon"
        alt="user icon"
        src={avatar}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = DEFAULT_ICON
        }}
      />
      <div className="user__all-other-info">
        <div className="user__text-info">
          <p className="user__name">{teamName}</p>
          <p className="user__address">{`${city?.name}, ${country?.iso2} ${country?.emoji}`}</p>
        </div>
        <div className="user__numbers">
          <p className="user__amount">{formatter.format(totalDonation)}</p>
          <p className="user__rank">#{position}</p>
          <Button
            className={'user__arrow-btn btn'}
            imgSrc={'/src/img/arrow.svg'}
            to={'#'}
            alt={'arrow'}
          ></Button>
        </div>
      </div>
    </div>
  )
}

export default UserView
