import { useState } from 'react'
import Button from './Button'
import Datepicker from './Datepicker'
import SelectBox from './SelectBox'
import Users from './Users'
import { classNames } from '../utils'
import { useFilters } from '../hooks/useFilters'
import { Form, Formik } from 'formik'

interface ILeaderboardProps {
  limit: number
}

const Leaderboard: React.FC<ILeaderboardProps> = (props) => {
  const [limit, setLimit] = useState(props.limit)
  const {
    setShowFilters,
    isOnLeaderboardPage,
    showFilters,
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

  return (
    <>
      {isOnLeaderboardPage && (
        <section className="filters section">
          <h1>donation leaderboard</h1>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({}) => (
              <Form className={classNames('filters__form', showFilters && 'show')}>
                <div className="filters__inputs">
                  <SelectBox
                    onChange={setCountryId}
                    name="countryId"
                    placeholder="Country"
                    options={countryOptions}
                  ></SelectBox>
                  <SelectBox
                    name="cityId"
                    placeholder="City"
                    onChange={setCityId}
                    options={cityOptions}
                  ></SelectBox>
                  <SelectBox
                    name="districtId"
                    placeholder="District"
                    onChange={setDistrictId}
                    options={districtOptions}
                  ></SelectBox>
                  <SelectBox
                    name="categoryId"
                    placeholder="Category"
                    onChange={setCategoryId}
                    options={categoryOptions}
                  ></SelectBox>
                  <Datepicker></Datepicker>
                </div>
                <div className="filters__buttons">
                  <Button type="reset" className="filters__reset-btn btn_red">
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
