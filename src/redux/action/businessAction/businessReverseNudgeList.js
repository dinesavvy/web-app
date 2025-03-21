import { createSlice } from "@reduxjs/toolkit";
import { businessReverseNudgeListAPI } from "../../../services/businessService/businessReverseNudgeList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const reverseNudgeListSlice = createSlice({
  name: "reverseNudgList",
  initialState: data,
  reducers: {
    reverseNudgeListInfo(state) {
      state.isLoading = true;
    },
    reverseNudgeListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    reverseNudgeListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    reverseNudgeListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const reverseNudgeListHandler = (data) => async (dispatch) => {
  try {
    dispatch(reverseNudgeListAction.reverseNudgeListInfo());
    const response = await businessReverseNudgeListAPI(data);
    dispatch(reverseNudgeListAction.reverseNudgeListSuccess(response));
  } catch (e) {
    dispatch(reverseNudgeListAction.reverseNudgeListFailure(e));
  }
};
export default reverseNudgeListSlice.reducer;
export const reverseNudgeListAction = reverseNudgeListSlice.actions;
