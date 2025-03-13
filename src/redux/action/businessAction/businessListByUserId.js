import { createSlice } from "@reduxjs/toolkit";
import { businessListByUserId } from "../../../services/businessService/businessListByUserId";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessListByUserIdSlice = createSlice({
  name: "businessListByUserId",
  initialState: data,
  reducers: {
    businessListByUserIdInfo(state) {
      state.isLoading = true;
    },
    // businessListByUserIdSuccess(state, action) {
    //   state.isLoading = false;
    //   state.data = action.payload;
    //   state.message = "";
    // },
    businessListByUserIdSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      // const { nudgeType, data } = action.payload;
      // if (nudgeType === "Accepted") {
      //   state.acceptedList = data;
      // } else if (nudgeType === "Denied") {
      //   state.deniedList = data;
      // }
      state.message = "";
    },
    businessListByUserIdFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessListByUserIdReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessListByUserIdHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessListByUserIdAction.businessListByUserIdInfo());
    const response = await businessListByUserId(data);
    // dispatch(businessListByUserIdAction.businessListByUserIdSuccess(response));
    dispatch(
      businessListByUserIdAction.businessListByUserIdSuccess({
        nudgeType: data.nudgeType,
        data: response, 
      })
    );
  } catch (e) {
    dispatch(businessListByUserIdAction.businessListByUserIdFailure(e));
  }
};
export default businessListByUserIdSlice.reducer;
export const businessListByUserIdAction = businessListByUserIdSlice.actions;
