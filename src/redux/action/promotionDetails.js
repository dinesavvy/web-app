import { createSlice } from "@reduxjs/toolkit";
import { promotionDetailsAPI } from "../../services/promotionDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const promotionDetailsSlice = createSlice({
  name: "promotionDetails",
  initialState: data,
  reducers: {
    promotionDetailsInfo(state) {
      state.isLoading = true;
    },
    promotionDetailsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    promotionDetailsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    promotionDetailsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const promotionDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(promotionDetailsAction.promotionDetailsInfo());
    const response = await promotionDetailsAPI(data);
    dispatch(promotionDetailsAction.promotionDetailsSuccess(response));
  } catch (e) {
    dispatch(promotionDetailsAction.promotionDetailsFailure(e));
  }
};
export default promotionDetailsSlice.reducer;
export const promotionDetailsAction = promotionDetailsSlice.actions;
