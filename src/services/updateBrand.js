import Http from "./http";

export const updateBrandAPI = (data) => {
  return Http.post("admin/brand/update", data);
};
