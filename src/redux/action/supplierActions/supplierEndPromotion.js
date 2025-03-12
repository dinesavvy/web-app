import { createSlice } from "@reduxjs/toolkit";
import { supplierEndPromotionAPI } from "../../../services/supplierServices/supplierEndPromtion";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const supplierEndPromotionSlice = createSlice({
  name: "supplierEndPromotion",
  initialState: data,
  reducers: {
    supplierEndPromotionInfo(state) {
      state.isLoading = true;
    },
    supplierEndPromotionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    supplierEndPromotionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    supplierEndPromotionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const supplierEndPromotionHandler = (data) => async (dispatch) => {
  try {
    dispatch(supplierEndPromotionAction.supplierEndPromotionInfo());
    const response = await supplierEndPromotionAPI(data);
    dispatch(supplierEndPromotionAction.supplierEndPromotionSuccess(response));
  } catch (e) {
    dispatch(supplierEndPromotionAction.supplierEndPromotionFailure(e));
  }
};
export default supplierEndPromotionSlice.reducer;
export const supplierEndPromotionAction = supplierEndPromotionSlice.actions;
