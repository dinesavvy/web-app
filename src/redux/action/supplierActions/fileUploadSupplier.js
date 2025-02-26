import { createSlice } from "@reduxjs/toolkit";
import { fileUploadSupplierAPI } from "../../../services/supplierServices/fileUploadSupplier";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const fileUploadSupplierSlice = createSlice({
  name: "fileUploadSupplier",
  initialState: data,
  reducers: {
    fileuploadInfo(state) {
      state.isLoading = true;
    },
    fileuploadSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    fileuploadFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    fileuploadReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const fileUploadSupplierHandler = (data) => async (dispatch) => {
  try {
    dispatch(fileUploadSupplierAction.fileuploadInfo());
    const response = await fileUploadSupplierAPI(data);
    dispatch(fileUploadSupplierAction.fileuploadSuccess(response));
  } catch (e) {
    dispatch(fileUploadSupplierAction.fileuploadFailure(e));
  }
};
export default fileUploadSupplierSlice.reducer;
export const fileUploadSupplierAction = fileUploadSupplierSlice.actions;
