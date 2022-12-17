import { useState } from 'react'
import Button from './Button'
import Users from './Users'

const Leaderboard = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false)

  return (
    <section className="leaderboard section">
      <h1>donation leaderboard</h1>
      <Users />
      <div className="users">
        {/* <div className="user">
          <img className="user__icon" alt="user icon" src="src\img\user-icon1.png" />
          <div className="user__all-other-info">
            <div className="user__text-info">
              <p className="user__name">Lorem ipsum dolor sit amet.</p>
              <p className="user__address">New York, US</p>
            </div>
            <div className="user__numbers">
              <p className="user__amount">$10,000.00</p>
              <p className="user__rank">#1</p>
              <Button
                className={'user__arrow-btn btn'}
                imgSrc={'/src/img/arrow.svg'}
                to={'#'}
                alt={'arrow'}
              ></Button>
            </div>
          </div>
        </div>
        <div className="user">
          <img className="user__icon" alt="user icon" src="src\img\user-icon1.png" />
          <div className="user__all-other-info">
            <div className="user__text-info">
              <p className="user__name">Lorem ipsum dolor sit amet.</p>
              <p className="user__address">Kyiv, UKR</p>
            </div>
            <div className="user__numbers">
              <p className="user__amount">$9,450.00</p>
              <p className="user__rank">#2</p>
              <Button
                className={'user__arrow-btn btn'}
                imgSrc={'/src/img/arrow.svg'}
                to={'#'}
                alt={'arrow'}
              ></Button>
            </div>
          </div>
        </div>
        <div className="user">
          <img className="user__icon" alt="user icon" src="src\img\user-icon1.png" />
          <div className="user__all-other-info">
            <div className="user__text-info">
              <p className="user__name">Lorem ipsum dolor sit amet.</p>
              <p className="user__address">Paris, FR</p>
            </div>
            <div className="user__numbers">
              <p className="user__amount">$6,460.00</p>
              <p className="user__rank">#3</p>
              <Button
                className={'user__arrow-btn btn'}
                imgSrc={'/src/img/arrow.svg'}
                to={'#'}
                alt={'arrow'}
              ></Button>
            </div>
          </div>
        </div>*/}
      </div>
      <Button
        className="see-all-btn btn_with-image"
        imgSrc="/src/img/arrow.svg"
        alt="arrow"
        to="/leaderboard"
      >
        See All
      </Button>
    </section>
  )
}

export default Leaderboard
