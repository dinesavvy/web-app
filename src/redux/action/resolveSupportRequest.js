import { createSlice } from "@reduxjs/toolkit";
import { resolveSupportRequestAPI } from "../../services/resolveSupportRequest";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const resolveSupportRequestSlice = createSlice({
  name: "resolveSupportRequest",
  initialState: data,
  reducers: {
    resolveSupportRequestInfo(state) {
      state.isLoading = true;
    },
    resolveSupportRequestInfoSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    resolveSupportRequestInfoFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    resolveSupportRequestInfoReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const resolveSupportRequestHandler = (data) => async (dispatch) => {
  try {
    dispatch(resolveSupportRequestAction.resolveSupportRequestInfo());
    const response = await resolveSupportRequestAPI(data);
    dispatch(resolveSupportRequestAction.resolveSupportRequestInfoSuccess(response));
  } catch (e) {
    dispatch(resolveSupportRequestAction.resolveSupportRequestInfoFailure(e));
  }
};
export default resolveSupportRequestSlice.reducer;
export const resolveSupportRequestAction = resolveSupportRequestSlice.actions;
