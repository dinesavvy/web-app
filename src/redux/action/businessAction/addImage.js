import { createSlice } from "@reduxjs/toolkit";
import { addImageAPI } from "../../../services/businessService/addImage";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const addImageSlice = createSlice({
  name: "addImageData",
  initialState: data,
  reducers: {
    addImageInfo(state) {
      state.isLoading = true;
    },
    addImageSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    addImageFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.response?.data?.message;
      state.data = null;
    },
    addImageReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const addImageHandler = (data) => async (dispatch) => {
  try {
    dispatch(addImageAction.addImageInfo());
    const response = await addImageAPI(data);
    dispatch(
      addImageAction.addImageSuccess(response)
    );
  } catch (e) {
    dispatch(addImageAction.addImageFailure(e));
  }
};
export default addImageSlice.reducer;
export const addImageAction = addImageSlice.actions;
