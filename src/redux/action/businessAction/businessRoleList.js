import { createSlice } from "@reduxjs/toolkit";
import { businessRoleListAPI } from "../../../services/businessService/businessRolaList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessRoleListSlice = createSlice({
  name: "businessRoleList",
  initialState: data,
  reducers: {
    businessRoleListInfo(state) {
      state.isLoading = true;
    },
    businessRoleListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessRoleListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    businessRoleListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessRoleListHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessRoleListAction.businessRoleListInfo());
    const response = await businessRoleListAPI(data);
    dispatch(businessRoleListAction.businessRoleListSuccess(response));
  } catch (e) {
    dispatch(businessRoleListAction.businessRoleListFailure(e));
  }
};
export default businessRoleListSlice.reducer;
export const businessRoleListAction = businessRoleListSlice.actions;
