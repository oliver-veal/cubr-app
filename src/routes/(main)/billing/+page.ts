import { supabase } from "$lib/api/supabase";
import type { Database } from "$lib/database.types";
import { load_credit, load_invoices } from "$lib/load/load.js";
import { redirect } from "@sveltejs/kit";

export const load: import("./$types").PageLoad = async ({ parent }) => {
  await parent();
  let [usage, invoices, balance] = await Promise.all([
    load_usage(),
    load_invoices(),
    load_credit(),
  ]);

  return { usage, invoices, balance };
};

export type Usage = Database["public"]["Functions"]["daily_billing"]["Returns"];

const load_usage = async (): Promise<Usage> => {
  const date_from = new Date();
  date_from.setDate(date_from.getDate() - 30);
  const date_to = new Date();

  let { data, error, status } = await supabase.rpc(
    "daily_billing",
    {
      date_from: date_from.toISOString(),
      date_to: date_to.toISOString(),
    },
  );

  if (status === 401) {
    throw redirect(301, "/signin?return_url=" + window.location.pathname);
  }

  if (error) {
    console.error(error);
  }

  if (data === null) {
    data = [];
  }

  // @ts-ignore
  return data;
};
