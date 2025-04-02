import { createSlice } from "@reduxjs/toolkit";
import { resetPasswordDistributorAPI } from "../../../services/distributorsService/resetPassword";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const resetPasswordDistributorSlice = createSlice({
  name: "resetPasswordDistributor",
  initialState: data,
  reducers: {
    resetPasswordDistributorInfo(state) {
      state.isLoading = true;
    },
    resetPasswordDistributorSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    resetPasswordDistributorFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    resetPasswordDistributorReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const resetPasswordDistributorHandler = (data) => async (dispatch) => {
  try {
    dispatch(resetPasswordDistributorAction.resetPasswordDistributorInfo());
    const response = await resetPasswordDistributorAPI(data);
    dispatch(resetPasswordDistributorAction.resetPasswordDistributorSuccess(response));
  } catch (e) {
    dispatch(resetPasswordDistributorAction.resetPasswordDistributorFailure(e?.response?.data?.message));
  }
};
export default resetPasswordDistributorSlice.reducer;
export const resetPasswordDistributorAction = resetPasswordDistributorSlice.actions;
