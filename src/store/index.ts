import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import usersReducer from './users/slice'
import authReducer from './auth/slice'
import { usersAPI } from './users/service'
import { authAPI } from './auth/service'
import { listsAPI } from './lists/service'

const rootReducer = combineReducers({
  // users: usersReducer,
  auth: authReducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [listsAPI.reducerPath]: listsAPI.reducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(usersAPI.middleware, authAPI.middleware, listsAPI.middleware),
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
