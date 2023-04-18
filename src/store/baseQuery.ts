import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { RootState } from '.'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders(headers, { getState }) {
    headers.set('Content-Type', 'application/json')
    const token = (getState() as RootState).auth.token
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

// export const axiosBaseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   prepareHeaders(headers, { getState }) {
//     headers.set('Content-Type', 'application/json')
//     const token = (getState() as RootState).auth.token
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`)
//       setAuthTokenInSystem(token, { setInLocalStorage: false })
//     }
//     return headers
//   },
// })
