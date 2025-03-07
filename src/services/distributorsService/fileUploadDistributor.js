import Http from "../http";

export const fileUploadDistributorAPI = (data) => {
  return Http.post("distributor/s3/signed-url/upload",data);
};


