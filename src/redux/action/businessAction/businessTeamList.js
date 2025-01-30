import { createSlice } from "@reduxjs/toolkit";
import { businessTeamListAPI } from "../../../services/businessService/businessTeamList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessTeamListSlice = createSlice({
  name: "businessTeamList",
  initialState: data,
  reducers: {
    businessTeamListInfo(state) {
      state.isLoading = true;
    },
    businessTeamListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessTeamListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessTeamListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessTeamListHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessTeamListAction.businessTeamListInfo());
    const response = await businessTeamListAPI(data);
    dispatch(businessTeamListAction.businessTeamListSuccess(response));
  } catch (e) {
    dispatch(businessTeamListAction.businessTeamListFailure(e));
  }
};
export default businessTeamListSlice.reducer;
export const businessTeamListAction = businessTeamListSlice.actions;
