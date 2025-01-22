import { createSlice } from "@reduxjs/toolkit";
import { roleListAPI } from "../../services/roleList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const roleListSlice = createSlice({
  name: "roleList",
  initialState: data,
  reducers: {
    roleListInfo(state) {
      state.isLoading = true;
    },
    roleListInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    roleListInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    roleListInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const roleListHandler = (data) => async (dispatch) => {
  try {
    dispatch(roleListAction.roleListInfo());
    const response = await roleListAPI(data);
    dispatch(roleListAction.roleListInfoSuccess(response));
  } catch (e) {
    dispatch(roleListAction.roleListInfoFailure(e));
  }
};
export default roleListSlice.reducer;
export const roleListAction = roleListSlice.actions;
