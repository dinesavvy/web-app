import { createSlice } from "@reduxjs/toolkit";
import { nudgeRedeemedAPI } from "../../../services/businessService/nudgeRedeemed";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const nudgeRedeemedSlice = createSlice({
  name: "nudgeRedeemed",
  initialState: data,
  reducers: {
    nudgeRedeemedInfo(state) {
      state.isLoading = true;
    },
    nudgeRedeemedSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    nudgeRedeemedFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    nudgeRedeemedReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const nudgeRedeemedHandler = (data) => async (dispatch) => {
  try {
    dispatch(nudgeRedeemedAction.nudgeRedeemedInfo());
    const response = await nudgeRedeemedAPI(data);
    dispatch(nudgeRedeemedAction.nudgeRedeemedSuccess(response));
  } catch (e) {
    dispatch(nudgeRedeemedAction.nudgeRedeemedFailure(e?.response?.data));
  }
};
export default nudgeRedeemedSlice.reducer;
export const nudgeRedeemedAction = nudgeRedeemedSlice.actions;
