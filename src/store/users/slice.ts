// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { fetchUsers } from './asyncThunk'
// import { IUser, IUsers } from './types'

// export const initialState: IUsers = {
//   users: [],
//   isLoading: false,
//   error: '',
// }

// export const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
//       state.isLoading = false
//       state.error = ''
//       state.users = action.payload
//     },
//     [fetchUsers.pending.type]: (state) => {
//       state.isLoading = true
//     },
//     [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
//       state.isLoading = false
//       state.error = action.payload
//     },
//   },
// })

// // export const { usersFetchingStart, usersFetchingSuccess, usersFetchingError } = usersSlice.actions

// export default usersSlice.reducer
