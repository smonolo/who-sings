import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppState {
  modal: string
}

const initialState: AppState = {
  modal: ''
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<string>) => {
      state.modal = action.payload
    },
    resetModal: state => {
      state.modal = initialState.modal
    }
  }
})

export const { setModal, resetModal } = appSlice.actions

export default appSlice.reducer
