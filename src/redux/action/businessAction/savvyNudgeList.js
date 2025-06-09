import { createSlice } from "@reduxjs/toolkit";
import { savvyNudgeListAPI } from "../../../services/businessService/savvyNudgeList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const savvyNudgeListSlice = createSlice({
  name: "savvyNudgeList",
  initialState: data,
  reducers: {
    savvyNudgeListInfo(state) {
      state.isLoading = true;
    },
    savvyNudgeListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    savvyNudgeListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    savvyNudgeListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const savvyNudgeListHandler = (data) => async (dispatch) => {
  try {
    dispatch(savvyNudgeListAction.savvyNudgeListInfo());
    const response = await savvyNudgeListAPI(data);
    dispatch(savvyNudgeListAction.savvyNudgeListSuccess(response));
  } catch (e) {
    dispatch(savvyNudgeListAction.savvyNudgeListFailure(e));
  }
};
export default savvyNudgeListSlice.reducer;
export const savvyNudgeListAction = savvyNudgeListSlice.actions;
