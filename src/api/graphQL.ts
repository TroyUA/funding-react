import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export class GraphQLApi {
  static fetch<T, U>(params: T): Promise<U> {
    return axiosApi.post<U>('', params) as Promise<U>
  }
}
