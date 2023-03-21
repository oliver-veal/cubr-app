import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { CubrClient } from "./client";

interface CubrAPI {
  client: CubrClient;
  setToken: (token?: string) => void;
}

export const cubr: CubrAPI = {
  client: new CubrClient({
    BASE: PUBLIC_BACKEND_URL,
  }),
  setToken: (token?: string) => {
    cubr.client.request.config.TOKEN = token;
  },
};
