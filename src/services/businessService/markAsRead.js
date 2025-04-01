import Http from "../http";

export const markAsReadAPI = (data) => {
  return Http.post("business/notification/mark-as-read",data);
};


