import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/slice'
import { layoutSlice } from './layout/slice'
import { usersAPI } from './users/service'
import { authAPI } from './auth/service'
import { listsAPI } from './lists/service'
import { uploadAPI } from './upload/service'

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [layoutSlice.name]: layoutSlice.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [listsAPI.reducerPath]: listsAPI.reducer,
  [uploadAPI.reducerPath]: uploadAPI.reducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gDM) =>
      gDM().concat(
        usersAPI.middleware,
        authAPI.middleware,
        listsAPI.middleware,
        uploadAPI.middleware
      ),
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
