import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appState = {
  appState: string;
  openSibar: boolean;
};

const initialState: appState = {
  appState: "",
  openSibar: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setOpenSibar: (state, action: PayloadAction<boolean>)=>{
      state.openSibar = action.payload
    }
  }
});

export const {
  setAppState,
  setOpenSibar
} = appStateSlice.actions;

export default appStateSlice.reducer;