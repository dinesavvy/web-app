import Http from "./http";

export const createVersionAPI = (data) => {
  return Http.post("admin/app-version/create",data);
};


