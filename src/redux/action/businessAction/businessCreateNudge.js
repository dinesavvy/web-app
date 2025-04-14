import { createSlice } from "@reduxjs/toolkit";
import { businessCreateNudgeAPI } from "../../../services/businessService/businessCreateNudge";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessCreateNudgeSlice = createSlice({
  name: "businessCreateNudge",
  initialState: data,
  reducers: {
    businessCreateNudgeInfo(state) {
      state.isLoading = true;
    },
    businessCreateNudgeSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessCreateNudgeFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    businessCreateNudgeReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessCreateNudgeHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessCreateNudgeAction.businessCreateNudgeInfo());
    const response = await businessCreateNudgeAPI(data);
    dispatch(businessCreateNudgeAction.businessCreateNudgeSuccess(response));
  } catch (e) {
    dispatch(businessCreateNudgeAction.businessCreateNudgeFailure(e));
  }
};
export default businessCreateNudgeSlice.reducer;
export const businessCreateNudgeAction = businessCreateNudgeSlice.actions;
