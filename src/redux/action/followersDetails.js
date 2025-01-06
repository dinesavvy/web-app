import { createSlice } from "@reduxjs/toolkit";
import { followerDetailsAPI } from "../../services/followerDetails";

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
    followersDetailsInfo(state) {
      state.isLoading = true;
    },
    followersDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    followersDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    followersDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const followerDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(followerDetailsAction.followersDetailsInfo());
    const response = await followerDetailsAPI(data);
    dispatch(followerDetailsAction.followersDetailsSuccess(response));
  } catch (e) {
    dispatch(followerDetailsAction.followersDetailsFailure(e));
  }
};
export default followerDetailsSlice.reducer;
export const followerDetailsAction = followerDetailsSlice.actions;
