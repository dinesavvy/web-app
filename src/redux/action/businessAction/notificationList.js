import { createSlice } from "@reduxjs/toolkit";
import { notificationListAPI } from "../../../services/businessService/notificationList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const notificationSlice = createSlice({
  name: "notificationList",
  initialState: data,
  reducers: {
    notificationListInfo(state) {
      state.isLoading = true;
    },
    notificationListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    notificationListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.data = null;
    },
    notificationListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const notificationHandler = (data) => async (dispatch) => {
  try {
    dispatch(notificationAction.notificationListInfo());
    const response = await notificationListAPI(data);
    dispatch(notificationAction.notificationListSuccess(response));
  } catch (e) {
    dispatch(notificationAction.notificationListFailure(e?.response?.data));
  }
};
export default notificationSlice.reducer;
export const notificationAction = notificationSlice.actions;
