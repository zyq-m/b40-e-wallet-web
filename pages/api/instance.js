import axios from "axios";
import { logout } from "../../lib/logout";
import handleLocalStorage from "../../utils/handleLocalStorage";

const { getItem, store, remove } = handleLocalStorage();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,

  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptors for API calls
instance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `Bearer ${getItem("accessToken")}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// refresh token implementation
const getRefreshToken = async () => {
  const response = instance.post("/token", {
    refreshToken: getItem("refreshToken"),
  });
  store("accessToken", response.data.accessToken);
};

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // if token expired
    if (error.response.status == 403) {
      alert("Session expired, please login again");
      logout(getItem("refreshToken"))
        .then(() => {
          remove("refreshToken");
          remove("accessToken");
        })
        .catch(err => console.log(err));
      window.location.replace("./");

      // return;
      // instance
      //   .post("/token", {
      //     refreshToken: getItem("refreshToken"),
      //   })
      //   .then(() => {
      //     store("accessToken", response.data.accessToken);
      //
      //     instance(originalRequest); // return original request
      //   })
      //   .catch(err => console.log(err));
      // getRefreshToken()
      // .then(() => instance(originalRequest))
      // .catch(err => console.log(err));
      // return prev request
    }
    return Promise.reject(error);
  }
);

export default instance;
