import { createSlice } from "@reduxjs/toolkit";
import { distributorPromotionListAPI } from "../../../services/distributorsService/distributorPromotionList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const distributorPromotionListSlice = createSlice({
  name: "distributorPromotionList",
  initialState: data,
  reducers: {
    distributorPromotionListInfo(state) {
      state.isLoading = true;
    },
    distributorPromotionListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    distributorPromotionListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    distributorPromotionListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const distributorPromotionListHandler = (data) => async (dispatch) => {
  try {
    dispatch(distributorPromotionListAction.distributorPromotionListInfo());
    const response = await distributorPromotionListAPI(data);
    dispatch(distributorPromotionListAction.distributorPromotionListSuccess(response));
  } catch (e) {
    dispatch(distributorPromotionListAction.distributorPromotionListFailure(e));
  }
};
export default distributorPromotionListSlice.reducer;
export const distributorPromotionListAction = distributorPromotionListSlice.actions;
