import { createSlice } from "@reduxjs/toolkit";
import { merchantPerformanceAnalyticsDetailsAPI } from "../../services/merchantPerformaceAnalyticsDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const merchantPerformanceAnalyticsDetailsSlice = createSlice({
  name: "merchantPerformanceAnalyticsDetails",
  initialState: data,
  reducers: {
    merchantPerformanceAnalyticsDetailsInfo(state) {
      state.isLoading = true;
    },
    merchantPerformanceAnalyticsDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    merchantPerformanceAnalyticsDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    merchantPerformanceAnalyticsDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const merchantPerformanceAnalyticsDetailsHandler =
  (data) => async (dispatch) => {
    try {
      dispatch(
        merchantPerformanceAnalyticsDetailsAction.merchantPerformanceAnalyticsDetailsInfo()
      );
      const response = await merchantPerformanceAnalyticsDetailsAPI(data);
      dispatch(
        merchantPerformanceAnalyticsDetailsAction.merchantPerformanceAnalyticsDetailsSuccess(
          response
        )
      );
    } catch (e) {
      dispatch(
        merchantPerformanceAnalyticsDetailsAction.merchantPerformanceAnalyticsDetailsFailure(
          e
        )
      );
    }
  };
export default merchantPerformanceAnalyticsDetailsSlice.reducer;
export const merchantPerformanceAnalyticsDetailsAction =
  merchantPerformanceAnalyticsDetailsSlice.actions;
