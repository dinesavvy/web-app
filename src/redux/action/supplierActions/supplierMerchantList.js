import { createSlice } from "@reduxjs/toolkit";
import { supplierMerchantListAPI } from "../../../services/supplierServices/supplierMerchantList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const supplierMerchantSlice = createSlice({
  name: "supplierMerchantList",
  initialState: data,
  reducers: {
    supplierMerchantListInfo(state) {
      state.isLoading = true;
    },
    supplierMerchantListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    supplierMerchantListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    supplierMerchantListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const supplierMerchantListHandler = (data) => async (dispatch) => {
  try {
    dispatch(supplierMerchantAction.supplierMerchantListInfo());
    const response = await supplierMerchantListAPI(data);
    dispatch(supplierMerchantAction.supplierMerchantListSuccess(response));
  } catch (e) {
    dispatch(supplierMerchantAction.supplierMerchantListFailure(e));
  }
};
export default supplierMerchantSlice.reducer;
export const supplierMerchantAction = supplierMerchantSlice.actions;
