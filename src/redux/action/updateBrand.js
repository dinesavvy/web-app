import { createSlice } from "@reduxjs/toolkit";
import { updateBrandAPI } from "../../services/updateBrand";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const updateBrandSlice = createSlice({
  name: "updateBrand",
  initialState: data,
  reducers: {
    updateBrandInfo(state) {
      state.isLoading = true;
    },
    updateBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    updateBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    updateBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const updateBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(updateBrandAction.updateBrandInfo());
    const response = await updateBrandAPI(data);
    dispatch(updateBrandAction.updateBrandSuccess(response));
  } catch (e) {
    dispatch(updateBrandAction.updateBrandFailure(e.response.data.message));
  }
};
export default updateBrandSlice.reducer;
export const updateBrandAction = updateBrandSlice.actions;
