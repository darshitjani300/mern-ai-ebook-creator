import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error
    if (error.message) {
      if (error.response.status === 500) {
        console.error("Server Error. Please try again later.");
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timed out. Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
