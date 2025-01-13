import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../action/loginSlice";
import merchantsListSlice from "../action/merchantsList";
import merchantDetailsSlice from "../action/merchantDetails";
import followerListSlice from "../action/followersList";
import nudgesListSlice from "../action/nudgesList";
import followersDetailsSlice from "../action/followersDetails";
import nudgeDetailsMainSlice from "../action/nudgeDetails";
import followerArchiveSlice from "../action/followerArchive";
import analyticsDetailsSlice from "../action/analyticsDetails";
import createNudgeSlice from "../action/create-nudge";
import getNudgesTemplateSlice from "../action/getNudgesTemplate";
import listByUserIdSlice from "../action/listByUserId";
import merchantPerformanceAnalyticsListSlice from "../action/merchantPerfomanceAnalyticsList";
import fileuploadSlice from "../action/fileUpload";

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSlice,
    merchantsList: merchantsListSlice,
    merchantDetails: merchantDetailsSlice,
    followeList: followerListSlice,
    nudgesList: nudgesListSlice,
    followerDetails: followersDetailsSlice,
    nudgeDetailsMain: nudgeDetailsMainSlice,
    followerArchive: followerArchiveSlice,
    analyticsDetails: analyticsDetailsSlice,
    createNudge: createNudgeSlice,
    getNudgesTemplate: getNudgesTemplateSlice,
    listByUserId: listByUserIdSlice,
    merchantPerformanceAnalyticsList: merchantPerformanceAnalyticsListSlice,
    fileupload: fileuploadSlice,
  },
});

export default store;
