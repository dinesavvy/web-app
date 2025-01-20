import { createSlice } from "@reduxjs/toolkit";
import { teamsListAPI } from "../../services/teams-list";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const teamsListSlice = createSlice({
  name: "teamList",
  initialState: data,
  reducers: {
    teamsListInfo(state) {
      state.isLoading = true;
    },
    teamsListInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    teamsListInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    teamsListInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const teamsListHandler = (data) => async (dispatch) => {
  try {
    dispatch(teamsListAction.teamsListInfo());
    const response = await teamsListAPI(data);
    dispatch(teamsListAction.teamsListInfoSuccess(response));
  } catch (e) {
    dispatch(teamsListAction.teamsListInfoFailure(e));
  }
};
export default teamsListSlice.reducer;
export const teamsListAction = teamsListSlice.actions;
