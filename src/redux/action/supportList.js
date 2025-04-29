import { createSlice } from "@reduxjs/toolkit";
import { supportListAPI } from "../../services/supportList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const supportListSlice = createSlice({
  name: "supportList",
  initialState: data,
  reducers: {
    supportListInfo(state) {
      state.isLoading = true;
    },
    supportListInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    supportListInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    supportListInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const supportListHandler = (data) => async (dispatch) => {
  try {
    dispatch(supportListAction.supportListInfo());
    const response = await supportListAPI(data);
    dispatch(supportListAction.supportListInfoSuccess(response));
  } catch (e) {
    dispatch(supportListAction.supportListInfoFailure(e));
  }
};
export default supportListSlice.reducer;
export const supportListAction = supportListSlice.actions;
