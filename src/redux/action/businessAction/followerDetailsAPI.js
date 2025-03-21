import { createSlice } from "@reduxjs/toolkit";
import { followerDetailsAPI } from "../../../services/businessService/followerDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const followerDetailsSlice = createSlice({
  name: "followerDetails",
  initialState: data,
  reducers: {
    followerDetailsInfo(state) {
      state.isLoading = true;
    },
    followerDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    followerDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    followerDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const followerDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(followerDetailsAction.followerDetailsInfo());
    const response = await followerDetailsAPI(data);
    dispatch(followerDetailsAction.followerDetailsSuccess(response));
  } catch (e) {
    dispatch(followerDetailsAction.followerDetailsFailure(e));
  }
};
export default followerDetailsSlice.reducer;
export const followerDetailsAction = followerDetailsSlice.actions;
