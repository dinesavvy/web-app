import { createSlice } from "@reduxjs/toolkit";
import { relaunchNudgeAPI } from "../../../services/businessService/relaunchNudge";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const relaunchNudgeSlice = createSlice({
  name: "relaunchNudge",
  initialState: data,
  reducers: {
    relaunchNudgeInfo(state) {
      state.isLoading = true;
    },
    relaunchNudgeSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    relaunchNudgeFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    relaunchNudgeReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const relaunchNudgeHandler = (data) => async (dispatch) => {
  try {
    dispatch(relaunchNudgeAction.relaunchNudgeInfo());
    const response = await relaunchNudgeAPI(data);
    dispatch(relaunchNudgeAction.relaunchNudgeSuccess(response));
  } catch (e) {
    dispatch(relaunchNudgeAction.relaunchNudgeFailure(e?.response?.data));
  }
};
export default relaunchNudgeSlice.reducer;
export const relaunchNudgeAction = relaunchNudgeSlice.actions;
