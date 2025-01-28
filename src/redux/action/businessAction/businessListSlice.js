import { createSlice } from "@reduxjs/toolkit";
import { businessListAPI } from "../../../services/businessService/businessList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessListSlice = createSlice({
  name: "businessList",
  initialState: data,
  reducers: {
    businessListInfo(state) {
      state.isLoading = true;
    },
    businessListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessListHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessListAction.businessListInfo());
    const response = await businessListAPI(data);
    dispatch(businessListAction.businessListSuccess(response));
  } catch (e) {
    dispatch(businessListAction.businessListFailure(e));
  }
};
export default businessListSlice.reducer;
export const businessListAction = businessListSlice.actions;
