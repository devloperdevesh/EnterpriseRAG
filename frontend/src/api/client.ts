import axios from "axios";

export const api = axios.create({
  baseURL: "https://enterpriserag-production.up.railway.app",
});

// Automatically attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
