import { createSlice } from "@reduxjs/toolkit";
import { businessFollowersAPI } from "../../../services/businessService/businessFollowers";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessFollowerListSlice = createSlice({
  name: "businessListFollowerList",
  initialState: data,
  reducers: {
    businessFollowerListInfo(state) {
      state.isLoading = true;
    },
    businessFollowerListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessFollowerListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessFollowerListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessFollowerListHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessFollowerAction.businessFollowerListInfo());
    const response = await businessFollowersAPI(data);
    dispatch(businessFollowerAction.businessFollowerListSuccess(response));
  } catch (e) {
    dispatch(businessFollowerAction.businessFollowerListFailure(e));
  }
};
export default businessFollowerListSlice.reducer;
export const businessFollowerAction = businessFollowerListSlice.actions;
