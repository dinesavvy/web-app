import { createSlice } from "@reduxjs/toolkit";
import { reverseNudgeDetailsAPI } from "../../../services/businessService/reverseNudgeDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const reverseNudgeSlice = createSlice({
  name: "reverseNudge",
  initialState: data,
  reducers: {
    reverseNudgeInfo(state) {
      state.isLoading = true;
    },
    reverseNudgeSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    reverseNudgeFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    reverseNudgeReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const reverseNudgeHandler = (data) => async (dispatch) => {
  try {
    dispatch(reverseNudgeAction.reverseNudgeInfo());
    const response = await reverseNudgeDetailsAPI(data);
    dispatch(reverseNudgeAction.reverseNudgeSuccess(response));
  } catch (e) {
    dispatch(reverseNudgeAction.reverseNudgeFailure(e));
  }
};
export default reverseNudgeSlice.reducer;
export const reverseNudgeAction = reverseNudgeSlice.actions;
