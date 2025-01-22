import { createSlice } from "@reduxjs/toolkit";
import { removeTeamMemberAPI } from "../../services/removeTeamMember";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const removeTeamMemberSlice = createSlice({
  name: "removeTeamMember",
  initialState: data,
  reducers: {
    removeTeamMemberInfo(state) {
      state.isLoading = true;
    },
    removeTeamMemberSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    removeTeamMemberFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    removeTeamMemberReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const removeTeamMemberHandler = (data) => async (dispatch) => {
  try {
    dispatch(removeTeamMemberAction.removeTeamMemberInfo());
    const response = await removeTeamMemberAPI(data);
    dispatch(removeTeamMemberAction.removeTeamMemberSuccess(response));
  } catch (e) {
    dispatch(removeTeamMemberAction.removeTeamMemberFailure(e));
  }
};
export default removeTeamMemberSlice.reducer;
export const removeTeamMemberAction = removeTeamMemberSlice.actions;
