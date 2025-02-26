import { createSlice } from "@reduxjs/toolkit";
import { removeSupplierAPI } from "../../../services/supplierServices/removeSupplier";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const remvoeSupplierSlice = createSlice({
  name: "removeSupplier",
  initialState: data,
  reducers: {
    removeSupplierInfo(state) {
      state.isLoading = true;
    },
    removeSupplierSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    removeSupplierFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    removeSupplierReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const removeSupplierHandler = (data) => async (dispatch) => {
  try {
    dispatch(removeSupplierAction.removeSupplierInfo());
    const response = await removeSupplierAPI(data);
    dispatch(removeSupplierAction.removeSupplierSuccess(response));
  } catch (e) {
    dispatch(removeSupplierAction.removeSupplierFailure(e));
  }
};
export default remvoeSupplierSlice.reducer;
export const removeSupplierAction = remvoeSupplierSlice.actions;
