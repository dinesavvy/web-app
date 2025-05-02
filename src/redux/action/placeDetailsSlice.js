import { createSlice } from "@reduxjs/toolkit";
import { placeDetailsAPI } from "../../services/placeDetail";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const placeDetailsSlice = createSlice({
  name: "placeDetails",
  initialState: data,
  reducers: {
    placeDetailsInfo(state) {
      state.isLoading = true;
    },
    placeDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    placeDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    placeDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const placeDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(placeDetailsAction.placeDetailsInfo());
    const response = await placeDetailsAPI(data);
    dispatch(placeDetailsAction.placeDetailsSuccess(response));
  } catch (e) {
    dispatch(placeDetailsAction.placeDetailsFailure(e));
  }
};
export default placeDetailsSlice.reducer;
export const placeDetailsAction = placeDetailsSlice.actions;
