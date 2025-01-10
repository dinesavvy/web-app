import { createSlice } from "@reduxjs/toolkit";
import { getNudgeTemplateAPI } from "../../services/getNudgeTemplate";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getNudgesTemplateSlice = createSlice({
  name: "getNudgesTemplate",
  initialState: data,
  reducers: {
    getNudgesTemplateInfo(state) {
      state.isLoading = true;
    },
    getNudgesTemplateSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getNudgesTemplateFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getNudgesTemplateReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getNudgesTemplateHandler = (data) => async (dispatch) => {
  try {
    dispatch(getNudgesTemplateAction.getNudgesTemplateInfo());
    const response = await getNudgeTemplateAPI(data);
    dispatch(getNudgesTemplateAction.getNudgesTemplateSuccess(response));
  } catch (e) {
    dispatch(getNudgesTemplateAction.getNudgesTemplateFailure(e));
  }
};
export default getNudgesTemplateSlice.reducer;
export const getNudgesTemplateAction = getNudgesTemplateSlice.actions;
