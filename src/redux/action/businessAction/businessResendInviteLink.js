import { createSlice } from "@reduxjs/toolkit";
import { businessResendInviteLinkAPI } from "../../../services/businessService/businessResendInviteLink";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessResendInviteLinkSlice = createSlice({
  name: "businessResendInviteLink",
  initialState: data,
  reducers: {
    businessResendInviteLinkInfo(state) {
      state.isLoading = true;
    },
    businessResendInviteLinkSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessResendInviteLinkFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessResendInviteLinkReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessResendInviteLinkHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessResendInviteLinkAction.businessResendInviteLinkInfo());
    const response = await businessResendInviteLinkAPI(data);
    dispatch(businessResendInviteLinkAction.businessResendInviteLinkSuccess(response));
  } catch (e) {
    dispatch(businessResendInviteLinkAction.businessResendInviteLinkFailure(e));
  }
};
export default businessResendInviteLinkSlice.reducer;
export const businessResendInviteLinkAction = businessResendInviteLinkSlice.actions;
