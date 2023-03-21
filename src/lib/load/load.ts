import { supabase } from "$lib/api/supabase";
import { cubr } from "$lib/api/cubr.js";
import type { GetInvoicesResponseBody } from "$lib/api/client/index.js";
import { redirect } from "@sveltejs/kit";

export const load_invoices = async (): Promise<
  GetInvoicesResponseBody | null
> => {
  try {
    return await cubr.client.billing.billingGetInvoices();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const load_credit = async () => {
  let { data, error, status } = await supabase.from("customers").select(
    "balance",
  ).limit(1).single();

  if (status === 401) {
    throw redirect(301, "/signin?return_url=" + window.location.pathname);
  }

  if (error) {
    console.error(error);
  }

  return data?.balance || 0;
};
