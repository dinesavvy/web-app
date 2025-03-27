import { createSlice } from "@reduxjs/toolkit";
import { archivePromotionAPI } from "../../../services/businessService/archivePromotion";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const archivePromotionSlice = createSlice({
  name: "archivePromotionList",
  initialState: data,
  reducers: {
    archivePromotionListInfo(state) {
      state.isLoading = true;
    },
    archivePromotionListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    archivePromotionListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.response?.data?.message;
      state.data = null;
    },
    archivePromotionListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});




export const archivePromotionHandler = (data) => async (dispatch) => {
  try {
    dispatch(archivePromotionListAction.archivePromotionListInfo());
    const response = await archivePromotionAPI(data);
    dispatch(
      archivePromotionListAction.archivePromotionListSuccess(response)
    );
  } catch (e) {
    dispatch(archivePromotionListAction.archivePromotionListFailure(e));
  }
};
export default archivePromotionSlice.reducer;
export const archivePromotionListAction = archivePromotionSlice.actions;
