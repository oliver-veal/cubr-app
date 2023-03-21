import { PUBLIC_FRAMES_URL } from "$env/static/public";
import { cubr } from "$lib/api/cubr";
import { supabase } from "$lib/api/supabase";
import * as Sentry from "@sentry/svelte";
import { redirect } from "@sveltejs/kit";

Sentry.init({
  dsn:
    "https://fcfb46f7438e40d5b1634d9eb2101358@o4504598752526336.ingest.sentry.io/4504598757834752",
  integrations: [],
});

export const ssr = false;

export const load: import("./$types").LayoutLoad = async ({ fetch }) => {
  supabase.auth.onAuthStateChange(
    async (event, session) => {
      console.log(event);

      if (event === "SIGNED_IN") {
        // remove #access_token=... from url
        window.history.replaceState(
          "",
          document.title,
          window.location.pathname + window.location.search,
        );
      }

      if (session !== null) {
        cubr.setToken(session?.access_token);
        await setFramesCookie(session?.access_token!, fetch);
      }
    },
  );

  let { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    throw redirect(301, "/signin?return_url=" + window.location.pathname);
  }

  cubr.setToken(session?.access_token);

  return { session };
};

export const setFramesCookie = async (token: String, fetch: any) => {
  try {
    await fetch(PUBLIC_FRAMES_URL + "/cookie", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    });
  } catch (e) {
    console.error(e);
  }
};
