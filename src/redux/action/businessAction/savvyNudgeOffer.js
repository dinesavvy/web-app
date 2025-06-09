import { createSlice } from "@reduxjs/toolkit";
import { savvyNudgeOfferAPI } from "../../../services/businessService/savvyNudgeOffer";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const savvyNudgeOfferSlice = createSlice({
  name: "savvyNudgeOffer",
  initialState: data,
  reducers: {
    savvyNudgeOfferInfo(state) {
      state.isLoading = true;
    },
    savvyNudgeOfferSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    savvyNudgeOfferFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    savvyNudgeOfferReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const savvyNudgeOfferHandler = (data) => async (dispatch) => {
  try {
    dispatch(savvyNudgeOfferAction.savvyNudgeOfferInfo());
    const response = await savvyNudgeOfferAPI(data);
    dispatch(savvyNudgeOfferAction.savvyNudgeOfferSuccess(response));
  } catch (e) {
    dispatch(savvyNudgeOfferAction.savvyNudgeOfferFailure(e));
  }
};
export default savvyNudgeOfferSlice.reducer;
export const savvyNudgeOfferAction = savvyNudgeOfferSlice.actions;
