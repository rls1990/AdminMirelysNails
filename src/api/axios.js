import axios from "axios";
import { baseURLAPI } from "../config";

const instance = axios.create({
  baseURL: baseURLAPI,
  withCredentials: true,
});

export default instance;
