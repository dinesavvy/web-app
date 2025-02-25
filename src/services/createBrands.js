import Http from "./http";

export const createBrandsAPI = (data) => {
  return Http.post("admin/brand/save",data);
};


