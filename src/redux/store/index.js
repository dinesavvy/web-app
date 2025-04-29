import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../action/loginSlice";
import merchantsListSlice from "../action/merchantsList";
import merchantDetailsSlice from "../action/merchantDetails";
import followerListSlice from "../action/followersList";
import nudgesListSlice from "../action/nudgesList";
import followersDetailsSlice from "../action/followersDetails";
import nudgeDetailsMainSlice from "../action/nudgeDetails";
import followerArchiveSlice from "../action/followerArchive";
import analyticsDetailsSlice from "../action/analyticsDetails";
import createNudgeSlice from "../action/create-nudge";
import getNudgesTemplateSlice from "../action/getNudgesTemplate";
import listByUserIdSlice from "../action/listByUserId";
import merchantPerformanceAnalyticsListSlice from "../action/merchantPerfomanceAnalyticsList";
import fileuploadSlice from "../action/fileUpload";
import merchantPerformanceAnalyticsDetailsSlice from "../action/merchantPerformanceAnalyticsDetails";
import teamListInfoSlice from "../action/teamsList";
import merchantTeamsSlice from "../action/merchantTeams";
import removeTeamMemberSlice from "../action/removeTeamMember";
import roleListActionSlice from "../action/roleList";
import updateTeamSlice from "../action/updateTeam";
import resendInviteLinkSlice from "../action/resendInviteLink";
import brandListSlice from "../action/brandListSlice";
import getSupplierSlice from "../action/getSuppliersSlice";
import createSuplierSlice from "../action/createSupplier";
import distributorsListSlice from "../action/distributorsList";
import createDistributorSlice from "../action/createDistributor";
import removeSupplierSlice from "../action/removeSupplier";
import updateSupplierSlice from "../action/updateSupplier";
import removeDistributorSlice from "../action/removeDistributor";
import updateDistributorSlice from "../action/updateDistributor";
import createBrandSlice from "../action/createBrandSlice";
import deleteBrandSlice from "../action/deleteBrand";
import addCreditSlice from "../action/addCreditsSlice";
import nudgeAnalyticSlice from "../action/nudgeAnalytic";
import updateBrandSlice from "../action/updateBrand";
import adminPromotionSlice from "../action/adminPromotion";
import createPromotionSlice from "../action/createPromotion";
import promotionDetailsSlice from "../action/promotionDetails";
import adminEndPromotionSlice from "../action/adminEndPromotion";
import loyaltyGraphSlice from "../action/loyaltyGraph";
import supportListSlice from "../action/supportList";
import resolveSupportRequestSlice from "../action/resolveSupportRequest";
import googleBusinessSlice from "../action/googleBusinessSlice"
import categoryListSlice from "../action/categoryList"
import addBusinessSlice from "../action/addBusinessAdminSlice"

const store = configureStore({
  reducer: {
    loginSliceDetails: loginSlice,
    merchantsList: merchantsListSlice,
    merchantDetails: merchantDetailsSlice,
    followeList: followerListSlice,
    nudgesList: nudgesListSlice,
    followerDetails: followersDetailsSlice,
    nudgeDetailsMain: nudgeDetailsMainSlice,
    followerArchive: followerArchiveSlice,
    analyticsDetails: analyticsDetailsSlice,
    createNudge: createNudgeSlice,
    getNudgesTemplate: getNudgesTemplateSlice,
    listByUserId: listByUserIdSlice,
    merchantPerformanceAnalyticsList: merchantPerformanceAnalyticsListSlice,
    fileupload: fileuploadSlice,
    merchantPerformanceAnalyticsDetails:
      merchantPerformanceAnalyticsDetailsSlice,
    teamList: teamListInfoSlice,
    merchantTeamsList: merchantTeamsSlice,
    removeTeamMember: removeTeamMemberSlice,
    roleList: roleListActionSlice,
    updateTeam: updateTeamSlice,
    resendInviteLink: resendInviteLinkSlice,
    brandList: brandListSlice,
    getSupplierList: getSupplierSlice,
    createSuplier: createSuplierSlice,
    distributorsList: distributorsListSlice,
    createDistributor: createDistributorSlice,
    removeSupplier: removeSupplierSlice,
    updateSupplier: updateSupplierSlice,
    removeDistributor: removeDistributorSlice,
    updateDistributor: updateDistributorSlice,
    createBrand: createBrandSlice,
    deleteBrand: deleteBrandSlice,
    addCredit: addCreditSlice,
    nudgeAnalytic: nudgeAnalyticSlice,
    updateBrand: updateBrandSlice,
    adminPromotion: adminPromotionSlice,
    createPromotion: createPromotionSlice,
    promotionDetails: promotionDetailsSlice,
    adminEndPromotion: adminEndPromotionSlice,
    loyaltyGraph: loyaltyGraphSlice,
    supportList: supportListSlice,
    resolveSupportRequest: resolveSupportRequestSlice,
    googleBusiness:googleBusinessSlice,
    categoryList:categoryListSlice,
    addBusiness:addBusinessSlice
  },
});

export default store;
