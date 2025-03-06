import { createSlice } from "@reduxjs/toolkit";
import { updateDistributorBrandAPI } from "../../../services/distributorsService/updateDistributorBrand";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateDistributorSlice = createSlice({
  name: "updateDistributorBrand",
  initialState: data,
  reducers: {
    updateDistributorBrandInfo(state) {
      state.isLoading = true;
    },
    updateDistributorBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateDistributorBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateDistributorBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateDistributorBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateDistributorAction.updateDistributorBrandInfo());
    const response = await updateDistributorBrandAPI(data);
    dispatch(updateDistributorAction.updateDistributorBrandSuccess(response));
  } catch (e) {
    dispatch(updateDistributorAction.updateDistributorBrandFailure(e));
  }
};
export default updateDistributorSlice.reducer;
export const updateDistributorAction = updateDistributorSlice.actions;
