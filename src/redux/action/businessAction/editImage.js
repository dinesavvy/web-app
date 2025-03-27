import { createSlice } from "@reduxjs/toolkit";
import { editImageAPI } from "../../../services/businessService/editImage";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const editImageSlice = createSlice({
  name: "editImage",
  initialState: data,
  reducers: {
    editImageInfo(state) {
      state.isLoading = true;
    },
    editImageSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    edotImageFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    editImageReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const editImageHandler = (data) => async (dispatch) => {
  try {
    dispatch(editImageAction.editImageInfo());
    const response = await editImageAPI(data);
    dispatch(editImageAction.editImageSuccess(response));
  } catch (e) {
    dispatch(editImageAction.edotImageFailure(e.response.data.message));
  }
};
export default editImageSlice.reducer;
export const editImageAction = editImageSlice.actions;
