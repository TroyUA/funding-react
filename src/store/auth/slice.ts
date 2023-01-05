import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageApi } from '../../api/localStorage'
import { IAuth, ILogin, IValidationErrors } from './types'

const initialState: IAuth = {
  token: null,
  profile: null,
  isLoading: false,
  error: '',
} as const

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authFetchingStart(state) {
      state.isLoading = true
    },
    authFetchingSuccess(state, action: PayloadAction<ILogin>) {
      state.token = action.payload.token
      state.profile = action.payload.profile
      state.error = ''
      state.isLoading = false
    },
    authFetchingError(state, action: PayloadAction<IValidationErrors | string>) {
      state = {
        ...initialState,
        error: typeof action.payload === 'string' ? action.payload : action.payload.errors,
      }
    },
    logout() {
      LocalStorageApi.removeAccessToken()
      return { ...initialState }
    },
  },
})

export const { authFetchingStart, authFetchingSuccess, authFetchingError, logout } =
  authSlice.actions
export default authSlice.reducer
