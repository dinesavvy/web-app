import { createSlice } from "@reduxjs/toolkit";
import { analyticsDetailsAPI } from "../../services/analytics-details";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const analyticsDetailsSlice = createSlice({
  name: "analyticsDetails",
  initialState: data,
  reducers: {
    analyticsDetailsInfo(state) {
      state.isLoading = true;
    },
    analyticsDetailsInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    analyticsDetailsInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    analyticsDetailsInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const analyticsDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(analyticsDetailsAction.analyticsDetailsInfo());
    const response = await analyticsDetailsAPI(data);
    dispatch(analyticsDetailsAction.analyticsDetailsInfoSuccess(response));
  } catch (e) {
    dispatch(analyticsDetailsAction.analyticsDetailsInfoFailure(e));
  }
};
export default analyticsDetailsSlice.reducer;
export const analyticsDetailsAction = analyticsDetailsSlice.actions;
