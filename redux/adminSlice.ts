import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AdminInfo {

  name: string | null
  password: string | number | boolean;
}

interface InitialState {
  adminInfo: AdminInfo | null;
}

const initialState: InitialState = {
    adminInfo: null,
};

export const AdminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    

    setAdminInfo: (state, action: PayloadAction<AdminInfo>) => {
      state.adminInfo = action.payload;
    },
    signOut: (state) => {
      state.adminInfo = null;
      
    },
  },
});

export const {
  setAdminInfo,
  signOut,
} = AdminSlice.actions;
export default AdminSlice.reducer;
