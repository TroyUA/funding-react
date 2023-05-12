import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageApi } from '../../api/localStorage'
import { IProfile } from '../users/types'
import { IAuth, IAuthSuccess } from './types'

const initialState: IAuth = {
  token: LocalStorageApi.getAccessToken(),
  profile: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<IAuthSuccess>) {
      state.token = action.payload.token
      state.profile = action.payload.profile
    },
    logout(state) {
      LocalStorageApi.removeAccessToken()
      state.profile = null
      state.token = null
    },
    setProfile(state, action: PayloadAction<IProfile>) {
      state.profile = action.payload
    },
  },
})

export const { setCredentials, logout, setProfile } = authSlice.actions
export default authSlice.reducer
