import { createSlice } from "@reduxjs/toolkit";
import { getBusinessTeamAPI } from "../../../services/businessService/getBusinessTeam";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getBusinessTeamSlice = createSlice({
  name: "getBusinessTeam",
  initialState: data,
  reducers: {
    getBusinessTeamInfo(state) {
      state.isLoading = true;
    },
    getBusinessTeamSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getBusinessTeamFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    getBusinessTeamReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getBusinessTeamHandler = (data) => async (dispatch) => {
  try {
    dispatch(getBusinessTeamAction.getBusinessTeamInfo());
    const response = await getBusinessTeamAPI(data);
    dispatch(getBusinessTeamAction.getBusinessTeamSuccess(response));
  } catch (e) {
    dispatch(getBusinessTeamAction.getBusinessTeamFailure(e));
  }
};
export default getBusinessTeamSlice.reducer;
export const getBusinessTeamAction = getBusinessTeamSlice.actions;
