import { createSlice } from "@reduxjs/toolkit";
import { deleteImageAPI } from "../../../services/businessService/deleteImage";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const deleteImageSlice = createSlice({
  name: "deleteImage",
  initialState: data,
  reducers: {
    deleteImageInfo(state) {
      state.isLoading = true;
    },
    deleteImageSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    deleteImageFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    deleteImageReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const deleteImageHandler = (data) => async (dispatch) => {
  try {
    dispatch(deleteImageAction.deleteImageInfo());
    const response = await deleteImageAPI(data);
    dispatch(deleteImageAction.deleteImageSuccess(response));
  } catch (e) {
    dispatch(deleteImageAction.deleteImageFailure(e.response.data.message));
  }
};
export default deleteImageSlice.reducer;
export const deleteImageAction = deleteImageSlice.actions;
