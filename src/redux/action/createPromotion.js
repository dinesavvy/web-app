import { createSlice } from "@reduxjs/toolkit";
import { createPromotionAPI } from "../../services/createPromotion";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const  createPromotionsSlice= createSlice({
  name: "createPromotion",
  initialState: data,
  reducers: {
    createPromotionInfo(state) {
      state.isLoading = true;
    },
    createPromotionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createPromotionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createPromotionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createPromotionHandler = (data) => async (dispatch) => {
  try {
    dispatch(createPromotionAction.createPromotionInfo());
    const response = await createPromotionAPI(data);
    dispatch(createPromotionAction.createPromotionSuccess(response));
  } catch (e) {
    dispatch(
      createPromotionAction.createPromotionFailure(e?.response?.data?.message)
    );
  }
};
export default createPromotionsSlice.reducer;
export const createPromotionAction = createPromotionsSlice.actions;
