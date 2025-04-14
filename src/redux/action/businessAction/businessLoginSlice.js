import { createSlice } from "@reduxjs/toolkit";
import { businessLoginAPI } from "../../../services/businessService/businessLogin";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessLoginDetailsSlice = createSlice({
  name: "businessLogin",
  initialState: data,
  reducers: {
    businessLoginDetailsSliceInfo(state) {
      state.isLoading = true;
    },
    businessLoginSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessLoginSliceFailure(state, action) {

      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    businessLoginSliceReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessLoginHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessLoginAction.businessLoginDetailsSliceInfo());
    const response = await businessLoginAPI(data);
    dispatch(businessLoginAction.businessLoginSliceSuccess(response));
    localStorage.setItem("token", response?.data?.deviceDetails?.[0]?.deviceToken);
    localStorage.setItem("merchantLogin", true);
    localStorage.setItem("loginResponse",JSON.stringify(response?.data))
  } catch (e) {
    dispatch(businessLoginAction.businessLoginSliceFailure(e));
  }
};
export default businessLoginDetailsSlice.reducer;
export const businessLoginAction = businessLoginDetailsSlice.actions;
