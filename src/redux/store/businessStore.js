import { configureStore } from "@reduxjs/toolkit";
import businessLoginSlice from "../action/businessAction/businessLoginSlice";

const store = configureStore({
  reducer: {
    businessLogin: businessLoginSlice,
  },
});

export default store;
