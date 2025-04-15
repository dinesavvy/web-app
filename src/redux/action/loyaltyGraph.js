import { createSlice } from "@reduxjs/toolkit";
import { loyaltygraphAPI } from "../../services/loyaltyGraph";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const loyaltyGraphSlice = createSlice({
  name: "loyaltyGraph",
  initialState: data,
  reducers: {
    loyaltyGraphInfo(state) {
      state.isLoading = true;
    },
    loyaltyGraphSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    loyaltyGraphFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    loyaltyGraphReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const loyaltyGraphHandler = (data) => async (dispatch) => {
  try {
    dispatch(loyaltyGraphAction.loyaltyGraphInfo());
    const response = await loyaltygraphAPI(data);
    dispatch(loyaltyGraphAction.loyaltyGraphSuccess(response));
  } catch (e) {
    dispatch(loyaltyGraphAction.loyaltyGraphFailure(e));
  }
};
export default loyaltyGraphSlice.reducer;
export const loyaltyGraphAction = loyaltyGraphSlice.actions;
