import { createSlice } from "@reduxjs/toolkit";
import { brandListDistributorAPI } from "../../../services/distributorsService/brandListDistributor";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const brandListDistributorSlice = createSlice({
  name: "brandListDistributor",
  initialState: data,
  reducers: {
    brandListDistributorInfo(state) {
      state.isLoading = true;
    },
    brandListDistributorSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    brandListDistributorFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    brandListDistributorReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const brandListDistributorHandler = (data) => async (dispatch) => {
  try {
    dispatch(brandListDistributorAction.brandListDistributorInfo());
    const response = await brandListDistributorAPI(data);
    dispatch(brandListDistributorAction.brandListDistributorSuccess(response));
  } catch (e) {
    dispatch(brandListDistributorAction.brandListDistributorFailure(e));
  }
};
export default brandListDistributorSlice.reducer;
export const brandListDistributorAction = brandListDistributorSlice.actions;
