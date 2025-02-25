import Http from "./http";

export const deleteBrandAPI = (data) => {
  return Http.post("admin/brand/remove",data);
};


