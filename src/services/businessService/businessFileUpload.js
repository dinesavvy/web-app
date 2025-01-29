import Http from "../http";

export const businessFileUploadAPI = (data) => {
  return Http.post("business/s3/signed-url/upload",data);
};


