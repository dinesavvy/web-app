import { createSlice } from "@reduxjs/toolkit";
import { supplierPromotionDetailsAPI } from "../../../services/supplierServices/supplierPromotionDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const supplierPromotionDetailsSlice = createSlice({
  name: "supplierPromotionDetails",
  initialState: data,
  reducers: {
    supplierPromotionDetailsInfo(state) {
      state.isLoading = true;
    },
    supplierPromotionDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    supplierPromotionDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    supplierPromotionDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const supplierPromotionDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(supplierMerchantAction.supplierPromotionDetailsInfo());
    const response = await supplierPromotionDetailsAPI(data);
    dispatch(supplierMerchantAction.supplierPromotionDetailsSuccess(response));
  } catch (e) {
    dispatch(supplierMerchantAction.supplierPromotionDetailsFailure(e));
  }
};
export default supplierPromotionDetailsSlice.reducer;
export const supplierMerchantAction = supplierPromotionDetailsSlice.actions;
