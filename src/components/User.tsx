import React from 'react'
import { IUser } from '../store/users/types'
import Button from './Button'

// export class CUser implements UserProps {
//   constructor(
//     public avatar: string,
//     public about: string,
//     public address: string,
//     public amount: number,
//     public rank: number
//   ) {}
// }

const User: React.FC<IUser> = ({ avatar, teamName, city, totalDonation, position }) => {
  const formatter = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  })
  return (
    <div className="user">
      <img className="user__icon" alt="user icon" src={avatar} />
      <div className="user__all-other-info">
        <div className="user__text-info">
          <p className="user__name">{teamName}</p>
          <p className="user__address">{city.name}</p>
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

export default User
