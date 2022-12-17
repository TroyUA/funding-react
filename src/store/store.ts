import { configureStore, combineReducers } from '@reduxjs/toolkit'
import usersReducer from './reducers/UsersSlice'

const rootRedecer = combineReducers({
  usersReducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootRedecer,
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootRedecer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
