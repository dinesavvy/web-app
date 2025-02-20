import { createSlice } from "@reduxjs/toolkit";
import { deleteBrandAPI } from "../../services/deleteBrand";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const deleteBrandSlice = createSlice({
  name: "deleteBrand",
  initialState: data,
  reducers: {
    deleteBrandInfo(state) {
      state.isLoading = true;
    },
    deleteBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    deleteBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    deleteBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const deleteBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(deleteBrandsAction.deleteBrandInfo());
    const response = await deleteBrandAPI(data);
    dispatch(deleteBrandsAction.deleteBrandSuccess(response));
  } catch (e) {
    dispatch(
      deleteBrandsAction.deleteBrandFailure(e?.response?.data?.message)
    );
  }
};
export default deleteBrandSlice.reducer;
export const deleteBrandsAction = deleteBrandSlice.actions;
