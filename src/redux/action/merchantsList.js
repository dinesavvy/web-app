import { createSlice } from "@reduxjs/toolkit";
import { merchantListAPI } from "../../services/merchantsList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const metrchantsListSlice = createSlice({
  name: "merchantsList",
  initialState: data,
  reducers: {
    merchantsListInfo(state) {
      state.isLoading = true;
    },
    merchantsListInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    merchantsListInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    merchantsListInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const merchantsListHandler = (data) => async (dispatch) => {
  try {
    dispatch(merchantListAction.merchantsListInfo());
    const response = await merchantListAPI(data);
    dispatch(merchantListAction.merchantsListInfoSuccess(response));
    // setItem("adminId", response?.data?.id);
  } catch (e) {
    dispatch(merchantListAction.merchantsListInfoFailure(e));
  }
};
export default metrchantsListSlice.reducer;
export const merchantListAction = metrchantsListSlice.actions;
