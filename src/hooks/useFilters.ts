import { useMemo, useState } from 'react'
import { listsAPI } from '../store/lists/service'
import type { Value, Option } from '../components/SelectBox'
import useDebounce from './useDebounce'

const useOptions = <T extends object, V extends keyof T = keyof T, L extends keyof T = keyof T>(
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
  const debouncedCountryId = useDebounce(countryId)
  const { data: districts } = listsAPI.useGetDistrictsQuery(
    {
      countryId: Number(debouncedCountryId),
    },
    { skip: !debouncedCountryId }
  )
  const districtOptions = useOptions(countryId ? districts : [], 'id', 'name')

  return { districtId, setDistrictId, districtOptions }
}

export function useCities(countryId?: Value, districtId?: Value) {
  const [cityId, setCityId] = useState<Value>()
  const debouncedCountryId = useDebounce(countryId)
  const debouncedDistrictId = useDebounce(districtId)
  const { data: cities } = listsAPI.useGetCitiesQuery(
    {
      districtId: Number(debouncedDistrictId),
      countryId: Number(debouncedCountryId),
    },
    { skip: !debouncedCountryId }
  )
  const cityOptions = useOptions(countryId ? cities : [], 'id', 'name')
  return { cityId, setCityId, cityOptions }
}

export function useCategories() {
  const [categoryId, setCategoryId] = useState<Value>()
  const { data: funds } = listsAPI.useGetFundsQuery({})
  const categoryOptions = useMemo(
    () =>
      funds
        ?.reduce((categories: string[], fund) => {
          if (categories.indexOf(fund.category) === -1) categories.push(fund.category)
          return categories
        }, [])
        .map((category) => ({ value: category, label: category } as Option)),
    [funds]
  )

  return { categoryId, setCategoryId, categoryOptions }
}

export function useFilters() {
  const { countryId, setCountryId, countryOptions } = useCountries()
  const { districtId, setDistrictId, districtOptions } = useDistricts(countryId)
  const { cityId, setCityId, cityOptions } = useCities(countryId, districtId)
  const { categoryId, setCategoryId, categoryOptions } = useCategories()

  const reset = () => {
    setCountryId(null)
    setDistrictId(null)
    setCityId(null)
    setCategoryId(null)
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
