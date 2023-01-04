import axios, { AxiosRequestConfig } from "axios";
const userStorage: string | null = localStorage.getItem("user");
const userObj = userStorage ? JSON.parse(userStorage) : "";

const axiosHttp = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Add a request interceptor
axiosHttp.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Do something before request is sent
    const token = userObj.jwt;
    if (token) config.headers!["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosHttp;
