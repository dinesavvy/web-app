import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Define a list of endpoints that don't require authentication
const noAuthEndpoints = ["/login", "/register"];

// Add a request interceptor to include the token conditionally
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage or any other secure storage
    const token = localStorage.getItem("token"); // Replace with your token retrieval method

    // Check if the request URL doesn't match any of the no-auth endpoints
    if (
      token &&
      !noAuthEndpoints.some((endpoint) => config.url.includes(endpoint))
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Define methods for API requests
export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};
