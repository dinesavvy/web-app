import { createSlice } from "@reduxjs/toolkit";
import { updateTeamBusinessAPI } from "../../../services/businessService/updateTeamBusiness";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateTeamBusinessSlice = createSlice({
  name: "updateTeamBusiness",
  initialState: data,
  reducers: {
    updateTeamBusinessInfo(state) {
      state.isLoading = true;
    },
    updateTeamBusinessSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateTeamBusinessFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateTeamBusinessReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateTeamBusinessHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateTeamBusinessAction.updateTeamBusinessInfo());
    const response = await updateTeamBusinessAPI(data);
    dispatch(updateTeamBusinessAction.updateTeamBusinessSuccess(response));
  } catch (e) {
    dispatch(updateTeamBusinessAction.updateTeamBusinessFailure(e));
  }
};
export default updateTeamBusinessSlice.reducer;
export const updateTeamBusinessAction = updateTeamBusinessSlice.actions;
