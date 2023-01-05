import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import Users from './Users'

interface ILeaderboard {
  limit: number
}

const Leaderboard: React.FC<ILeaderboard> = (props) => {
  const [limit, setLimit] = useState(props.limit)
  const [showFilters, setShowFilters] = useState(false)
  const location = useLocation()
  const isOnLeaderboardPage = location.pathname.includes('leaderboard')

  const submitHandler: React.FormEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowFilters(false)
  }

  return (
    <>
      {isOnLeaderboardPage && (
        <section className="filters section">
          <h1>donation leaderboard</h1>

          <form className={`filters__form${showFilters ? ' show' : ''}`} onSubmit={submitHandler}>
            <div className="filters__inputs">
              <select>
                <option>Country</option>
              </select>
              <select>
                <option>City</option>
              </select>
              <select>
                <option>District</option>
              </select>
              <select>
                <option>Category</option>
              </select>
              <input type="date" />
            </div>
            <div className="filters__buttons">
              <Button type="reset" className="filters__reset-btn btn_red">
                Reset
              </Button>
              <Button type="submit" className="filters__apply-btn btn_black">
                Apply Filters
              </Button>
            </div>
          </form>

          {!showFilters && (
            <Button onClick={() => setShowFilters(true)} className="filters__open-btn btn_black">
              Open Filters
            </Button>
          )}
        </section>
      )}
      <section className="leaderboard section">
        {!isOnLeaderboardPage && <h1>donation leaderboard</h1>}
        <Users limit={limit} />
        {isOnLeaderboardPage ? (
          <Button
            className="see-all-btn btn_with-image"
            alt={'load'}
            imgSrc={'/src/img/load.svg'}
            onClick={() => setLimit((prevLimit) => prevLimit + 10)}
          >
            Load More
          </Button>
        ) : (
          <Button
            className="see-all-btn btn_with-image"
            alt={'arrow'}
            imgSrc={'/src/img/arrow.svg'}
            to={'leaderboard'}
          >
            See All
          </Button>
        )}
      </section>
    </>
  )
}

export default Leaderboard

{
  /* <div className="user">
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
        </div>*/
}
