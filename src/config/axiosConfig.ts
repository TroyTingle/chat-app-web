import axios from "axios";
import { BASE_API_URL } from "@/utils/constants";
import { logger } from "@/utils/logger";
import {cookies} from "next/headers";

const cookieStore = await cookies();

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    "Cookie": cookieStore.toString(),
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logger.debug("Unauthorized! Refreshing Auth.");
      // TODO: Handle refresh logic once implemented
    }
    return Promise.reject(error as Error);
  }
);
