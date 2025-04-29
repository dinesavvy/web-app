import { createSlice } from "@reduxjs/toolkit";
import { googleBusinessAPI } from "../../services/googleBusiness";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const googleBusinessSlice = createSlice({
  name: "googleBusiness",
  initialState: data,
  reducers: {
    googleBusinessInfo(state) {
      state.isLoading = true;
    },
    googleBusinessSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    googleBusinessFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    googleBusinessReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const googleBusinessHandler = (fields,placeId, apiKey) => async (dispatch) => {
  try {
    dispatch(googleBusinessSliceAction.googleBusinessInfo());
    const response = await googleBusinessAPI(fields,placeId, apiKey);
    dispatch(googleBusinessSliceAction.googleBusinessSuccess(response));
  } catch (e) {
    dispatch(googleBusinessSliceAction.googleBusinessFailure(e));
  }
};
export default googleBusinessSlice.reducer;
export const googleBusinessSliceAction = googleBusinessSlice.actions;
