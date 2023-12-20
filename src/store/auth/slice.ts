import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageApi } from '../../api/localStorage'
import { Profile } from '../users/types'
import { Auth, AuthSuccess } from './types'

const initialState: Auth = {
  token: LocalStorageApi.getAccessToken(),
  profile: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthSuccess>) {
      state.token = action.payload.token
      state.profile = action.payload.profile
    },
    logout(state) {
      LocalStorageApi.removeAccessToken()
      state.profile = null
      state.token = null
    },
    setProfile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload
    },
  },
})

export const { setCredentials, logout, setProfile } = authSlice.actions
export default authSlice.reducer
