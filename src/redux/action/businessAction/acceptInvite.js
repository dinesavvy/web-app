import { createSlice } from "@reduxjs/toolkit";
import { acceptInviteAPI } from "../../../services/businessService/acceptInvite";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const acceptInviteSlice = createSlice({
  name: "acceptInvite",
  initialState: data,
  reducers: {
    acceptInviteInfo(state) {
      state.isLoading = true;
    },
    acceptInviteSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    acceptInviteFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.response?.data?.message;
      state.data = null;
    },
    acceptInviteReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const acceptInviteHandler = (data) => async (dispatch) => {
  try {
    dispatch(acceptInviteAction.acceptInviteInfo());
    const response = await acceptInviteAPI(data);
    dispatch(
      acceptInviteAction.acceptInviteSuccess(response)
    );
  } catch (e) {
    dispatch(acceptInviteAction.acceptInviteFailure(e));
  }
};
export default acceptInviteSlice.reducer;
export const acceptInviteAction = acceptInviteSlice.actions;
