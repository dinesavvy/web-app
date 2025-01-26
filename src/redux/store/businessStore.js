import { configureStore } from "@reduxjs/toolkit";
import businessLoginSlice from "../action/businessAction/businessLoginSlice";
import businessSendOtpSlice from "../action/businessAction/businessSendOtp"

const store = configureStore({
  reducer: {
    businessLogin: businessLoginSlice,
    businessSendOtp:businessSendOtpSlice
  },
});

export default store;
