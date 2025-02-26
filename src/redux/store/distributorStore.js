import { configureStore } from "@reduxjs/toolkit";
import loginSliceDetailsSlice from "../action/distributorsAction/loginSlice";
import brandListDistributorSlice from "../action/distributorsAction/brandListDistributor";
import deleteDistributorBrandSlice from "../action/distributorsAction/deleteDistributorBrand";
import createDistributorBrandSlice from "../action/distributorsAction/createDistributorBrand";
import fileUploadDistributorSlice from "../action/distributorsAction/fileUploadDistributor";

const store = configureStore({
  reducer: {
    loginDistributor: loginSliceDetailsSlice,
    brandListDistributor: brandListDistributorSlice,
    deleteDistributorBrand: deleteDistributorBrandSlice,
    createDistributorBrand: createDistributorBrandSlice,
    fileUploadDistributor: fileUploadDistributorSlice,
  },
});

export default store;
