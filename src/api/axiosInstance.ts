import axios from "axios";
import { REACT_APP_URL } from "../config";

const instanceAxios = axios.create({
  baseURL: REACT_APP_URL,
  withCredentials: true,
});

export default instanceAxios;
