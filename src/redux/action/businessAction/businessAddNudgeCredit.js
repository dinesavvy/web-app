import { createSlice } from "@reduxjs/toolkit";
import { businessAddNudgeCreditAPI } from "../../../services/businessService/businessAddNudgeCredit";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const businessAddNudgeCreditSlice = createSlice({
  name: "businessAddNudgeCredit",
  initialState: data,
  reducers: {
    businessAddNudgCreditInfo(state) {
      state.isLoading = true;
    },
    businessAddNudgCreditSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    businessAddNudgCreditFailure(state, action) {
        console.log(action,"action")
      state.isLoading = false;
      state.message = action.payload.response?.data?.message;
      state.data = null;
    },
    businessAddNudgCreditReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const businessAddNudgeCreditHandler = (data) => async (dispatch) => {
  try {
    dispatch(businessAddNudgeCreditAction.businessAddNudgCreditInfo());
    const response = await businessAddNudgeCreditAPI(data);
    dispatch(
      businessAddNudgeCreditAction.businessAddNudgCreditSuccess(response)
    );
  } catch (e) {
    dispatch(businessAddNudgeCreditAction.businessAddNudgCreditFailure(e));
  }
};
export default businessAddNudgeCreditSlice.reducer;
export const businessAddNudgeCreditAction = businessAddNudgeCreditSlice.actions;
