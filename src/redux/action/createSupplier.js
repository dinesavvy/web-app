import { createSlice } from "@reduxjs/toolkit";
import { createSupplierAPI } from "../../services/createSupplier";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createSuplierSlice = createSlice({
  name: "createSuplier",
  initialState: data,
  reducers: {
    createSuplierInfo(state) {
      state.isLoading = true;
    },
    createSuplierSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createSuplierFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createSuplierReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createSuplierHandler = (data) => async (dispatch) => {
  try {
    dispatch(createSupplierAction.createSuplierInfo());
    const response = await createSupplierAPI(data);
    dispatch(createSupplierAction.createSuplierSuccess(response));
  } catch (e) {
    console.log(e,"eeee")
    dispatch(
      createSupplierAction.createSuplierFailure(e?.response?.data?.message)
    );
  }
};
export default createSuplierSlice.reducer;
export const createSupplierAction = createSuplierSlice.actions;
