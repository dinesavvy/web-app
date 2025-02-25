import { createSlice } from "@reduxjs/toolkit";
import { addCreditsAPI } from "../../services/addCredits";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const addCreditSlice = createSlice({
  name: "addCredit",
  initialState: data,
  reducers: {
    addCreditInfo(state) {
      state.isLoading = true;
    },
    addCreditSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    addCreditFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    addCreditReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const addCreditHandler = (data) => async (dispatch) => {
  try {
    dispatch(addCreditAction.addCreditInfo());
    const response = await addCreditsAPI(data);
    dispatch(addCreditAction.addCreditSuccess(response));
  } catch (e) {
    dispatch(addCreditAction.addCreditFailure(e));
  }
};
export default addCreditSlice.reducer;
export const addCreditAction = addCreditSlice.actions;
