import { createSlice } from "@reduxjs/toolkit";
import { checkResetPasswordLinkAPI } from "../../../services/supplierServices/checkResetPasswordLink";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const checkResetPasswordSlice = createSlice({
  name: "checkResetPassword",
  initialState: data,
  reducers: {
    checkResetPasswordInfo(state) {
      state.isLoading = true;
    },
    checkResetPasswordSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    checkResetPasswordFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    checkResetPasswordReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const checkResetPasswordLinkHandler = (data) => async (dispatch) => {
  try {
    dispatch(checkResetPasswordAction.checkResetPasswordInfo());
    const response = await checkResetPasswordLinkAPI(data);
    dispatch(checkResetPasswordAction.checkResetPasswordSuccess(response));
  } catch (e) {
    dispatch(checkResetPasswordAction.checkResetPasswordFailure(e?.response));
  }
};
export default checkResetPasswordSlice.reducer;
export const checkResetPasswordAction = checkResetPasswordSlice.actions;
