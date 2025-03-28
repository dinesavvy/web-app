import { createSlice } from "@reduxjs/toolkit";
import { reverseNudgeStatusUpdateAPI } from "../../../services/businessService/reverseNudgeStatusUpdate";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const reverseNudgeStatusUpdateSlice = createSlice({
  name: "reverseNudgeStatusUpdate",
  initialState: data,
  reducers: {
    reverseNudgeStatusUpdateInfo(state) {
      state.isLoading = true;
    },
    reverseNudgeStatusUpdateSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    reverseNudgeStatusUpdateFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    reverseNudgeStatusUpdateReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const reverseNudgeStatusUpdateHandler = (data) => async (dispatch) => {
  try {
    dispatch(reverseNudgeStatusUpdateAction.reverseNudgeStatusUpdateInfo());
    const response = await reverseNudgeStatusUpdateAPI(data);
    dispatch(reverseNudgeStatusUpdateAction.reverseNudgeStatusUpdateSuccess(response));
  } catch (e) {
    dispatch(reverseNudgeStatusUpdateAction.reverseNudgeStatusUpdateFailure(e));
  }
};
export default reverseNudgeStatusUpdateSlice.reducer;
export const reverseNudgeStatusUpdateAction = reverseNudgeStatusUpdateSlice.actions;
