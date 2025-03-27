import { createSlice } from "@reduxjs/toolkit";
import { galleryListAPI } from "../../../services/businessService/galleryList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const galleryListSlice = createSlice({
  name: "galleryList",
  initialState: data,
  reducers: {
    galleryListInfo(state) {
      state.isLoading = true;
    },
    galleryListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    galleryListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    galleryListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const galleryListHandler = (data) => async (dispatch) => {
  try {
    dispatch(galleryListAction.galleryListInfo());
    const response = await galleryListAPI(data);
    dispatch(galleryListAction.galleryListSuccess(response));
  } catch (e) {
    dispatch(galleryListAction.galleryListFailure(e));
  }
};
export default galleryListSlice.reducer;
export const galleryListAction = galleryListSlice.actions;
