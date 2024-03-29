import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { RootState } from '.'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})
