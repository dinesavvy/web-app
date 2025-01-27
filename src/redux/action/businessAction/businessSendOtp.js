import { createSlice } from "@reduxjs/toolkit";
import { businessSendOtpAPI } from "../../../services/businessService/businessSendOtp";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessSendDetailsSlice = createSlice({
  name: "businessSendOtp",
  initialState: data,
  reducers: {
    businessSendOtpDetailsSliceInfo(state) {
      state.isLoading = true;
    },
    businessSendOtpSliceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessSendOtpSliceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    businessSendOtpSliceReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessSendOtpHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessSendOtpAction.businessSendOtpDetailsSliceInfo());
    const response = await businessSendOtpAPI(data);

    dispatch(businessSendOtpAction.businessSendOtpSliceSuccess(response));
  } catch (e) {
    dispatch(businessSendOtpAction.businessSendOtpSliceFailure(e));
  }
};
export default businessSendDetailsSlice.reducer;
export const businessSendOtpAction = businessSendDetailsSlice.actions;
