import axios from "axios";

const token = localStorage.getItem("token");
let headerConfig = {
  headers: { Authorization: `Bearer ${token}` },
};

export function registerUser(body) {
  return axios.post("/api/v1/auth/register", body);
}

export function loginUser(body) {
  return axios.post("/api/v1/auth/authenticate", body);
}

export function processStore(body) {
  return axios.post("/api/v1/process", body, headerConfig);
}

export function inviteUser(body) {
  return axios.post("api/v1/users/invite", body, headerConfig);
}
