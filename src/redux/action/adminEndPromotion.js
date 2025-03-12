import { createSlice } from "@reduxjs/toolkit";
import { adminEndPromotionAPI } from "../../services/adminEndPromotion";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const adminEndPromotionSlice = createSlice({
  name: "adminEndPromotion",
  initialState: data,
  reducers: {
    adminEndPromotionInfo(state) {
      state.isLoading = true;
    },
    adminEndPromotionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    adminEndPromotionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    adminEndPromotionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const adminEndPromotionHandler = (data) => async (dispatch) => {
  try {
    dispatch(adminEndPromotionAction.adminEndPromotionInfo());
    const response = await adminEndPromotionAPI(data);
    dispatch(adminEndPromotionAction.adminEndPromotionSuccess(response));
  } catch (e) {
    dispatch(adminEndPromotionAction.adminEndPromotionFailure(e));
  }
};
export default adminEndPromotionSlice.reducer;
export const adminEndPromotionAction = adminEndPromotionSlice.actions;
