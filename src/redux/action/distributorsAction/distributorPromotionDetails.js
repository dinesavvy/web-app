import { createSlice } from "@reduxjs/toolkit";
import { distributorPromotionDetailsAPI } from "../../../services/distributorsService/distributorPromotionDetails"

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const distributorPromotionDetailsSlice = createSlice({
  name: "distributorPromotionDetails",
  initialState: data,
  reducers: {
    distributorPromotionDetailsInfo(state) {
      state.isLoading = true;
    },
    distributorPromotionDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    distributorPromotionDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    distributorPromotionDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const distributorPromotionDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(distributorPromotionDetailsAction.distributorPromotionDetailsInfo());
    const response = await distributorPromotionDetailsAPI(data);
    dispatch(distributorPromotionDetailsAction.distributorPromotionDetailsSuccess(response));
  } catch (e) {
    dispatch(distributorPromotionDetailsAction.distributorPromotionDetailsFailure(e));
  }
};
export default distributorPromotionDetailsSlice.reducer;
export const distributorPromotionDetailsAction = distributorPromotionDetailsSlice.actions;
