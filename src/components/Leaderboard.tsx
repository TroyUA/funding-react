import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { listsAPI } from '../store/lists/service'
import Button from './Button'
import Datepicker from './Datepicker'
import SelectBox, { IOption } from './SelectBox'
import Users from './Users'

interface ILeaderboardProps {
  limit: number
}

const Leaderboard: React.FC<ILeaderboardProps> = (props) => {
  const [limit, setLimit] = useState(props.limit)
  const [showFilters, setShowFilters] = useState(false)

  const location = useLocation()
  const isOnLeaderboardPage = location.pathname.includes('leaderboard')

  const [selectedCityId, setSelectedCityId] = useState<string | number>()
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | number>()
  const [selectedCountryId, setSelectedCountryId] = useState<string | number>()
  const [selectedCategory, setSelectedCategory] = useState<string | number>()
  //////////////////////////////////////////////////////////////////
  const { data: countryList } = listsAPI.useGetCountriesQuery()
  const { data: cityList } = listsAPI.useGetCitiesQuery(
    {
      districtId: Number(selectedDistrictId),
      countryId: Number(selectedCountryId),
    },
    { skip: !selectedCountryId }
  )
  const { data: districtList } = listsAPI.useGetDistrictsQuery(
    {
      countryId: Number(selectedCountryId),
    },
    { skip: !selectedCountryId }
  )
  const { data: fundsList } = listsAPI.useGetFundsQuery({})

  const countryOptions = useMemo(
    () => countryList?.map((country) => ({ value: country.id, label: country.name } as IOption)),
    [countryList]
  )
  const cityOptions = useMemo(
    () => cityList?.map((city) => ({ value: city.id, label: city.name } as IOption)),
    [cityList]
  )
  const districtOptions = useMemo(
    () =>
      districtList?.map((district) => ({ value: district.id, label: district.name } as IOption)),
    [districtList]
  )
  const categoryOptions = useMemo(
    () =>
      fundsList
        ?.reduce((categories: string[], fund) => {
          if (categories.indexOf(fund.category) === -1) categories.push(fund.category)
          return categories
        }, [])
        .map((category) => ({ value: category, label: category } as IOption)),
    [fundsList]
  )
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

          <form className={`filters__form${showFilters ? ' show' : ''}`} onSubmit={submitHandler}>
            <div className="filters__inputs">
              <SelectBox
                onChange={setSelectedCountryId}
                name="Country"
                options={countryOptions}
              ></SelectBox>
              <SelectBox name="City" onChange={setSelectedCityId} options={cityOptions}></SelectBox>
              <SelectBox
                name="District"
                onChange={setSelectedDistrictId}
                options={districtOptions}
              ></SelectBox>
              <SelectBox
                name="Category"
                onChange={setSelectedCategory}
                options={categoryOptions}
              ></SelectBox>
              <Datepicker></Datepicker>
              {/* <input type="date" name="Datepicker" /> */}
              {/* <Example /> */}
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

function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('фокус на родительском элементе установлен')
        } else {
          console.log('фокус на дочернем элементе установлен', e.target)
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Не срабатывает при перемещении фокуса между дочерними элементами
          console.log('фокус находится внутри родительского элемента')
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('фокус на родительском элементе снят')
        } else {
          console.log('фокус на дочернем элементе снят', e.target)
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Не срабатывает при перемещении фокуса между дочерними элементами
          console.log('фокус потерян изнутри родительского элемента')
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  )
}
