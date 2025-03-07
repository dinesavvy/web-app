import Http from "../http";

export const fileUploadSupplierAPI = (data) => {
  return Http.post("supplier/s3/signed-url/upload",data);
};


