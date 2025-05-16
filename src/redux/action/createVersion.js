import { createSlice } from "@reduxjs/toolkit";
import { createVersionAPI } from "../../services/create-version";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const createVersionSlice = createSlice({
  name: "createVersion",
  initialState: data,
  reducers: {
    createVersionInfo(state) {
      state.isLoading = true;
    },
    createVersionSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    createVersionFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    createVersionReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const createVersionHandler = (data) => async (dispatch) => {
  try {
    dispatch(createVersionAction.createVersionInfo());
    const response = await createVersionAPI(data);
    dispatch(createVersionAction.createVersionSuccess(response));
  } catch (e) {
    dispatch(
      createVersionAction.createVersionFailure(e?.response?.data?.message)
    );
  }
};
export default createVersionSlice.reducer;
export const createVersionAction = createVersionSlice.actions;
