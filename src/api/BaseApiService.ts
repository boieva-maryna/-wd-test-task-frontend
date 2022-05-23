import axios from "axios";
import { getToken } from "./TokenService";

const BaseApiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

BaseApiService.interceptors.request.use(
  async (config) => {
    const token = getToken();
    config.headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...config.headers,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default BaseApiService;
