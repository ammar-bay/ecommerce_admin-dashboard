import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000/";
const userCookie = Cookies.get("user")
const user = userCookie && JSON.parse(Cookies.get("user"));
const TOKEN = user ? user?.accessToken : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export default axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
