// config/axios.ts
import axios from "axios";

export const AxiosPublic = axios.create({
  baseURL: "http://10.10.13.59:8005",
  headers: {
    "Content-Type": "application/json",
  },
});
