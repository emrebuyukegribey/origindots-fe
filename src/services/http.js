import axios from "axios";

export function registerUser(body) {
  return axios.post("/api/v1/auth/register", body);
}

export function loginUser(body) {
  return axios.post("/api/v1/auth/authenticate", body);
}
