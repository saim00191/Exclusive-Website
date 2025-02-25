import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AdminInfo {
  name: string
  password: string 
}

interface AdminState {
  adminInfo: AdminInfo | null
}

const initialState: AdminState = {
  adminInfo: null,
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminInfo: (state, action: PayloadAction<AdminInfo>) => {
      state.adminInfo = action.payload
    },
    clearAdminInfo: (state) => {
      state.adminInfo = null
    },
  },
})

export const { setAdminInfo, clearAdminInfo } = adminSlice.actions
export default adminSlice.reducer

