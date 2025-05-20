import { createSlice } from "@reduxjs/toolkit";
import { settingListAPI } from "../../services/settingList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const settingListSlice = createSlice({
  name: "settingList",
  initialState: data,
  reducers: {
    settingListInfo(state) {
      state.isLoading = true;
    },
    settingListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    settingListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    settingListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const settingListHandler = (data) => async (dispatch) => {
  try {
    dispatch(settingListAction.settingListInfo());
    const response = await settingListAPI(data);
    dispatch(settingListAction.settingListSuccess(response));
  } catch (e) {
    dispatch(settingListAction.settingListFailure(e));
  }
};
export default settingListSlice.reducer;
export const settingListAction = settingListSlice.actions;
