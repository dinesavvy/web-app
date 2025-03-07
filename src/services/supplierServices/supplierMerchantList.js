import Http from "../http";

export const supplierMerchantListAPI  = (data) => {
  return Http.post("supplier/merchant/list",data);
};


