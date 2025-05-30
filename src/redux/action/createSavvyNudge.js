import { createSlice } from "@reduxjs/toolkit";
import { createSavvyNudgeAPI } from "../../services/createSavvyNudge";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const  createSavvyNudgeSlice= createSlice({
  name: "createSavvyNudge",
  initialState: data,
  reducers: {
    createSavvyNudgeInfo(state) {
      state.isLoading = true;
    },
    createSavvyNudgeSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createSavvyNudgeFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createSavvyNudgeReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createSavvyNudgeHandler = (data) => async (dispatch) => {
  try {
    dispatch(createSavvyNudgeAction.createSavvyNudgeInfo());
    const response = await createSavvyNudgeAPI(data);
    dispatch(createSavvyNudgeAction.createSavvyNudgeSuccess(response));
  } catch (e) {
    dispatch(
      createSavvyNudgeAction.createSavvyNudgeFailure(e?.response?.data)
    );
  }
};
export default createSavvyNudgeSlice.reducer;
export const createSavvyNudgeAction = createSavvyNudgeSlice.actions;
