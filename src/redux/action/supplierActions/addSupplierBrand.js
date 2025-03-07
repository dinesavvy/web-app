import { createSlice } from "@reduxjs/toolkit";
import { addSuppplierBrandAPI } from "../../../services/supplierServices/addSupplierBrand";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const addSupplierBrandSlice = createSlice({
  name: "addSupplierBrand",
  initialState: data,
  reducers: {
    addSupplierBrandInfo(state) {
      state.isLoading = true;
    },
    addSupplierBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    addSupplierBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    addSupplierBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const addSupplierBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(addSupplierBrandAction.addSupplierBrandInfo());
    const response = await addSuppplierBrandAPI(data);
    dispatch(addSupplierBrandAction.addSupplierBrandSuccess(response));
  } catch (e) {
    dispatch(addSupplierBrandAction.addSupplierBrandFailure(e));
  }
};
export default addSupplierBrandSlice.reducer;
export const addSupplierBrandAction = addSupplierBrandSlice.actions;
