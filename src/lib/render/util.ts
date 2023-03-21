import { timeFormatter } from "./formatter";
import type { RenderSettings } from "./types.js";

export const isDone = (status: string) => {
  return status === "complete" || status === "failed" || status === "canceled";
};

export const timeElapsed = (
  start_time: string | null,
  end_time: string | null,
) => {
  if (!start_time) {
    return timeFormatter(0);
  } else if (!end_time) {
    return getElapsedTime(Date.parse(start_time), Date.now());
  } else {
    return getElapsedTime(
      Date.parse(start_time),
      Date.parse(end_time),
    );
  }
};

export const getElapsedTime = (start: number, end: number) => {
  return timeFormatter((end - start) / 1000);
};

export const displayResolution = (settings: any) => {
  const x = Math.floor(
    settings.resolution_x * (settings.resolution_percentage / 100),
  );
  const y = Math.floor(
    settings.resolution_y * (settings.resolution_percentage / 100),
  );

  return `${x} x ${y}`;
};
