import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

let parsedToken = null;

if (typeof window !== "undefined") {
  const user = localStorage.getItem("user");
  parsedToken = user ? JSON.parse(user)?.accessToken : null;
}

// const API_BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL
//     : process.env.NEXT_PUBLIC_API_BASE_URL_REMOTE;
export const BASEURL = "http://localhost:4040/api/v1/" ;
const api = axios.create({
  baseURL: "http://localhost:4040/api/v1/",
  withCredentials: true,
  headers: {
    Authorization: parsedToken ? `Bearer ${parsedToken}` : undefined,
  },
});

export default api;
