import xios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BASE_API_URL}/api/v1`;

export const axios = xios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
