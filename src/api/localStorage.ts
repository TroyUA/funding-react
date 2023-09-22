const accessToken = 'accessToken'

export class LocalStorageApi {
  static setAccessToken(token: string) {
    localStorage.setItem(accessToken, token)
  }

  static getAccessToken() {
    return localStorage.getItem(accessToken)
  }

  static removeAccessToken() {
    localStorage.removeItem(accessToken)
  }
}
