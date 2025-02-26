import { configureStore } from "@reduxjs/toolkit";
import loginSliceDetailsSlice from "../action/supplierActions/loginSlice";
import supplierBrandListSlice from "../action/supplierActions/supplierBrandList";
import removeSupplierSlice from "../action/supplierActions/removeSupplier";
import addSupplierBrandSlice from "../action/supplierActions/addSupplierBrand";
import fileUploadSupplierSlice from "../action/supplierActions/fileUploadSupplier";

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSliceDetailsSlice,
    supplierBrandList: supplierBrandListSlice,
    removeSupplier: removeSupplierSlice,
    addSupplierBrand: addSupplierBrandSlice,
    fileUploadSupplier: fileUploadSupplierSlice,
  },
});

export default store;
