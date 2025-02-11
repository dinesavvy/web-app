import { createSlice } from "@reduxjs/toolkit";
import { updateTeamAPI } from "../../services/updateTeam";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateTeamSlice = createSlice({
  name: "updateTeam",
  initialState: data,
  reducers: {
    updateTeamInfo(state) {
      state.isLoading = true;
    },
    updateTeamSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateTeamFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateTeamReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateTeamHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateTeamAction.updateTeamInfo());
    const response = await updateTeamAPI(data);
    dispatch(updateTeamAction.updateTeamSuccess(response));
  } catch (e) {
    dispatch(updateTeamAction.updateTeamFailure(e.response.data.message));
  }
};
export default updateTeamSlice.reducer;
export const updateTeamAction = updateTeamSlice.actions;
