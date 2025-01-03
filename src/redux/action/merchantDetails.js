import { createSlice } from "@reduxjs/toolkit";
import { merchantDetailsAPI } from "../../services/merchantDetails";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const merchantDetailsSlice = createSlice({
  name: "merchantDetails",
  initialState: data,
  reducers: {
    merchantDetailsInfo(state) {
      state.isLoading = true;
    },
    merchantDetailsInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    merchantDetailsInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    merchantDetailsInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const merchantDetailsHandler = (data) => async (dispatch) => {
  try {
    dispatch(merchantDeailsAction.merchantDetailsInfo());
    const response = await merchantDetailsAPI(data);
    dispatch(merchantDeailsAction.merchantDetailsInfoSuccess(response));
    // setItem("adminId", response?.data?.id);
  } catch (e) {
    dispatch(merchantDeailsAction.merchantDetailsInfoFailure(e));
  }
};
export default merchantDetailsSlice.reducer;
export const merchantDeailsAction = merchantDetailsSlice.actions;
