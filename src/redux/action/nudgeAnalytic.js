import { createSlice } from "@reduxjs/toolkit";
import { nudgeAnalyticAPI } from "../../services/nudgeAnalytic";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const nudgeAnalyticSlice = createSlice({
  name: "nudgeAnalytic",
  initialState: data,
  reducers: {
    nudgeDetailsInfo(state) {
      state.isLoading = true;
    },
    nudgeDetailsInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    nudgeDetailsInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    nudgeDetailsInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const nudgeAnalyticHandler = (data) => async (dispatch) => {
  try {
    dispatch(nudgeAnalyticSliceAction.nudgeDetailsInfo());
    const response = await nudgeAnalyticAPI(data);
    dispatch(nudgeAnalyticSliceAction.nudgeDetailsInfoSuccess(response));
    // setItem("adminId", response?.data?.id);
  } catch (e) {
    dispatch(nudgeAnalyticSliceAction.nudgeDetailsInfoFailure(e));
  }
};
export default nudgeAnalyticSlice.reducer;
export const nudgeAnalyticSliceAction = nudgeAnalyticSlice.actions;
