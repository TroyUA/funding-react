const accessToken = 'accessToken'

export class LocalStorageApi {
  static setAccessToken(token: string): void {
    localStorage.setItem(accessToken, token)
  }

  static getAccessToken(): string {
    const token = localStorage.getItem(accessToken) || ''
    return token === 'undefined' ? '' : token
  }

  static removeAccessToken(): void {
    localStorage.removeItem(accessToken)
  }
}
