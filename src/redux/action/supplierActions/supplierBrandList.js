import { createSlice } from "@reduxjs/toolkit";
import { supplierBrandListAPI } from "../../../services/supplierServices/supplierBrandList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const supplierBrandListSlice = createSlice({
  name: "supplierBrandList",
  initialState: data,
  reducers: {
    supplierBrandListInfo(state) {
      state.isLoading = true;
    },
    supplierBrandListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    supplierBrandListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    supplierBrandListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const supplierBrandListHandler = (data) => async (dispatch) => {
  try {
    dispatch(supplierBrandListAction.supplierBrandListInfo());
    const response = await supplierBrandListAPI(data);
    dispatch(supplierBrandListAction.supplierBrandListSuccess(response));
  } catch (e) {
    dispatch(supplierBrandListAction.supplierBrandListFailure(e));
  }
};
export default supplierBrandListSlice.reducer;
export const supplierBrandListAction = supplierBrandListSlice.actions;
