import { configureStore } from "@reduxjs/toolkit";
import loginSliceDetailsSlice from "../action/supplierActions/loginSlice";

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSliceDetailsSlice,
  },
});

export default store;
