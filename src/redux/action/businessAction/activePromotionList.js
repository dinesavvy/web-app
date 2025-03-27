import { createSlice } from "@reduxjs/toolkit";
import { activePromotionListAPI } from "../../../services/businessService/activePromotionList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const activePromotionListSlice = createSlice({
  name: "activePromotionList",
  initialState: data,
  reducers: {
    activePromotionListInfo(state) {
      state.isLoading = true;
    },
    activePromotionListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    activePromotionListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.response?.data?.message;
      state.data = null;
    },
    activePromotionListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const activePromotionListHandler = (data) => async (dispatch) => {
  try {
    dispatch(activePromotionListAction.activePromotionListInfo());
    const response = await activePromotionListAPI(data);
    dispatch(
      activePromotionListAction.activePromotionListSuccess(response)
    );
  } catch (e) {
    dispatch(activePromotionListAction.activePromotionListFailure(e));
  }
};
export default activePromotionListSlice.reducer;
export const activePromotionListAction = activePromotionListSlice.actions;
