import { createSlice } from "@reduxjs/toolkit";
import { resendInviteLinkAPI } from "../../services/resendInviteLink";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const resendInviteLinkSlice = createSlice({
  name: "resendInviteLink",
  initialState: data,
  reducers: {
    resendInviteInfo(state) {
      state.isLoading = true;
    },
    resendInviteSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    resendInviteFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    resendInviteReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const resendInviteLinkHandler = (data) => async (dispatch) => {
  try {
    dispatch(resendInviteLinkAction.resendInviteInfo());
    const response = await resendInviteLinkAPI(data);
    dispatch(resendInviteLinkAction.resendInviteSuccess(response));
  } catch (e) {
    dispatch(resendInviteLinkAction.resendInviteFailure(e));
  }
};
export default resendInviteLinkSlice.reducer;
export const resendInviteLinkAction = resendInviteLinkSlice.actions;
