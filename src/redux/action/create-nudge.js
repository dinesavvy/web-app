import { createSlice } from "@reduxjs/toolkit";
import { createNudgeAPI } from "../../services/create-nudge";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createNudgeSlice = createSlice({
  name: "createNudge",
  initialState: data,
  reducers: {
 createNudgeInfo(state) {
      state.isLoading = true;
    },
    createNudgeSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createNudgeFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createNudgeReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createNudgeHandler = (data) => async (dispatch) => {
  try {
    dispatch(createNudgeAction.createNudgeInfo());
    const response = await createNudgeAPI(data);
    dispatch(createNudgeAction.createNudgeSuccess(response));
  } catch (e) {
    dispatch(createNudgeAction.createNudgeFailure(e));
  }
};
export default createNudgeSlice.reducer;
export const createNudgeAction = createNudgeSlice.actions;
