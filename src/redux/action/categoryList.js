import { createSlice } from "@reduxjs/toolkit";
import { categoryListAPI } from "../../services/categoryList";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const categorySlice = createSlice({
  name: "categoryList",
  initialState: data,
  reducers: {
    categoryListInfo(state) {
      state.isLoading = true;
    },
    categoryListSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    categoryListFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    categoryListReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const categoryListHandler = (data) => async (dispatch) => {
  try {
    dispatch(categoryListAction.categoryListInfo());
    const response = await categoryListAPI(data);
    dispatch(categoryListAction.categoryListSuccess(response));
  } catch (e) {
    dispatch(categoryListAction.categoryListFailure(e));
  }
};
export default categorySlice.reducer;
export const categoryListAction = categorySlice.actions;
