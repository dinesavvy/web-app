import { createSlice } from "@reduxjs/toolkit";
import { merchantPerformanceAnalyticsListAPI } from "../../services/merchantPerformanceAnalyticsList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const merchantPerformanceAnalyticsListSlice = createSlice({
  name: "merchantPerformanceAnalyticsList",
  initialState: data,
  reducers: {
    merchantPerformanceAnalyticsListInfo(state) {
      state.isLoading = true;
    },
    merchantPerformanceAnalyticsListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    merchantPerformanceAnalyticsListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    merchantPerformanceAnalyticsListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const merchantPerfomanceAnalyticsListHandler = (data) => async (dispatch) => {
  try {
    dispatch(merchantPerformanceAnalyticsListAction.merchantPerformanceAnalyticsListInfo());
    const response = await merchantPerformanceAnalyticsListAPI(data);
    dispatch(merchantPerformanceAnalyticsListAction.merchantPerformanceAnalyticsListSuccess(response));
  } catch (e) {
    dispatch(merchantPerformanceAnalyticsListAction.merchantPerformanceAnalyticsListFailure(e));
  }
};
export default merchantPerformanceAnalyticsListSlice.reducer;
export const merchantPerformanceAnalyticsListAction = merchantPerformanceAnalyticsListSlice.actions;
