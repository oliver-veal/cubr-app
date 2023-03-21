import { supabase } from "$lib/api/supabase";
import type { Frame, Render } from "$lib/render/types";
import { error, redirect } from "@sveltejs/kit";
import { setFramesCookie } from "../../+layout.js";

export const load: import("./$types").PageLoad = async (
  { params, parent, fetch },
) => {
  const data = await parent();
  let [render, frames, _] = await Promise.all([
    load_render(params.render_id),
    load_frames(params.render_id),
    setFramesCookie(data?.session?.access_token!, fetch),
  ]);

  return { render, frames };
};

const load_render = async (render_id: string): Promise<Render> => {
  let { data, error: err, status } = await supabase.from("renders").select("*")
    .eq(
      "id",
      render_id,
    ).limit(1).single();

  if (status === 401) {
    throw redirect(301, "/signin?return_url=" + window.location.pathname);
  }

  if (err) {
    console.error(err);
  }

  if (err || data === null) {
    throw error(404, "Render not found");
  }

  return data;
};

const load_frames = async (render_id: string): Promise<Frame[]> => {
  let { data, error: err, status } = await supabase.from("frames").select("*")
    .eq(
      "render_id",
      render_id,
    ).order("frame", { ascending: true });

  if (status === 401) {
    throw redirect(301, "/signin?return_url=" + window.location.pathname);
  }

  if (err) {
    console.error(err);
  }

  if (err || data === null) {
    throw error(404, "Error loading frames");
  }

  return data as unknown as Frame[];
};
