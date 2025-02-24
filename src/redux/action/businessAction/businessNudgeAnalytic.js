import { createSlice } from "@reduxjs/toolkit";
import { nudgeAnalyticAPI } from "../../../services/businessService/nudgeAnalytic";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessNudgeAnalyticSlice = createSlice({
  name: "businessNudgeAnalytic",
  initialState: data,
  reducers: {
    nudgeAnalyticInfo(state) {
      state.isLoading = true;
    },
    nudgeAnalyticSuccess(state, action) {
        console.log(action,"actionaction")
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    nudgeAnalyticFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    nudgeAnalyticReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessNudgeAnalyticHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessNudgeAnalyticAction.nudgeAnalyticInfo());
    const response = await nudgeAnalyticAPI(data);
    dispatch(businessNudgeAnalyticAction.nudgeAnalyticSuccess(response));
  } catch (e) {
    dispatch(businessNudgeAnalyticAction.nudgeAnalyticFailure(e));
  }
};
export default businessNudgeAnalyticSlice.reducer;
export const businessNudgeAnalyticAction = businessNudgeAnalyticSlice.actions;
