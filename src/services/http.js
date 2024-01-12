import axios from "axios";

const BASE_URL = "/api/v1";

const token = localStorage.getItem("token");
let headerConfig = {
  headers: { Authorization: `Bearer ${token}`, responseType: "blob" },
};

/* USER */
export function registerUser(body) {
  return axios.post(`${BASE_URL}/auth/register`, body);
}

export function verifyUser(body) {
  return axios.post(`${BASE_URL}/auth/isFastLogin`, body);
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

export function updateUserProfile(body) {
  let headerConfigUpload = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };
  return axios.post(
    `${BASE_URL}/users/updateProfile`,
    body,
    headerConfigUpload
  );
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

export function getUser() {
  return axios.get(`${BASE_URL}/users`, headerConfig);
}

export function getProfilePhoto(id) {
  let headerConfigUpload = {
    headers: {
      Authorization: `Bearer ${token}`,
      responseType: "blob",
    },
  };
  return axios.get(`${BASE_URL}/users/profilePhoto/${id}`, headerConfigUpload);
}

export function uploadProfilePhoto(body) {
  let headerConfigUpload = {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  };

  return axios.post(`${BASE_URL}/users/profilePhoto`, body, headerConfigUpload);
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

export function deleteOrganization(organizationId) {
  return axios.delete(
    `${BASE_URL}/organizations/${organizationId}`,
    headerConfig
  );
}

export function deleteUserFromOrganization(organizationId, userId) {
  return axios.delete(
    `${BASE_URL}/organizations/organization/${organizationId}/user/${userId}`,
    headerConfig
  );
}

export function deleteProcessFromOrganization(organizationId, processId) {
  return axios.delete(
    `${BASE_URL}/organizations/organization/${organizationId}/process/${processId}`,
    headerConfig
  );
}
