import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordAPI } from "../../../services/distributorsService/forggotPassword";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: data,
  reducers: {
    forgotPasswordInfo(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    forgotPasswordFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    forgotPasswordReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const forgotPasswordHandler = (data) => async (dispatch) => {
  try {
    dispatch(forgotPasswordAction.forgotPasswordInfo());
    const response = await forgotPasswordAPI(data);
    dispatch(forgotPasswordAction.forgotPasswordSuccess(response));
  } catch (e) {
    dispatch(forgotPasswordAction.forgotPasswordFailure(e));
  }
};
export default forgotPasswordSlice.reducer;
export const forgotPasswordAction = forgotPasswordSlice.actions;
