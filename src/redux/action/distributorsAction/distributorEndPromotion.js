import { createSlice } from "@reduxjs/toolkit";
import { distributorEndPromotionAPI } from "../../../services/distributorsService/distributorEndPromotion";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const distributorEndPromotionSlice = createSlice({
  name: "distributorEndPromotion",
  initialState: data,
  reducers: {
    distributorEndPromotionInfo(state) {
      state.isLoading = true;
    },
    distributorEndPromotionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    distributorEndPromotionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    distributorEndPromotionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const distributorEndPromotionHandler = (data) => async (dispatch) => {
  try {
    dispatch(distributorEndPromotionAction.distributorEndPromotionInfo());
    const response = await distributorEndPromotionAPI(data);
    dispatch(distributorEndPromotionAction.distributorEndPromotionSuccess(response));
  } catch (e) {
    dispatch(distributorEndPromotionAction.distributorEndPromotionFailure(e));
  }
};
export default distributorEndPromotionSlice.reducer;
export const distributorEndPromotionAction = distributorEndPromotionSlice.actions;
