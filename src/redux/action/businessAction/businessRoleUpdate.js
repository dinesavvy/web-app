import { createSlice } from "@reduxjs/toolkit";
import { businessRoleUpdate } from "../../../services/businessService/businessRoleUpdate";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessRoleUpdateSlice = createSlice({
  name: "businessRoleUpdate",
  initialState: data,
  reducers: {
    businessRoleUpdateInfo(state) {
      state.isLoading = true;
    },
    businessRoleUpdateSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessRoleUpdateFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessRoleUpdateReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessRoleUpdateHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessRoleUpdateAction.businessRoleUpdateInfo());
    const response = await businessRoleUpdate(data);
    dispatch(businessRoleUpdateAction.businessRoleUpdateSuccess(response));
  } catch (e) {
    dispatch(businessRoleUpdateAction.businessRoleUpdateFailure(e));
  }
};
export default businessRoleUpdateSlice.reducer;
export const businessRoleUpdateAction = businessRoleUpdateSlice.actions;
