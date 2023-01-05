import { configureStore, combineReducers } from '@reduxjs/toolkit'
import usersReducer from './users/slice'
import authReducer from './auth/slice'

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
