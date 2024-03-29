import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFilters } from '../hooks/useFilters'
import { ROUTES } from '../router'
import { usersAPI } from '../store/users/service'
import { classNames } from '../utils'
import Button from './Button'
import Datepicker from './Datepicker'
import SelectBox from './SelectBox'
import Users from './Users'
// import { useSearchParams } from 'react-router-dom'

interface LeaderboardProps {
  limit: number
}

const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  const [limit, setLimit] = useState(props.limit)
  const isOnLeaderboardPage = useLocation().pathname.includes(ROUTES.LEADERBOARD)
  const [showFilters, setShowFilters] = useState(false)

  const {
    reset,
    setCountryId,
    setDistrictId,
    setCityId,
    setCategoryId,
    countryId,
    districtId,
    cityId,
    categoryId,
    countryOptions,
    districtOptions,
    cityOptions,
    categoryOptions,
  } = useFilters()

  const [getLeaderboard, { data: leaderboard, isLoading, error }] =
    usersAPI.useLazyGetLeaderboardQuery()

  // const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    getLeaderboard({
      limit,
      // page
      countryId: Number(countryId),
      districtId: Number(districtId),
      cityId: Number(cityId),
    })
  }, [limit])

  return (
    <>
      {isOnLeaderboardPage && (
        <section className="filters">
          <h1>donation leaderboard</h1>
          <Formik
            initialValues={{ countryId, cityId, districtId, categoryId, date: '' }}
            onSubmit={({ cityId, countryId, districtId }) => {
              getLeaderboard({
                limit,
                // page
                countryId: Number(countryId),
                districtId: Number(districtId),
                cityId: Number(cityId),
              })
              setShowFilters(false)
            }}
          >
            {() => (
              <Form className={classNames('filters__form', showFilters && 'show')}>
                <div className="filters__inputs">
                  <SelectBox
                    onChange={setCountryId}
                    name="countryId"
                    placeholder="Country"
                    options={countryOptions}
                    defaultValue={countryId}
                  ></SelectBox>
                  <SelectBox
                    name="cityId"
                    placeholder="City"
                    onChange={setCityId}
                    options={cityOptions}
                    defaultValue={cityId}
                  ></SelectBox>
                  <SelectBox
                    name="districtId"
                    placeholder="District"
                    onChange={setDistrictId}
                    options={districtOptions}
                    defaultValue={districtId}
                  ></SelectBox>
                  <SelectBox
                    name="categoryId"
                    placeholder="Category"
                    onChange={setCategoryId}
                    options={categoryOptions}
                    defaultValue={categoryId}
                  ></SelectBox>
                  <Datepicker name="date"></Datepicker>
                </div>
                <div className="filters__buttons">
                  <Button type="button" className="filters__reset-btn btn_red" onClick={reset}>
                    Reset
                  </Button>
                  <Button type="submit" className="filters__apply-btn btn_black">
                    Apply Filters
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          {!showFilters && (
            <Button onClick={() => setShowFilters(true)} className="filters__open-btn btn_black">
              Open Filters
            </Button>
          )}
        </section>
      )}
      <section className="leaderboard">
        {!isOnLeaderboardPage && <h1>donation leaderboard</h1>}
        <Users leaderboard={leaderboard} isLoading={isLoading} error={error} />
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
            to={ROUTES.LEADERBOARD}
          >
            See All
          </Button>
        )}
      </section>
    </>
  )
}

export default Leaderboard
