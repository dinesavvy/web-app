import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "../../services/login";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const loginDetailsSlice = createSlice({
  name: "loginSliceDetails",
  initialState: data,
  reducers: {
    loginDetailsSliceInfo(state) {
      state.isLoading = true;
    },
    loginDetailsSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    loginDetailsSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    loginDetailsSliceReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const loginHandler = (data) => async (dispatch) => {
  try {
    dispatch(loginSliceAction.loginDetailsSliceInfo());
    const response = await loginAPI(data);
    dispatch(loginSliceAction.loginDetailsSliceSuccess(response));
    localStorage.setItem("token", response?.data?.deviceData?.deviceToken)
    localStorage.setItem("adminId", response?.data?._id)
  } catch (e) {
    dispatch(loginSliceAction.loginDetailsSliceFailure(e));
  }
};
export default loginDetailsSlice.reducer;
export const loginSliceAction = loginDetailsSlice.actions;
