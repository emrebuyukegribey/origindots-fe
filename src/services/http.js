import axios from "axios";

const BASE_URL = "/api/v1";

const token = localStorage.getItem("token");
let headerConfig = {
  headers: { Authorization: `Bearer ${token}` },
};

/* USER */
export function registerUser(body) {
  return axios.post(`${BASE_URL}/auth/register`, body);
}

export function loginUser(body) {
  return axios.post(`${BASE_URL}/auth/authenticate`, body);
}

/* PROCESS */
export function processStore(body) {
  return axios.post(`${BASE_URL}/process`, body, headerConfig);
}

export function processUpdate(body) {
  return axios.put(`${BASE_URL}/process`, body, headerConfig);
}

export function processDuplicate(body) {
  return axios.post(`${BASE_URL}/process/duplicate`, body, headerConfig);
}

export function getAllProcessByOwner() {
  return axios.get(`${BASE_URL}/process/owner`, headerConfig);
}

export function getProcessWithAllAtributes(processId) {
  return axios.get(`${BASE_URL}/process/${processId}`, headerConfig);
}

export function deleteProcess(body) {
  return axios.delete(`${BASE_URL}/process`, {
    headers: headerConfig.headers,
    data: body,
  });
}

/* USERS */
export function storeUser(body) {
  return axios.post(`${BASE_URL}/users`, body, headerConfig);
}

export function inviteUser(body) {
  return axios.post(`${BASE_URL}/users/add`, body, headerConfig);
}

export function getAllUsersByOwnerUser() {
  return axios.get(`${BASE_URL}/users/owner`, headerConfig);
}

export function deleteUser(id) {
  return axios.delete(`${BASE_URL}/users/${id}`, headerConfig);
}

/* ORGANIZATION */
export function storeOrganization(body) {
  return axios.post(`${BASE_URL}/organizations`, body, headerConfig);
}

export function getAllOrganizationsByOwner() {
  return axios.get(`${BASE_URL}/organizations/owner`, headerConfig);
}

export function addUserForOrganization(organizationId, body) {
  return axios.post(
    `${BASE_URL}/organizations/organization/${organizationId}/addUser`,
    body,
    headerConfig
  );
}

export function getOrganizationUsers(organizationId) {
  return axios.get(
    `${BASE_URL}/organizations/organization/${organizationId}/organizationUsers`,
    headerConfig
  );
}

export function getOrganizationProcessies(organizationId) {
  return axios.get(
    `${BASE_URL}/organizations/organization/${organizationId}/organizationProcessies`,
    headerConfig
  );
}

export function addProcessForOrganization(organizationId, body) {
  return axios.post(
    `${BASE_URL}/organizations/organization/${organizationId}/addProcessies`,
    body,
    headerConfig
  );
}
