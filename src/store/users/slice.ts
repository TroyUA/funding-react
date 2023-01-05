import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, IUsersState } from './types'

export const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersFetchingStart(state) {
      state.isLoading = true
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { usersFetchingStart, usersFetchingSuccess, usersFetchingError } = usersSlice.actions

export default usersSlice.reducer
