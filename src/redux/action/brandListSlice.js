import { createSlice } from "@reduxjs/toolkit";
import { brandListAPI } from "../../services/brandList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const brandListsSlice = createSlice({
  name: "brandList",
  initialState: data,
  reducers: {
    brandListsInfo(state) {
      state.isLoading = true;
    },
    brandListsSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    brandListsFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    brandListsReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const brandListsHandler = (data) => async (dispatch) => {
  try {
    dispatch(brandListsAction.brandListsInfo());
    const response = await brandListAPI(data);
    dispatch(brandListsAction.brandListsSuccess(response));
  } catch (e) {
    dispatch(brandListsAction.brandListsFailure(e));
  }
};
export default brandListsSlice.reducer;
export const brandListsAction = brandListsSlice.actions;
