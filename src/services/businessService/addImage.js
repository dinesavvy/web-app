import Http from "../http";

export const addImageAPI = (data) => {
  return Http.post("business/gallery/add-image", data);
};
