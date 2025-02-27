import { createSlice } from "@reduxjs/toolkit";
import { createBrandsAPI } from "../../services/createBrands";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createBrandSlice = createSlice({
  name: "createBrand",
  initialState: data,
  reducers: {
    createBrandInfo(state) {
      state.isLoading = true;
    },
    createBrandSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createBrandFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createBrandReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createBrandHandler = (data) => async (dispatch) => {
  try {
    dispatch(createBrandAction.createBrandInfo());
    const response = await createBrandsAPI(data);
    dispatch(createBrandAction.createBrandSuccess(response));
  } catch (e) {
    dispatch(
      createBrandAction.createBrandFailure(e?.response)
    );
  }
};
export default createBrandSlice.reducer;
export const createBrandAction = createBrandSlice.actions;
