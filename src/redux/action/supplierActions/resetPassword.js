import { createSlice } from "@reduxjs/toolkit";
import { resetPasswordAPI } from "../../../services/supplierServices/resetPassword";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: data,
  reducers: {
    resetPasswordInfo(state) {
      state.isLoading = true;
    },
    resetPasswordSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    resetPasswordFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    resetPasswordReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const resetPasswordHandler = (data) => async (dispatch) => {
  try {
    dispatch(resetPasswordAction.resetPasswordInfo());
    const response = await resetPasswordAPI(data);
    dispatch(resetPasswordAction.resetPasswordSuccess(response));
  } catch (e) {
    dispatch(resetPasswordAction.resetPasswordFailure(e?.response?.data?.message));
  }
};
export default resetPasswordSlice.reducer;
export const resetPasswordAction = resetPasswordSlice.actions;
