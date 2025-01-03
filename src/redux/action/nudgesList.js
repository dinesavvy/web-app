import { createSlice } from "@reduxjs/toolkit";
import { nudgeListAPI } from "../../services/nudgeList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const nudgesListSlice = createSlice({
  name: "nudgesList",
  initialState: data,
  reducers: {
    nudgesListInfo(state) {
      state.isLoading = true;
    },
    nudgesListInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    nudgesListInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    nudgesListInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const nudgesListHandler = (data) => async (dispatch) => {
  try {
    dispatch(nudgesListAction.nudgesListInfo());
    const response = await nudgeListAPI(data);
    dispatch(nudgesListAction.nudgesListInfoSuccess(response));
  } catch (e) {
    dispatch(nudgesListAction.nudgesListInfoFailure(e));
  }
};
export default nudgesListSlice.reducer;
export const nudgesListAction = nudgesListSlice.actions;
