import { createSlice } from "@reduxjs/toolkit";
import { createDistributorAPI } from "../../services/createDistributor";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createDistributorSlice = createSlice({
  name: "createDistributor",
  initialState: data,
  reducers: {
    createDistributorInfo(state) {
      state.isLoading = true;
    },
    createDistributorSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createDistributorFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createDistributorReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createDistributorHandler = (data) => async (dispatch) => {
  try {
    dispatch(createDistributorAction.createDistributorInfo());
    const response = await createDistributorAPI(data);
    dispatch(createDistributorAction.createDistributorSuccess(response));
  } catch (e) {
    dispatch(
      createDistributorAction.createDistributorFailure(e?.response?.data?.message)
    );
  }
};
export default createDistributorSlice.reducer;
export const createDistributorAction = createDistributorSlice.actions;
