import { createSlice } from "@reduxjs/toolkit";
import { businessDashboardAPI } from "../../../services/businessService/businessDashboard";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessDashboardSlice = createSlice({
  name: "businessDashboard",
  initialState: data,
  reducers: {
    businessDashboardInfo(state) {
      state.isLoading = true;
    },
    businessDashboardSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessDashboardFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessDashboardReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessDashboardHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessDashboardAction.businessDashboardInfo());
    const response = await businessDashboardAPI(data);
    dispatch(businessDashboardAction.businessDashboardSuccess(response));
  } catch (e) {
    dispatch(businessDashboardAction.businessDashboardFailure(e));
  }
};
export default businessDashboardSlice.reducer;
export const businessDashboardAction = businessDashboardSlice.actions;
