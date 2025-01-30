import { createSlice } from "@reduxjs/toolkit";
import { createTeamAPI } from "../../../services/businessService/createTeam";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createTeamSlice = createSlice({
  name: "createTeam",
  initialState: data,
  reducers: {
    createTeamInfo(state) {
      state.isLoading = true;
    },
    createTeamSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createTeamFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    createTeamReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createTeamHandler = (data) => async (dispatch) => {
  try {
    dispatch(createTeamAction.createTeamInfo());
    const response = await createTeamAPI(data);
    dispatch(createTeamAction.createTeamSuccess(response));
  } catch (e) {
    dispatch(createTeamAction.createTeamFailure(e));
  }
};
export default createTeamSlice.reducer;
export const createTeamAction = createTeamSlice.actions;
