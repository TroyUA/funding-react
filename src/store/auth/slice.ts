import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageApi } from '../../api/localStorage'
import { IProfile } from '../users/types'
import { IAuth, IAuthError, ILoginSuccess, IValidationErrors } from './types'

const initialState: IAuth = {
  token: LocalStorageApi.getAccessToken(),
  profile: null,
  isLoading: false,
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authFetchingStart(state) {
      state.isLoading = true
    },
    setCredentials(state, action: PayloadAction<ILoginSuccess>) {
      state.token = action.payload.token
      state.profile = action.payload.profile
      state.error = ''
      state.isLoading = false
    },
    authFetchingError(state, action: PayloadAction<IValidationErrors | string>) {
      state = initialState
      state.error = typeof action.payload === 'string' ? action.payload : action.payload.errors
    },
    profileFetchingError(state, action: PayloadAction<IAuthError>) {
      state.error = action.payload.message
    },
    logout() {
      LocalStorageApi.removeAccessToken()
      return { ...initialState }
    },
    setProfile(state, action: PayloadAction<IProfile>) {
      state.profile = action.payload
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
  },
})

export const {
  authFetchingStart,
  setCredentials,
  authFetchingError,
  logout,
  setProfile,
  setToken,
  profileFetchingError,
} = authSlice.actions
export default authSlice.reducer
