import Http from "../http";

export const notificationListAPI = (data) => {
  return Http.post("business/notification/list",data);
};


