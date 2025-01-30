import { createSlice } from "@reduxjs/toolkit";
import { removeTeamMemberAPI } from "../../../services/businessService/removeTeamMember";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const removeTeamMemberBusinessSlice = createSlice({
  name: "removeTeamMemberBusiness",
  initialState: data,
  reducers: {
    removeTeamMemberBusinessInfo(state) {
      state.isLoading = true;
    },
    removeTeamMemberBusinessSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    removeTeamMemberBusinessFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    removeTeamMemberBusinessReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const removeTeamMemberBusinessHandler = (data) => async (dispatch) => {
  try {
    dispatch(removeTeamMemberBusinessAction.removeTeamMemberBusinessInfo());
    const response = await removeTeamMemberAPI(data);
    dispatch(removeTeamMemberBusinessAction.removeTeamMemberBusinessSuccess(response));
  } catch (e) {
    dispatch(removeTeamMemberBusinessAction.removeTeamMemberBusinessFailure(e));
  }
};
export default removeTeamMemberBusinessSlice.reducer;
export const removeTeamMemberBusinessAction = removeTeamMemberBusinessSlice.actions;
