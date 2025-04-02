import { configureStore } from "@reduxjs/toolkit";
import loginSliceDetailsSlice from "../action/supplierActions/loginSlice";
import supplierBrandListSlice from "../action/supplierActions/supplierBrandList";
// import removeSupplierSlice from "../action/supplierActions/removeSupplier";
import addSupplierBrandSlice from "../action/supplierActions/addSupplierBrand";
import fileUploadSupplierSlice from "../action/supplierActions/fileUploadSupplier";
import updateSupplierBrandSlice from "../action/supplierActions/updateSupplierBrand";
import supplierPromotionListSlice from "../action/supplierActions/supplierPromotionList";
import supplierMerchantListSlice from "../action/supplierActions/supplierMerchantList";
import addSupplierPromotionSlice from "../action/supplierActions/addSupplierPromotion";
import supplierPromotionDetailsSlice from "../action/supplierActions/supplierPromotionDetails";
import removeBrandSupplierSlice from "../action/supplierActions/removeBrandSupplier";
import supplierEndPromotionSlice from "../action/supplierActions/supplierEndPromotion";
import forgotPasswordSupplierSlice from  "../action/supplierActions/forgotPasswordSupplier"
import resetPasswordSlice from "../action/supplierActions/resetPassword"

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSliceDetailsSlice,
    supplierBrandList: supplierBrandListSlice,
    // removeSupplier: removeSupplierSlice,
    addSupplierBrand: addSupplierBrandSlice,
    fileUploadSupplier: fileUploadSupplierSlice,
    updateSupplierBrand: updateSupplierBrandSlice,
    supplierPromotionList: supplierPromotionListSlice,
    supplierMerchantList: supplierMerchantListSlice,
    addSupplierPromotion: addSupplierPromotionSlice,
    supplierPromotionDetails: supplierPromotionDetailsSlice,
    removeBrandSupplier: removeBrandSupplierSlice,
    supplierEndPromotion: supplierEndPromotionSlice,
    forgotPasswordSupplier: forgotPasswordSupplierSlice,
    resetPassword:resetPasswordSlice
  },
});

export default store;
