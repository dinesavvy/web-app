import { createSlice } from "@reduxjs/toolkit";
import { adminPromotionListAPI } from "../../services/adminPromotionList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const adminPromotionListSlice = createSlice({
  name: "adminPromotion",
  initialState: data,
  reducers: {
    adminPromotionListInfo(state) {
      state.isLoading = true;
    },
    adminPromotionListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    adminPromotionListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    adminPromotionListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const adminPromotionListHandler = (data) => async (dispatch) => {
  try {
    dispatch(adminPromotionListAction.adminPromotionListInfo());
    const response = await adminPromotionListAPI(data);
    dispatch(adminPromotionListAction.adminPromotionListSuccess(response));
  } catch (e) {
    dispatch(adminPromotionListAction.adminPromotionListFailure(e));
  }
};
export default adminPromotionListSlice.reducer;
export const adminPromotionListAction = adminPromotionListSlice.actions;
