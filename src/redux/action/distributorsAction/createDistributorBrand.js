import { createSlice } from "@reduxjs/toolkit";
import { createDistributorBrandAPI } from "../../../services/distributorsService/createDistributorBrand";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createDistributorSlice = createSlice({
  name: "createDistributorBrand",
  initialState: data,
  reducers: {
    createDistributorBrandInfo(state) {
      state.isLoading = true;
    },
    createDistributorBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createDistributorBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createDistributorBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createDistributorBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(createDistributorAction.createDistributorBrandInfo());
    const response = await createDistributorBrandAPI(data);
    dispatch(createDistributorAction.createDistributorBrandSuccess(response));
  } catch (e) {
    dispatch(createDistributorAction.createDistributorBrandFailure(e));
  }
};
export default createDistributorSlice.reducer;
export const createDistributorAction = createDistributorSlice.actions;
