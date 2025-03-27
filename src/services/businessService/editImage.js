import Http from "../http";

export const editImageAPI = (data) => {
  return Http.post("business/gallery/edit-image", data);
};
