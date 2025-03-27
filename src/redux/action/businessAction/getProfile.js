import { createSlice } from "@reduxjs/toolkit";
import { getProfileAPI } from "../../../services/businessService/getProfile";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getProfileSlice = createSlice({
  name: "getProfileDetails",
  initialState: data,
  reducers: {
    getProfileInfo(state) {
      state.isLoading = true;
    },
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getProfileFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    getProfileReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getProfileHandler = (data) => async (dispatch) => {
  try {
    dispatch(getProfileAction.getProfileInfo());
    const response = await getProfileAPI(data);
    dispatch(getProfileAction.getProfileSuccess(response));
  } catch (e) {
    dispatch(getProfileAction.getProfileFailure(e));
  }
};
export default getProfileSlice.reducer;
export const getProfileAction = getProfileSlice.actions;
