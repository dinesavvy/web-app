import Http from "../http";

export const galleryListAPI = (data) => {
  return Http.post("business/gallery/list",data);
};


