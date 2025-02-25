import { createSlice } from "@reduxjs/toolkit";
import { removeDistributorAPI } from "../../services/removeDistributor";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const removeDistributorSlice = createSlice({
  name: "removeDistributor",
  initialState: data,
  reducers: {
    removeDistributorInfo(state) {
      state.isLoading = true;
    },
    removeDistributorSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    removeDistributorFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    removeDistributorReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const removeDistributorHandler = (data) => async (dispatch) => {
  try {
    dispatch(removeDistributorAction.removeDistributorInfo());
    const response = await removeDistributorAPI(data);
    dispatch(removeDistributorAction.removeDistributorSuccess(response));
  } catch (e) {
    dispatch(removeDistributorAction.removeDistributorFailure(e));
  }
};
export default removeDistributorSlice.reducer;
export const removeDistributorAction = removeDistributorSlice.actions;
