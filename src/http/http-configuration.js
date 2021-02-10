import axios from "axios";
import config from "../config";

const { node_api_base_url } = config;

const httpConfig = axios.create({
  timeout: 10000,
  withCredentials: true,
});

httpConfig.interceptors.request.use((req) => {
  req.baseURL = node_api_base_url;

  req.headers = {
    ...req.headers,
    uid: 'urCM7tRhtvdluO409znv2T3066o1',
  };
  return req;
});



export default httpConfig;
