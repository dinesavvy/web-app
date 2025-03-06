import { createSlice } from "@reduxjs/toolkit";
import { updateSupplierBrandAPI } from "../../../services/supplierServices/updateSupplierBrand";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateSupplierBrandSlice = createSlice({
  name: "updateSupplierBrand",
  initialState: data,
  reducers: {
    updateSupplierBrandInfo(state) {
      state.isLoading = true;
    },
    updateSupplierBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateSupplierBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateSupplierBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateSupplierBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateSupplierBrandAction.updateSupplierBrandInfo());
    const response = await updateSupplierBrandAPI(data);
    dispatch(updateSupplierBrandAction.updateSupplierBrandSuccess(response));
  } catch (e) {
    dispatch(updateSupplierBrandAction.updateSupplierBrandFailure(e));
  }
};
export default updateSupplierBrandSlice.reducer;
export const updateSupplierBrandAction = updateSupplierBrandSlice.actions;
