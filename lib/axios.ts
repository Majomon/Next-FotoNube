import axios from "axios";
import { getEnvVariables } from "./getEnvVariables";

const { API_URL } = getEnvVariables();

const claraApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

claraApi.interceptors.request.use((config) => config);

export default claraApi;
