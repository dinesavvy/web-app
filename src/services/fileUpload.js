import Http from "./http";

export const fileUploadAPI = (data) => {
  return Http.post("admin/s3/signed-url/upload",data);
};


