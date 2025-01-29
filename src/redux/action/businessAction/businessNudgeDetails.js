import { createSlice } from "@reduxjs/toolkit";
import { businessNudgeDetailsAPI } from "../../../services/businessService/businessNudgeDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessNudgeDetailsSlice = createSlice({
  name: "businessNudgeDetails",
  initialState: data,
  reducers: {
    businessNudgeDetailsInfo(state) {
      state.isLoading = true;
    },
    businessNudgeDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessNudgeDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessNudgeDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessNudgeDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessNudgeDetailAction.businessNudgeDetailsInfo());
    const response = await businessNudgeDetailsAPI(data);
    dispatch(businessNudgeDetailAction.businessNudgeDetailsSuccess(response));
  } catch (e) {
    dispatch(businessNudgeDetailAction.businessNudgeDetailsFailure(e));
  }
};
export default businessNudgeDetailsSlice.reducer;
export const businessNudgeDetailAction = businessNudgeDetailsSlice.actions;
