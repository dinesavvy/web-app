import Http from "./http";

export const settingListAPI = (data) => {
  return Http.post("admin/app-version/list",data);
};
