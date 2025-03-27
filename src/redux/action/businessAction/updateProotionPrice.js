import { createSlice } from "@reduxjs/toolkit";
import { updatePromotionPriceAPI } from "../../../services/businessService/updatePromotionPrice";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updatePromotionPriceSlice = createSlice({
  name: "updatePromotionPrice",
  initialState: data,
  reducers: {
    updatePromotionPriceInfo(state) {
      state.isLoading = true;
    },
    updatePromotionPriceSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updatePromotionPriceFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    updatePromotionPriceReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updatePromotionPriceHandler = (data) => async (dispatch) => {
  try {
    dispatch(updatePromotionPriceAction.updatePromotionPriceInfo());
    const response = await updatePromotionPriceAPI(data);
    dispatch(updatePromotionPriceAction.updatePromotionPriceSuccess(response));
  } catch (e) {
    dispatch(updatePromotionPriceAction.updatePromotionPriceFailure(e));
  }
};
export default updatePromotionPriceSlice.reducer;
export const updatePromotionPriceAction = updatePromotionPriceSlice.actions;
