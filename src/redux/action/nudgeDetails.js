import { createSlice } from "@reduxjs/toolkit";
import { nudgeDetailsAPI } from "../../services/nudgeDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const nudgeDetailsSlice = createSlice({
  name: "nudgeDetailsMain",
  initialState: data,
  reducers: {
    nudgeDetailsInfo(state) {
      state.isLoading = true;
    },
    nudgeDetailsInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    nudgeDetailsInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    nudgeDetailsInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const nudgesDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(nudgeDetailsAction.nudgeDetailsInfo());
    const response = await nudgeDetailsAPI(data);
    dispatch(nudgeDetailsAction.nudgeDetailsInfoSuccess(response));
    // setItem("adminId", response?.data?.id);
  } catch (e) {
    dispatch(nudgeDetailsAction.nudgeDetailsInfoFailure(e));
  }
};
export default nudgeDetailsSlice.reducer;
export const nudgeDetailsAction = nudgeDetailsSlice.actions;
