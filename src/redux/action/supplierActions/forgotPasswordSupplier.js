import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordSupplierAPI } from "../../../services/supplierServices/forgotPasswordSupplier";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const forgotPasswordSupplierSlice = createSlice({
  name: "forgotPasswordSupplier",
  initialState: data,
  reducers: {
    forgotPaswordSuppllierInfo(state) {
      state.isLoading = true;
    },
    forgotPasswordSupplierSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    forgotPasswordSupplierFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    forgotPasswordSupplierReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const forgotPasswordSupplierHandler = (data) => async (dispatch) => {
  try {
    dispatch(forgotPasswordSupplierAction.forgotPaswordSuppllierInfo());
    const response = await forgotPasswordSupplierAPI(data);
    dispatch(
      forgotPasswordSupplierAction.forgotPasswordSupplierSuccess(response)
    );
  } catch (e) {
    dispatch(forgotPasswordSupplierAction.forgotPasswordSupplierFailure(e?.response?.data?.message));
  }
};
export default forgotPasswordSupplierSlice.reducer;
export const forgotPasswordSupplierAction = forgotPasswordSupplierSlice.actions;
