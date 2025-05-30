import { createSlice } from "@reduxjs/toolkit";
import { savvyNudgeDetailsAPI } from "../../services/savvyNudgeDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const savvyNudgeDetailsSlice = createSlice({
  name: "savvyNudgeDetails",
  initialState: data,
  reducers: {
    savvyNudgeDetailsInfo(state) {
      state.isLoading = true;
    },
    savvyNudgeDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    savvyNudgeDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    savvyNudgeDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const savvyNudgeDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(savvyNudgeDetailsAction.savvyNudgeDetailsInfo());
    const response = await savvyNudgeDetailsAPI(data);
    dispatch(savvyNudgeDetailsAction.savvyNudgeDetailsSuccess(response));
  } catch (e) {
    dispatch(savvyNudgeDetailsAction.savvyNudgeDetailsFailure(e));
  }
};
export default savvyNudgeDetailsSlice.reducer;
export const savvyNudgeDetailsAction = savvyNudgeDetailsSlice.actions;
