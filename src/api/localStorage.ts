const accessToken = 'accessToken'

export class LocalStorageApi {
  static setAccessToken(token: string): void {
    localStorage.setItem(accessToken, token)
  }

  static getAccessToken() {
    return localStorage.getItem(accessToken)
  }

  static removeAccessToken(): void {
    localStorage.removeItem(accessToken)
  }
}
