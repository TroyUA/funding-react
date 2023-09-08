import { useMemo, useState } from 'react'
import { listsAPI } from '../store/lists/service'
import type { OptionValue, IOption } from '../components/SelectBox'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../routes'

export function useFunds() {
  const [fundId, setFundId] = useState<OptionValue>()
  const { data: funds } = listsAPI.useGetFundsQuery({})
  const fundOptions = useMemo(
    () => funds?.map((fund) => ({ value: fund.id, label: fund.name } as IOption)),
    [funds]
  )

  return { fundId, setFundId, fundOptions }
}

export function useCountries() {
  const [countryId, setCountryId] = useState<OptionValue>()
  const { data: countries } = listsAPI.useGetCountriesQuery()
  const countryOptions = useMemo(
    () => countries?.map((country) => ({ value: country.id, label: country.name } as IOption)),
    [countries]
  )

  return { countryId, setCountryId, countryOptions }
}

export function useDistricts(countryId?: OptionValue) {
  const [districtId, setDistrictId] = useState<OptionValue>()
  const { data: districts } = listsAPI.useGetDistrictsQuery(
    {
      countryId: Number(countryId),
    },
    { skip: !countryId }
  )
  const districtOptions = useMemo(
    () => districts?.map((district) => ({ value: district.id, label: district.name } as IOption)),
    [districts]
  )

  return { districtId, setDistrictId, districtOptions }
}

export function useCities(countryId?: OptionValue, districtId?: OptionValue) {
  const [cityId, setCityId] = useState<OptionValue>()
  const { data: cities } = listsAPI.useGetCitiesQuery(
    {
      districtId: Number(districtId),
      countryId: Number(countryId),
    },
    { skip: !countryId }
  )
  const cityOptions = useMemo(
    () => cities?.map((city) => ({ value: city.id, label: city.name } as IOption)),
    [cities]
  )

  return { cityId, setCityId, cityOptions }
}

export function useCategories() {
  const [categoryId, setCategoryId] = useState<OptionValue>()
  const { data: fundsList } = listsAPI.useGetFundsQuery({})
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

  return { categoryId, setCategoryId, categoryOptions }
}

export function useFilters() {
  const [showFilters, setShowFilters] = useState(false)

  const location = useLocation()
  const isOnLeaderboardPage = location.pathname.includes(ROUTES.LEADERBOARD)

  const { countryId, setCountryId, countryOptions } = useCountries()
  const { districtId, setDistrictId, districtOptions } = useDistricts(countryId)
  const { cityId, setCityId, cityOptions } = useCities(countryId, districtId)
  const { categoryId, setCategoryId, categoryOptions } = useCategories()

  return {
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
  }
}
