import { createSlice } from "@reduxjs/toolkit";
import { updateSupplierAPI } from "../../services/updateSupplier";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateSupplierSlice = createSlice({
  name: "updateSupplier",
  initialState: data,
  reducers: {
    updateSupplierInfo(state) {
      state.isLoading = true;
    },
    updateSupplierSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateSupplierFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateSupplierReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateSupplierHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateSupplierAction.updateSupplierInfo());
    const response = await updateSupplierAPI(data);
    dispatch(updateSupplierAction.updateSupplierSuccess(response));
  } catch (e) {
    dispatch(updateSupplierAction.updateSupplierFailure(e.response.data.message));
  }
};
export default updateSupplierSlice.reducer;
export const updateSupplierAction = updateSupplierSlice.actions;
