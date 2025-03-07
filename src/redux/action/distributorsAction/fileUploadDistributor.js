import { createSlice } from "@reduxjs/toolkit";
import { fileUploadDistributorAPI } from "../../../services/distributorsService/fileUploadDistributor";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const fileUploadDistributorSlice = createSlice({
  name: "fileUploadDistributor",
  initialState: data,
  reducers: {
    fileuploadDistributorInfo(state) {
      state.isLoading = true;
    },
    fileuploadDistributorSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    fileuploadDistributorFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    fileuploadDistributorReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const fileUploadDistributorHandler = (data) => async (dispatch) => {
  try {
    dispatch(fileUploadDistributorAction.fileuploadDistributorInfo());
    const response = await fileUploadDistributorAPI(data);
    dispatch(fileUploadDistributorAction.fileuploadDistributorSuccess(response));
  } catch (e) {
    dispatch(fileUploadDistributorAction.fileuploadDistributorFailure(e));
  }
};
export default fileUploadDistributorSlice.reducer;
export const fileUploadDistributorAction = fileUploadDistributorSlice.actions;
