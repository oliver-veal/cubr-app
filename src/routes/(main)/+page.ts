import { supabase } from "$lib/api/supabase";
import type { Database } from "$lib/database.types";
import type { Render } from "$lib/render/types";
import { error, redirect } from "@sveltejs/kit";
import * as Sentry from "@sentry/svelte";

export type Onboarding = Database["public"]["Tables"]["onboarding"]["Row"];

export const load: import("./$types").PageLoad = async () => {
  const [renders, onboarding] = await Promise.all([
    load_renders(),
    load_onboarding(),
  ]);

  return { renders, onboarding };
};

const load_renders = async (): Promise<Render[]> => {
  let { data, error: err, status } = await supabase.from("renders")
    .select(
      "*",
    )
    .order(
      "requested_time",
      { ascending: false },
    );

  if (status === 401) {
    throw redirect(301, "/signin?return_url=" + window.location.pathname);
  }

  if (err) {
    console.error(err);
  }

  if (err || data === null) {
    throw error(404, "Error loading renders");
  }

  return data;
};

const load_onboarding = async (): Promise<Onboarding> => {
  let { data, error: err, status } = await supabase.from("onboarding").select(
    "*",
  )
    .limit(1).single();

  if (status === 401) {
    throw redirect(301, "/signin?return_url=" + window.location.pathname);
  }

  if (err) {
    console.error(err);
  }

  if (err || data === null) {
    throw error(404, "Error loading onboarding");
  }

  return data;
};
