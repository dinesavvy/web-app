import { createSlice } from "@reduxjs/toolkit";
import { loginDistributorAPI } from "../../../services/distributorsService/login";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const loginDistributorSlice = createSlice({
  name: "loginDistributor",
  initialState: data,
  reducers: {
    loginDistributorInfo(state) {
      state.isLoading = true;
    },
    loginDistributorSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    loginDistributorFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    loginDistributorReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const loginDistributorHandler = (data) => async (dispatch) => {
  try {
    dispatch(loginDistributorAction.loginDistributorInfo());
    const response = await loginDistributorAPI(data);
    dispatch(loginDistributorAction.loginDistributorSuccess(response));
    localStorage.setItem("token", response?.data?.deviceData?.deviceToken);
    localStorage.setItem("distributorId", response?.data?._id);
    localStorage.setItem("distributorLogin",true)
  } catch (e) {
    dispatch(loginDistributorAction.loginDistributorFailure(e));
  }
};
export default loginDistributorSlice.reducer;
export const loginDistributorAction = loginDistributorSlice.actions;
