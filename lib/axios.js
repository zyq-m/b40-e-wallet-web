import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const axiosProxyInstance = axios.create({
  baseURL: "http://localhost:3001",
});

// TODO: 1. create axios refresh token interceptor
