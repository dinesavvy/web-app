import { configureStore } from "@reduxjs/toolkit";
import businessLoginSlice from "../action/businessAction/businessLoginSlice";
import businessSendOtpSlice from "../action/businessAction/businessSendOtp";
import businessListSlice from "../action/businessAction/businessListSlice";
import businessListFollowerListSlice from "../action/businessAction/businessFollowers";
import businessNudgesListSlice from "../action/businessAction/businessNudgesList";
import businessCreateNudgeSlice from "../action/businessAction/businessCreateNudge";
import businessNudgesTemplateSlice from "../action/businessAction/businessNudgesTemplate";

const store = configureStore({
  reducer: {
    businessLogin: businessLoginSlice,
    businessSendOtp: businessSendOtpSlice,
    businessList: businessListSlice,
    businessListFollowerList: businessListFollowerListSlice,
    businessNudgesList: businessNudgesListSlice,
    businessCreateNudge: businessCreateNudgeSlice,
    businessNudgesTemplate: businessNudgesTemplateSlice,
  },
});

export default store;
