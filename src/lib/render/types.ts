import type { Database } from "$lib/database.types";

export interface RenderSettings {
  border_max_x: number;
  border_max_y: number;
  border_min_x: number;
  border_min_y: number;
  engine: String;
  frame_current: number;
  frame_end: number;
  frame_start: number;
  frame_step: number;
  min_samples: number;
  noise_threshold: number;
  resolution_percentage: number;
  resolution_x: number;
  resolution_y: number;
  samples: number;
  use_border: Boolean;
  use_crop_to_border: Boolean;
}

export interface Frame {
  user_id: string;
  render_id: string;
  frame: number;
  status: string;
  progress: number;
  start_time: string | null;
  end_time: string | null;
  cost_billed: number | null;

  downloading: boolean | null;
}

export type Render = Database["public"]["Tables"]["renders"]["Row"];
