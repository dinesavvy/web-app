import { configureStore } from "@reduxjs/toolkit";
import businessLoginSlice from "../action/businessAction/businessLoginSlice";
import businessSendOtpSlice from "../action/businessAction/businessSendOtp";
import businessListSlice from "../action/businessAction/businessListSlice";
import businessListFollowerListSlice from "../action/businessAction/businessFollowers";

const store = configureStore({
  reducer: {
    businessLogin: businessLoginSlice,
    businessSendOtp: businessSendOtpSlice,
    businessList: businessListSlice,
    businessListFollowerList: businessListFollowerListSlice,
  },
});

export default store;
