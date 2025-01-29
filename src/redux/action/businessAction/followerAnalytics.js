import { createSlice } from "@reduxjs/toolkit";
import { followerAnalyticsAPI } from "../../../services/businessService/followerAnalytics";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const followerAnalyticsSlice = createSlice({
  name: "followerAnalytics",
  initialState: data,
  reducers: {
    followerAnalyticsInfo(state) {
      state.isLoading = true;
    },
    followerAnalyticsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    followerAnalyticsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    followerAnalyticsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const followerAnalyticsHandler = (data) => async (dispatch) => {
  try {
    dispatch(followerAnalyticsAction.followerAnalyticsInfo());
    const response = await followerAnalyticsAPI(data);
    dispatch(followerAnalyticsAction.followerAnalyticsSuccess(response));
  } catch (e) {
    dispatch(followerAnalyticsAction.followerAnalyticsFailure(e));
  }
};
export default followerAnalyticsSlice.reducer;
export const followerAnalyticsAction = followerAnalyticsSlice.actions;
