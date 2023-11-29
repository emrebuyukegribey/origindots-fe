import axios from "axios";

const BASE_URL = "/api/v1";

const token = localStorage.getItem("token");
let headerConfig = {
  headers: { Authorization: `Bearer ${token}` },
};

export function registerUser(body) {
  return axios.post(`${BASE_URL}/auth/register`, body);
}

export function loginUser(body) {
  return axios.post(`${BASE_URL}/auth/authenticate`, body);
}

export function processStore(body) {
  return axios.post(`${BASE_URL}/process/process`, body, headerConfig);
}

export function storeUser(body) {
  return axios.post(`${BASE_URL}/users`, body, headerConfig);
}

export function inviteUser(body) {
  return axios.post(`${BASE_URL}/users/invite`, body, headerConfig);
}

export function getAllUsersByOwnerUser(ownerUser) {
  return axios.get(`${BASE_URL}/users/owner/${ownerUser}`, headerConfig);
}

export function deleteUser(id) {
  return axios.delete(`${BASE_URL}/users/${id}`, headerConfig);
}
