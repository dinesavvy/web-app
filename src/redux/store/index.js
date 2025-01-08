import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../action/loginSlice";
import merchantsListSlice from "../action/merchantsList";
import merchantDetailsSlice from "../action/merchantDetails";
import followerListSlice from "../action/followersList";
import nudgesListSlice from "../action/nudgesList";
import followersDetailsSlice from "../action/followersDetails";
import nudgeDetailsMainSlice from "../action/nudgeDetails";

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSlice,
    merchantsList: merchantsListSlice,
    merchantDetails: merchantDetailsSlice,
    followeList: followerListSlice,
    nudgesList: nudgesListSlice,
    followerDetails: followersDetailsSlice,
    nudgeDetailsMain: nudgeDetailsMainSlice,
  },
});

export default store;
