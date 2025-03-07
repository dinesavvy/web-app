import { createSlice } from "@reduxjs/toolkit";
import { deleteDistributorBrandAPI } from "../../../services/distributorsService/deleteDistributorBrand";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const deleteDistributorBrandSlice = createSlice({
  name: "deleteDistributorBrand",
  initialState: data,
  reducers: {
    deleteDistributorBrandInfo(state) {
      state.isLoading = true;
    },
    deleteDistributorBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    deleteDistributorBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    deleteDistributorBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const deleteDistributorBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(deleteDistributorBrandAction.deleteDistributorBrandInfo());
    const response = await deleteDistributorBrandAPI(data);
    dispatch(deleteDistributorBrandAction.deleteDistributorBrandSuccess(response));
  } catch (e) {
    dispatch(deleteDistributorBrandAction.deleteDistributorBrandFailure(e));
  }
};
export default deleteDistributorBrandSlice.reducer;
export const deleteDistributorBrandAction = deleteDistributorBrandSlice.actions;
