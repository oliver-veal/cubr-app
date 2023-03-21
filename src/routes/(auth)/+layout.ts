import { supabase } from "$lib/api/supabase";
import type { Session } from "@supabase/supabase-js";

export const ssr = false;

export const load: import("./$types").LayoutLoad = async ({}) => {
  let { data: { session } } = await supabase.auth.getSession();

  return { session: session as Session | null };
};
