import { createSlice } from "@reduxjs/toolkit";
import { savvyNudgesListAPI } from "../../services/savvyNudgesList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const savvyNudgesSlice = createSlice({
  name: "savvyNudgesList",
  initialState: data,
  reducers: {
    savvyNudgesInfo(state) {
      state.isLoading = true;
    },
    savvyNudgesSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    savvyNudgesFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    savvyNudgesReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const savvyNudgesListHandler = (data) => async (dispatch) => {
  try {
    dispatch(savvyNudgesSliceAction.savvyNudgesInfo());
    const response = await savvyNudgesListAPI(data);
    dispatch(savvyNudgesSliceAction.savvyNudgesSuccess(response));
  } catch (e) {
    dispatch(savvyNudgesSliceAction.savvyNudgesFailure(e));
  }
};
export default savvyNudgesSlice.reducer;
export const savvyNudgesSliceAction = savvyNudgesSlice.actions;
