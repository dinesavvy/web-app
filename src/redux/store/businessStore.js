import { configureStore } from "@reduxjs/toolkit";
import businessLoginSlice from "../action/businessAction/businessLoginSlice";
import businessSendOtpSlice from "../action/businessAction/businessSendOtp";
import businessListSlice from "../action/businessAction/businessListSlice";
import businessListFollowerListSlice from "../action/businessAction/businessFollowers";
import businessNudgesListSlice from "../action/businessAction/businessNudgesList";
import businessCreateNudgeSlice from "../action/businessAction/businessCreateNudge";
import businessNudgesTemplateSlice from "../action/businessAction/businessNudgesTemplate";
import businessFileUploadSlice from "../action/businessAction/businessFileUpload";
import followerAnalyticsSlice from "../action/businessAction/followerAnalytics";
import businessListByUserIdSlice from "../action/businessAction/businessListByUserId";
import businessDashboardSlice from "../action/businessAction/businessDashboard";
import businessNudgeDetailsSlice from "../action/businessAction/businessNudgeDetails";
import businessTeamListSlice from "../action/businessAction/businessTeamList";
import businessRoleListSlice from "../action/businessAction/businessRoleList";
import createTeamSlice from "../action/businessAction/createTeam";
import getBusinessTeamSlice from "../action/businessAction/getBusinessTeam";
import removeTeamMemberSlice from "../action/businessAction/removeTeamMember";
import businessRoleUpdateSlice from "../action/businessAction/businessRoleUpdate";
import updateTeamBusinessSlice from "../action/businessAction/updateTeamBusiness";
import businessResendInviteLinkSlice from "../action/businessAction/businessResendInviteLink";
import nudgeAnalyticSlice from "../action/businessAction/businessNudgeAnalytic";
import businessAddNudgeCreditSlice from "../action/businessAction/businessAddNudgeCredit";
import endNudgeSlice from "../action/businessAction/endNudgeSlice";
import reverseNudgListSlice from "../action/businessAction/businessReverseNudgeList";
import relaunchNudgeSlice from "../action/businessAction/relaunchNudge";
import followerDetailsSlice from "../action/businessAction/followerDetailsAPI";
import activePromotionListSlice from "../action/businessAction/activePromotionList";
import archivePromotionSlice from "../action/businessAction/archivePromotion";
import updatePromotionSlice from "../action/businessAction/updateProotionPrice";
import topNudgesSlice from "../action/businessAction/topNudgesSlice";
import getProfileSlice from "../action/businessAction/getProfile";
import galleryListSlice from "../action/businessAction/galleryList";
import addImageDataSlice from "../action/businessAction/addImage";
import deleteImageSlice from "../action/businessAction/deleteImage";
import editImageSlice from "../action/businessAction/editImage";
import reverseNudgeSlice from "../action/businessAction/reverseNudgeDetails";
import reverseNudgeStatusUpdateSlice from "../action/businessAction/reverseNudgeStatusUpdate";

const store = configureStore({
  reducer: {
    businessLogin: businessLoginSlice,
    businessSendOtp: businessSendOtpSlice,
    businessList: businessListSlice,
    businessListFollowerList: businessListFollowerListSlice,
    businessNudgesList: businessNudgesListSlice,
    businessCreateNudge: businessCreateNudgeSlice,
    businessNudgesTemplate: businessNudgesTemplateSlice,
    businessFileUpload: businessFileUploadSlice,
    followerAnalytics: followerAnalyticsSlice,
    businessListByUserId: businessListByUserIdSlice,
    businessDashboard: businessDashboardSlice,
    businessNudgeDetails: businessNudgeDetailsSlice,
    businessTeamList: businessTeamListSlice,
    businessRoleList: businessRoleListSlice,
    createTeam: createTeamSlice,
    getBusinessTeam: getBusinessTeamSlice,
    removeTeamMemberBusiness: removeTeamMemberSlice,
    businessRoleUpdate: businessRoleUpdateSlice,
    updateTeamBusiness: updateTeamBusinessSlice,
    businessResendInviteLink: businessResendInviteLinkSlice,
    businessNudgeAnalytic: nudgeAnalyticSlice,
    businessAddNudgeCredit: businessAddNudgeCreditSlice,
    endNudge: endNudgeSlice,
    reverseNudgList: reverseNudgListSlice,
    relaunchNudge: relaunchNudgeSlice,
    followerDetails: followerDetailsSlice,
    activePromotionList: activePromotionListSlice,
    archivePromotionList: archivePromotionSlice,
    updatePromotionPrice: updatePromotionSlice,
    topNudges: topNudgesSlice,
    getProfileDetails: getProfileSlice,
    galleryList: galleryListSlice,
    addImageData: addImageDataSlice,
    deleteImage: deleteImageSlice,
    editImage: editImageSlice,
    reverseNudge: reverseNudgeSlice,
    reverseNudgeStatusUpdate: reverseNudgeStatusUpdateSlice,
  },
});

export default store;
