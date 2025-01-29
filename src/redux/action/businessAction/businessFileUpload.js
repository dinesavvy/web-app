import { createSlice } from "@reduxjs/toolkit";
import { businessFileUploadAPI } from "../../../services/businessService/businessFileUpload";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessFileUploadSlice = createSlice({
  name: "businessFileUpload",
  initialState: data,
  reducers: {
    businessFileUploadInfo(state) {
      state.isLoading = true;
    },
    businessFileUploadSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessFileUploadFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessFileUploadReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessFileUploadHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessFileUploadAction.businessFileUploadInfo());
    const response = await businessFileUploadAPI(data);
    dispatch(businessFileUploadAction.businessFileUploadSuccess(response));
  } catch (e) {
    dispatch(businessFileUploadAction.businessFileUploadFailure(e));
  }
};
export default businessFileUploadSlice.reducer;
export const businessFileUploadAction = businessFileUploadSlice.actions;
