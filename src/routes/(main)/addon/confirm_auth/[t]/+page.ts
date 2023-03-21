import { cubr } from "$lib/api/cubr";

export const load: import("./$types").PageLoad = async (
  { params: { t } },
) => {
  return await cubr.client.addon.addonGetLoginSession(t);
};
