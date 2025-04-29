import { createSlice } from "@reduxjs/toolkit";
import { addBusinessAdminAPI } from "../../services/addBusinessAdmin";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const addBusinessAdminSlice = createSlice({
  name: "addBusiness",
  initialState: data,
  reducers: {
    addBusinessInfo(state) {
      state.isLoading = true;
    },
    addBusinessSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    addBusinessFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    addBusinessReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const addBusinessHandler = (data) => async (dispatch) => {
  try {
    dispatch(addBusinessAction.addBusinessInfo());
    const response = await addBusinessAdminAPI(data);
    dispatch(addBusinessAction.addBusinessSuccess(response));
  } catch (e) {
    dispatch(addBusinessAction.addBusinessFailure(e));
  }
};
export default addBusinessAdminSlice.reducer;
export const addBusinessAction = addBusinessAdminSlice.actions;
