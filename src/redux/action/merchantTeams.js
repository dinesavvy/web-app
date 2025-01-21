import { createSlice } from "@reduxjs/toolkit";
import { merchantsTeamsAPI } from "../../services/merchantTeams";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const merchantTeamsSlice = createSlice({
  name: "merchantTeamsList",
  initialState: data,
  reducers: {
    merchantTeamsInfo(state) {
      state.isLoading = true;
    },
   merchantTeamsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
   merchantTeamsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
   merchantTeamsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const merchantTeamsHandler = (data) => async (dispatch) => {
  try {
    dispatch(merchantTeamsAction.merchantTeamsInfo());
    const response = await merchantsTeamsAPI(data);
    dispatch(merchantTeamsAction.merchantTeamsSuccess(response));
    // setItem("adminId", response?.data?.id);
  } catch (e) {
    dispatch(merchantTeamsAction.merchantTeamsFailure(e));
  }
};
export default merchantTeamsSlice.reducer;
export const merchantTeamsAction = merchantTeamsSlice.actions;
