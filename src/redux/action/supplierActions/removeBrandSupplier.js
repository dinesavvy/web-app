import { createSlice } from "@reduxjs/toolkit";
import { remvoeBrandSupplierAPI } from "../../../services/supplierServices/removeBrandSupplierAPI";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const removeBrandSupplierSlice = createSlice({
  name: "removeBrandSupplier",
  initialState: data,
  reducers: {
    removeBrandSupplierInfo(state) {
      state.isLoading = true;
    },
    removeBrandSupplierSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    removeBrandSupplierFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    removeBrandSupplierReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const removeBrandSupplierHandler = (data) => async (dispatch) => {
  try {
    dispatch(removeBrandSupplierAction.removeBrandSupplierInfo());
    const response = await remvoeBrandSupplierAPI(data);
    dispatch(removeBrandSupplierAction.removeBrandSupplierSuccess(response));
  } catch (e) {
    dispatch(removeBrandSupplierAction.removeBrandSupplierFailure(e));
  }
};
export default removeBrandSupplierSlice.reducer;
export const removeBrandSupplierAction = removeBrandSupplierSlice.actions;
