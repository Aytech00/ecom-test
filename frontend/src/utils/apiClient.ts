import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});



axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
});

// get

export const get = async (url: string) => {
  return await axiosApi
    .get(url )

    .then((res) => res.data);
};

// post

export const post = async (url: string, postData: {}) => {
  return await axiosApi
    .post(url, { ...postData })
    .then((res) => res.data);
};