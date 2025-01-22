import Http from "./http";

export const resendInviteLinkAPI = (data) => {
  return Http.post("admin/business-team/resend-invite-link",data);
};
