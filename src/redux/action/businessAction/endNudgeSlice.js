import { createSlice } from "@reduxjs/toolkit";
import { endNudgeAPI } from "../../../services/businessService/endNudge";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const endNudgeSlice = createSlice({
  name: "endNudge",
  initialState: data,
  reducers: {
    endNudgeInfo(state) {
      state.isLoading = true;
    },
    endNudgeSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    endNudgeFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    endNudgeReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const endNudgeHandler = (data) => async (dispatch) => {
  try {
    dispatch(endNudgeAction.endNudgeInfo());
    const response = await endNudgeAPI(data);
    dispatch(endNudgeAction.endNudgeSuccess(response));
  } catch (e) {
    dispatch(endNudgeAction.endNudgeFailure(e.response.data));
  }
};
export default endNudgeSlice.reducer;
export const endNudgeAction = endNudgeSlice.actions;
