import { createSlice } from "@reduxjs/toolkit";
import { listByUserId } from "../../services/listByUserId";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const listByUserIdSlice = createSlice({
  name: "listByUserId",
  initialState: data,
  reducers: {
    listByUserIdInfo(state) {
      state.isLoading = true;
    },
    listByUserIdSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    listByUserIdFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    listByUserIdReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const listByUserIdHandler = (data) => async (dispatch) => {
  try {
    dispatch(listByUserIdAction.listByUserIdInfo());
    const response = await listByUserId(data);
    dispatch(listByUserIdAction.listByUserIdSuccess(response));
  } catch (e) {
    dispatch(listByUserIdAction.listByUserIdFailure(e));
  }
};
export default listByUserIdSlice.reducer;
export const listByUserIdAction = listByUserIdSlice.actions;
