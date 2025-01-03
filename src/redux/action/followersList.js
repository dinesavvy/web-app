import { createSlice } from "@reduxjs/toolkit";
import { followerListAPI } from "../../services/followersList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const followersListSlice = createSlice({
  name: "followeList",
  initialState: data,
  reducers: {
    followerListInfo(state) {
      state.isLoading = true;
    },
    followerListInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    followerListInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    followerListInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const followersListHandler = (data) => async (dispatch) => {
  try {
    dispatch(followerListAction.followerListInfo());
    const response = await followerListAPI(data);
    dispatch(followerListAction.followerListInfoSuccess(response));
  } catch (e) {
    dispatch(followerListAction.followerListInfoFailure(e));
  }
};
export default followersListSlice.reducer;
export const followerListAction = followersListSlice.actions;
