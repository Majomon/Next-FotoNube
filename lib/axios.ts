import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";
import { getTokenFromCookies } from "./getTokenFromCookies";

const { API_URL } = getEnvVariables();

const claraApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

claraApi.interceptors.request.use((config) => {
  const token = getTokenFromCookies(); // lee de cookies
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default claraApi;
