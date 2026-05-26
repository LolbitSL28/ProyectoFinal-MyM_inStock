import { useSelector } from "react-redux";
import axios from "axios";
import { getStore } from "./storeHelp";

const api = axios.create({
  baseURL: "https://localhost:7163/api",
});
api.interceptors.request.use((config) => {
  const store = getStore();
  const token = store.getState().auth?.token;
  if (token && token !== "null" && token !== "undefined")
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
