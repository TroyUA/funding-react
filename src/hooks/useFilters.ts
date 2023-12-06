import { useMemo, useState } from 'react'
import { listsAPI } from '../store/lists/service'
import type { Value, Option } from '../components/SelectBox'

const useOptions = <T, V extends keyof T = keyof T, L extends keyof T = keyof T>(
  data: T[] | undefined,
  value: V,
  label: L
) =>
  useMemo(() => data?.map((item) => ({ value: item[value], label: item[label] } as Option)), [data])

export function useFunds(limit?: number) {
  const [fundId, setFundId] = useState<Value>()
  const { data: funds } = listsAPI.useGetFundsQuery({ limit })
  const fundOptions = useOptions(funds, 'id', 'name')
  return { fundId, setFundId, fundOptions }
}

export function useCountries() {
  const [countryId, setCountryId] = useState<Value>()
  const { data: countries } = listsAPI.useGetCountriesQuery()
  const countryOptions = useOptions(countries, 'id', 'name')
  return { countryId, setCountryId, countryOptions }
}

export function useDistricts(countryId?: Value) {
  const [districtId, setDistrictId] = useState<Value>()
  const { data: districts } = listsAPI.useGetDistrictsQuery(
    {
      countryId: Number(countryId),
    },
    { skip: !countryId }
  )
  const districtOptions = useOptions(districts, 'id', 'name')

  return { districtId, setDistrictId, districtOptions }
}

export function useCities(countryId?: Value, districtId?: Value) {
  const [cityId, setCityId] = useState<Value>()
  const { data: cities } = listsAPI.useGetCitiesQuery(
    {
      districtId: Number(districtId),
      countryId: Number(countryId),
    },
    { skip: !countryId }
  )
  const cityOptions = useOptions(cities, 'id', 'name')
  return { cityId, setCityId, cityOptions }
}

export function useCategories() {
  const [categoryId, setCategoryId] = useState<Value>()
  const { data: fundsList } = listsAPI.useGetFundsQuery({})
  const categoryOptions = useMemo(
    () =>
      fundsList
        ?.reduce((categories: string[], fund) => {
          if (categories.indexOf(fund.category) === -1) categories.push(fund.category)
          return categories
        }, [])
        .map((category) => ({ value: category, label: category } as Option)),
    [fundsList]
  )

  return { categoryId, setCategoryId, categoryOptions }
}

export function useFilters() {
  const { countryId, setCountryId, countryOptions } = useCountries()
  const { districtId, setDistrictId, districtOptions } = useDistricts(countryId)
  const { cityId, setCityId, cityOptions } = useCities(countryId, districtId)
  const { categoryId, setCategoryId, categoryOptions } = useCategories()

  const reset = () => {
    setCountryId('')
    setDistrictId('')
    setCityId('')
    setCategoryId('')
  }

  return {
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
  }
}
