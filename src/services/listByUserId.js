import Http from "./http";

export const listByUserId = (data) => {
  return Http.post("admin/nudge/list-by-userId", data);
};
