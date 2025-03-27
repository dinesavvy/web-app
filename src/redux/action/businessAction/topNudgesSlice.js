import { createSlice } from "@reduxjs/toolkit";
import { topNudgesAPI } from "../../../services/businessService/topNudges";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const topNudgesSlice = createSlice({
  name: "topNudges",
  initialState: data,
  reducers: {
    topNudgesInfo(state) {
      state.isLoading = true;
    },
    topNudgesSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    topNudgesFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    topNudgesReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const topNudgesHandler = (id) => async (dispatch) => {
  try {
    dispatch(topNudgesAction.topNudgesInfo());
    const response = await topNudgesAPI(id);
    dispatch(topNudgesAction.topNudgesSuccess(response));
  } catch (e) {
    dispatch(topNudgesAction.topNudgesFailure(e));
  }
};
export default topNudgesSlice.reducer;
export const topNudgesAction = topNudgesSlice.actions;
