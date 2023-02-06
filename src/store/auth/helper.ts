import { axiosApi } from '../../api/graphQL'
import { LocalStorageApi } from '../../api/localStorage'

export function setAuthTokenInSystem(
  token: string,
  params: { setInLocalStorage?: boolean } = {}
): void {
  const { setInLocalStorage = true } = params
  axiosApi.defaults.headers.common.Authorization = `Bearer ${token}`

  if (setInLocalStorage) {
    LocalStorageApi.setAccessToken(token)
  }
}
