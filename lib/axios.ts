import { getEnvVariables } from "@/lib/getEnvVariables";
import axios from "axios";
import Cookies from "js-cookie";

const { API_URL } = getEnvVariables();

const claraApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor para agregar el token como Bearer en Authorization
claraApi.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default claraApi;
