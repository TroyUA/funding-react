import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = { sidebar: { isOpen: false } }

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebar.isOpen = action.payload
    },
    toggleOpen(state) {
      state.sidebar.isOpen = !state.sidebar.isOpen
    },
  },
})

export const { setIsSidebarOpen, toggleOpen } = layoutSlice.actions
export default layoutSlice.reducer
