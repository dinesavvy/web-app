import { createSlice } from "@reduxjs/toolkit";
import { getSupplierListAPI } from "../../services/getSuppliersLists";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const getSupplierSlice = createSlice({
  name: "getSupplierList",
  initialState: data,
  reducers: {
    getSupplierListInfo(state) {
      state.isLoading = true;
    },
    getSupplierListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    getSupplierListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    getSupplierListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const getSuppliersHandler = (data) => async (dispatch) => {
  try {
    dispatch(getSuppliersAction.getSupplierListInfo());
    const response = await getSupplierListAPI(data);
    dispatch(getSuppliersAction.getSupplierListSuccess(response));
  } catch (e) {
    dispatch(getSuppliersAction.getSupplierListFailure(e));
  }
};
export default getSupplierSlice.reducer;
export const getSuppliersAction = getSupplierSlice.actions;
