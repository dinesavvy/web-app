import Http from "./http";

export const getNudgeTemplateAPI = (data) => {
  return Http.post("admin/nudge-template/list", data);
};
