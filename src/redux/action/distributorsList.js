import { createSlice } from "@reduxjs/toolkit";
import { distributorsListAPI } from "../../services/distributorsList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const distributorsListSlice = createSlice({
  name: "distributorsList",
  initialState: data,
  reducers: {
    distributorsInfo(state) {
      state.isLoading = true;
    },
    distributorsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    distributorsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    distributorsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const distributorsListHandler = (data) => async (dispatch) => {
  try {
    dispatch(distributorsAction.distributorsInfo());
    const response = await distributorsListAPI(data);
    console.log(response,"response")
    dispatch(distributorsAction.distributorsSuccess(response));
  } catch (e) {
    dispatch(
      distributorsAction.distributorsFailure(e?.response?.data?.message)
    );
  }
};
export default distributorsListSlice.reducer;
export const distributorsAction = distributorsListSlice.actions;
