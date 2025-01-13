import { createSlice } from "@reduxjs/toolkit";
import { fileUploadAPI } from "../../services/fileUpload";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const fileUploadSlice = createSlice({
  name: "fileupload",
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

export const fileUploadHandler = (data) => async (dispatch) => {
  try {
    dispatch(fileUploadAction.fileuploadInfo());
    const response = await fileUploadAPI(data);
    dispatch(fileUploadAction.fileuploadSuccess(response));
  } catch (e) {
    dispatch(fileUploadAction.fileuploadFailure(e));
  }
};
export default fileUploadSlice.reducer;
export const fileUploadAction = fileUploadSlice.actions;
