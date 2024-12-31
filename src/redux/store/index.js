import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../action/loginSlice";

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSlice,
  },
});

export default store;
