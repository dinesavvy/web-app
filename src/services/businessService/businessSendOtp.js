import Http from "../http";

export const businessSendOtpAPI = (data) => {
  return Http.post("business/send-otp",data);
};


