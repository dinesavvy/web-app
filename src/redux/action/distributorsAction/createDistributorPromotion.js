import { createSlice } from "@reduxjs/toolkit";
import { createDistributorPromotionAPI } from "../../../services/distributorsService/createDistributorPromotion";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createDistributorPromotionSlice = createSlice({
  name: "createDistributorPromotion",
  initialState: data,
  reducers: {
    createDistributorPromotionInfo(state) {
      state.isLoading = true;
    },
    createDistributorPromotionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createDistributorPromotionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createDistributorPromotionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createDistributorPromotionHandler = (data) => async (dispatch) => {
  try {
    dispatch(createDistributorPromotionAction.createDistributorPromotionInfo());
    const response = await createDistributorPromotionAPI(data);
    dispatch(
      createDistributorPromotionAction.createDistributorPromotionSuccess(
        response
      )
    );
  } catch (e) {
    dispatch(
      createDistributorPromotionAction.createDistributorPromotionFailure(e)
    );
  }
};
export default createDistributorPromotionSlice.reducer;
export const createDistributorPromotionAction =
  createDistributorPromotionSlice.actions;
