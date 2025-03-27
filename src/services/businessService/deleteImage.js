import Http from "../http";

export const deleteImageAPI = (data) => {
  return Http.post("business/gallery/delete-image",data);
};


