import axios from "axios";

const axiosService = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiQXJyYXkiLCJzdWIiOjUwMTQ2NTYsImlzcyI6Imh0dHA6Ly9hbG9wZXlrLWFwcC9hcGkvdjIiLCJpYXQiOjE2NTgzMDc5MzgsImV4cCI6NTI1ODMxMTUzOCwibmJmIjoxNjU4MzA3OTM4LCJqdGkiOiJ4RWdObHdpbmRZMEdWcWJTIn0.6n3avUvRqXLpMCcNbnnfUOXJbzVGXsWiGJflppAIc88",
  },
  baseURL: "https://api-stg.alo-dev.com/api/v2",
  timeout: 10000,
});

axiosService.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosService;
