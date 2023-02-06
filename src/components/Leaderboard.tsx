import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { listsAPI } from '../store/lists/service'
import Button from './Button'
import SelectBox, { IOption } from './SelectBox'
import Users from './Users'

interface ILeaderboardProps {
  limit: number
}

// const DISTRICT_ID = 4689
// const COUNTRY_ID = 230

const Leaderboard: React.FC<ILeaderboardProps> = (props) => {
  const [limit, setLimit] = useState(props.limit)
  const [showFilters, setShowFilters] = useState(false)

  const location = useLocation()
  const isOnLeaderboardPage = location.pathname.includes('leaderboard')

  const [city, setCity] = useState<IOption>()
  const [district, setDistrict] = useState<IOption>()
  const [country, setCountry] = useState<IOption>()

  const { data: countryList } = listsAPI.useGetCountriesQuery()
  const { data: cityList } = listsAPI.useGetCitiesQuery(
    {
      districtId: Number(district?.value),
      countryId: Number(country?.value),
    },
    { skip: !country?.value }
  )
  const { data: districtList } = listsAPI.useGetDistrictsQuery(
    {
      countryId: Number(country?.value),
    },
    { skip: !country?.value }
  )

  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    // setShowFilters(false)
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    console.log(data)
  }

  const countryChangeHandler = () => {
    // reset cities
    // reset districts
  }

  return (
    <>
      {isOnLeaderboardPage && (
        <section className="filters section">
          <h1>donation leaderboard</h1>

          <form className={`filters__form${showFilters ? ' show' : ''}`} onSubmit={submitHandler}>
            <div className="filters__inputs">
              <SelectBox
                onChange={setCountry}
                name="Country"
                options={countryList?.map(
                  (country) => ({ value: country.id, label: country.name } as IOption)
                )}
              ></SelectBox>
              <SelectBox
                name="City"
                onChange={setCity}
                options={cityList?.map((city) => ({ value: city.id, label: city.name } as IOption))}
                // reset={!!countryList}
              ></SelectBox>
              <SelectBox
                name="District"
                onChange={setDistrict}
                options={districtList?.map(
                  (district) => ({ value: district.id, label: district.name } as IOption)
                )}
              ></SelectBox>

              {/* <select>
                <option>Category</option>
              </select>
              <input type="date" /> */}
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
