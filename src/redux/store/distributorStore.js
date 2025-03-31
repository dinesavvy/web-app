import { configureStore } from "@reduxjs/toolkit";
import loginSliceDetailsSlice from "../action/distributorsAction/loginSlice";
import brandListDistributorSlice from "../action/distributorsAction/brandListDistributor";
import deleteDistributorBrandSlice from "../action/distributorsAction/deleteDistributorBrand";
import createDistributorBrandSlice from "../action/distributorsAction/createDistributorBrand";
import fileUploadDistributorSlice from "../action/distributorsAction/fileUploadDistributor";
import updateDistributorBrandSlice from "../action/distributorsAction/updateDistributorBrand";
import distributorPromotionListSlice from "../action/distributorsAction/distributorPromotionList";
import distributorMerchantListSlice from "../action/distributorsAction/distributorMerchantList";
import createDistributorPromotionSlice from "../action/distributorsAction/createDistributorPromotion";
import distributorPromotionDetailsSlice from "../action/distributorsAction/distributorPromotionDetails";
import distributorEndPromotionSlice from "../action/distributorsAction/distributorEndPromotion";
import forgotPasswordSlice from "../action/distributorsAction/forgotPassword"

const store = configureStore({
  reducer: {
    loginDistributor: loginSliceDetailsSlice,
    brandListDistributor: brandListDistributorSlice,
    deleteDistributorBrand: deleteDistributorBrandSlice,
    createDistributorBrand: createDistributorBrandSlice,
    fileUploadDistributor: fileUploadDistributorSlice,
    updateDistributorBrand: updateDistributorBrandSlice,
    distributorPromotionList: distributorPromotionListSlice,
    distributorMerchantList: distributorMerchantListSlice,
    createDistributorPromotion: createDistributorPromotionSlice,
    distributorPromotionDetails: distributorPromotionDetailsSlice,
    distributorEndPromotion: distributorEndPromotionSlice,
    forgotPassword:forgotPasswordSlice
  },
});

export default store;
