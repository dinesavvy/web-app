import { createSlice } from "@reduxjs/toolkit";
import { updateDistributorAPI } from "../../services/updateDistributor";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateDistributorSlice = createSlice({
  name: "updateDistributor",
  initialState: data,
  reducers: {
    updateDistributorInfo(state) {
      state.isLoading = true;
    },
    updateDistributorSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateDistributorFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateDistributorReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateDistributorHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateDistributorAction.updateDistributorInfo());
    const response = await updateDistributorAPI(data);
    dispatch(updateDistributorAction.updateDistributorSuccess(response));
  } catch (e) {
    dispatch(updateDistributorAction.updateDistributorFailure(e.response.data.message));
  }
};
export default updateDistributorSlice.reducer;
export const updateDistributorAction = updateDistributorSlice.actions;
