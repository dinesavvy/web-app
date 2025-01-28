import { createSlice } from "@reduxjs/toolkit";
import { businessNudgeListAPI } from "../../../services/businessService/businessNudgeList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessNudgeListSlice = createSlice({
  name: "businessNudgesList",
  initialState: data,
  reducers: {
    businessNudgesListInfo(state) {
      state.isLoading = true;
    },
    businessNudgesListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessNudgesListFailure(state, action) {

      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessNudgesListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessNudgesListHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessNudgesListAction.businessNudgesListInfo());
    const response = await businessNudgeListAPI(data);
    dispatch(businessNudgesListAction.businessNudgesListSuccess(response));
  } catch (e) {
    dispatch(businessNudgesListAction.businessNudgesListFailure(e));
  }
};
export default businessNudgeListSlice.reducer;
export const businessNudgesListAction = businessNudgeListSlice.actions;
