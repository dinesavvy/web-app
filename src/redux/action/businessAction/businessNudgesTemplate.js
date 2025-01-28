import { createSlice } from "@reduxjs/toolkit";
import { businessNudgesTemplateAPI } from "../../../services/businessService/businessNudgesTemplate";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessNudgesTemplateSlice = createSlice({
  name: "businessNudgesTemplate",
  initialState: data,
  reducers: {
    businessNudgesTemplateInfo(state) {
      state.isLoading = true;
    },
    businessNudgesTemplateSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessNudgesTemplateFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessNudgesTemplateReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessNudgesTemplateHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessNudgesTemplateAction.businessNudgesTemplateInfo());
    const response = await businessNudgesTemplateAPI(data);
    dispatch(businessNudgesTemplateAction.businessNudgesTemplateSuccess(response));
  } catch (e) {
    dispatch(businessNudgesTemplateAction.businessNudgesTemplateFailure(e));
  }
};
export default businessNudgesTemplateSlice.reducer;
export const businessNudgesTemplateAction = businessNudgesTemplateSlice.actions;
