import axios from "axios";
import { envs } from "../config/envs";

const baseURL = envs.API_URL;

const appApi = axios.create({
  baseURL,
});

appApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default appApi;
