import { useState } from 'react'
import Button from './Button'
import Datepicker from './Datepicker'
import SelectBox from './SelectBox'
import Users from './Users'
import { classNames } from '../utils'
import { useFilters } from '../hooks/useFilters'

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

  /////////////////////////////////////////////////////////////////
  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setShowFilters(false)
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    console.log(data)
  }

  return (
    <>
      {isOnLeaderboardPage && (
        <section className="filters section">
          <h1>donation leaderboard</h1>
          <form
            className={classNames('filters__form', showFilters && 'show')}
            onSubmit={submitHandler}
          >
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

// const [showFilters, setShowFilters] = useState(false)

// const location = useLocation()
// const isOnLeaderboardPage = location.pathname.includes('leaderboard')

// const [countryId, setCountryId] = useState<string | number>()
// const [cityId, setCityId] = useState<string | number>()
// const [districtId, setDistrictId] = useState<string | number>()
// const [categoryId, setCategoryId] = useState<string | number>()
// //////////////////////////////////////////////////////////////////
// const { data: countries } = listsAPI.useGetCountriesQuery()
// const { data: cities } = listsAPI.useGetCitiesQuery(
//   {
//     districtId: Number(districtId),
//     countryId: Number(countryId),
//   },
//   { skip: !countryId }
// )
// const { data: districts } = listsAPI.useGetDistrictsQuery(
//   {
//     countryId: Number(countryId),
//   },
//   { skip: !countryId }
// )
// const { data: fundsList } = listsAPI.useGetFundsQuery({})

// const countryOptions = useMemo(
//   () => countries?.map((country) => ({ value: country.id, label: country.name } as IOption)),
//   [countries]
// )
// const cityOptions = useMemo(
//   () => cities?.map((city) => ({ value: city.id, label: city.name } as IOption)),
//   [cities]
// )
// const districtOptions = useMemo(
//   () => districts?.map((district) => ({ value: district.id, label: district.name } as IOption)),
//   [districts]
// )
// const categoryOptions = useMemo(
//   () =>
//     fundsList
//       ?.reduce((categories: string[], fund) => {
//         if (categories.indexOf(fund.category) === -1) categories.push(fund.category)
//         return categories
//       }, [])
//       .map((category) => ({ value: category, label: category } as IOption)),
//   [fundsList]
// )
