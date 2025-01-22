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
  },
});

export default store;
