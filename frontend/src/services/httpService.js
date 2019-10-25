import axios from "axios";
// import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("logging the error", error);
    // alert("An unexpected error occurred.");
    // logger.log(error);
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

// axios.interceptors.request.use(success => {}, null);
axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");

    if (token != null) {
      config.headers.Accept = "application/json";
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
