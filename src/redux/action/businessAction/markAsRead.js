import { createSlice } from "@reduxjs/toolkit";
import { markAsReadAPI } from "../../../services/businessService/markAsRead";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const markAsReadSlice = createSlice({
  name: "markAsRead",
  initialState: data,
  reducers: {
    markAsReadInfo(state) {
      state.isLoading = true;
    },
    markAsReadSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    markAsReadFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    markAsReadReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const markAsReadHandler = (data) => async (dispatch) => {
  try {
    dispatch(markAsReadAction.markAsReadInfo());
    const response = await markAsReadAPI(data);
    dispatch(markAsReadAction.markAsReadSuccess(response));
  } catch (e) {
    dispatch(markAsReadAction.markAsReadFailure(e?.response?.data));
  }
};
export default markAsReadSlice.reducer;
export const markAsReadAction = markAsReadSlice.actions;
