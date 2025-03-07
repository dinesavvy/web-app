import { createSlice } from "@reduxjs/toolkit";
import { addSupplierPromotionAPI } from "../../../services/supplierServices/addSupplierPromotion";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const addSuppplierPromotionSlice = createSlice({
  name: "addSupplierPromotion",
  initialState: data,
  reducers: {
    addSupplierPromotionInfo(state) {
      state.isLoading = true;
    },
    addSupplierPromotionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    addSupplierPromotionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    addSupplierPromotionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const addSupplierPromotionHandler = (data) => async (dispatch) => {
  try {
    dispatch(addSupplierPromotionAction.addSupplierPromotionInfo());
    const response = await addSupplierPromotionAPI(data);
    dispatch(addSupplierPromotionAction.addSupplierPromotionSuccess(response));
  } catch (e) {
    dispatch(addSupplierPromotionAction.addSupplierPromotionFailure(e));
  }
};
export default addSuppplierPromotionSlice.reducer;
export const addSupplierPromotionAction = addSuppplierPromotionSlice.actions;
