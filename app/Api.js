import axios from "axios";
import { baseURL } from "./BaseUrl";

export default axios.create({
  baseURL: `${baseURL}`,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    
  },
});