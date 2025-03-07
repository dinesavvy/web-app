import { createSlice } from "@reduxjs/toolkit";
import { supplierPromotionListAPI } from "../../../services/supplierServices/supplierPromotionList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const supplierPromotionListSlice = createSlice({
  name: "supplierPromotionList",
  initialState: data,
  reducers: {
    supplierPromotionInfo(state) {
      state.isLoading = true;
    },
    supplierPromotionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    supplierPromotionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    supplierPromotionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const supplierPromotionListHandler = (data) => async (dispatch) => {
  try {
    dispatch(supplierPromotionAction.supplierPromotionInfo());
    const response = await supplierPromotionListAPI(data);
    dispatch(supplierPromotionAction.supplierPromotionSuccess(response));
  } catch (e) {
    dispatch(supplierPromotionAction.supplierPromotionFailure(e));
  }
};
export default supplierPromotionListSlice.reducer;
export const supplierPromotionAction = supplierPromotionListSlice.actions;
