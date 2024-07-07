import axios from "axios";

const appApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// appApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default appApi;
