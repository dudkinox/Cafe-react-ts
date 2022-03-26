import axios from "axios";

axios.interceptors.request.use(async (config) => {
  config.baseURL = "https://api-food-nut.herokuapp.com/api";
  config.headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  return config;
});
export const httpClient = axios;
