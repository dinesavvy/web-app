import { createSlice } from "@reduxjs/toolkit";
import { distributorMerchantListAPI } from "../../../services/distributorsService/distributorMerchantList"

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const distributorMerchantListSlice = createSlice({
  name: "distributorMerchantList",
  initialState: data,
  reducers: {
    distributorMerchantListInfo(state) {
      state.isLoading = true;
    },
    distributorMerchantListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    distributorMerchantListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    distributorMerchantListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const distributorMerchantListHandler = (data) => async (dispatch) => {
  try {
    dispatch(distributorMerchantAction.distributorMerchantListInfo());
    const response = await distributorMerchantListAPI(data);
    dispatch(distributorMerchantAction.distributorMerchantListSuccess(response));
  } catch (e) {
    dispatch(distributorMerchantAction.distributorMerchantListFailure(e));
  }
};
export default distributorMerchantListSlice.reducer;
export const distributorMerchantAction = distributorMerchantListSlice.actions;
