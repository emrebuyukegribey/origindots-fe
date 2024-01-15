import axios from "axios";

const BASE_URL = "/api/v1";

const token = localStorage.getItem("token");
let headerConfig = {
  headers: { Authorization: `Bearer ${token}` },
};

axios.interceptors.request.use((request) => {
  return request;
});

axios.interceptors.response.use((response) => {
  if (response.status == 403) {
    localStorage.clear();
    window.location.reload();
  }
  return response;
});

const getHeaderConfig = () => {
  const token = localStorage.getItem("token");
  if (!token || token === undefined || token === "undefined") {
    localStorage.clear();
    window.location.href = "/user/login";
  }
  let headerConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return headerConfig;
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

export function sendUserLoginCode(email) {
  return axios.get(`${BASE_URL}/auth/sendUserLoginCode/${email}`);
}

/* PROCESS */
export function processStore(body) {
  return axios.post(`${BASE_URL}/process`, body, getHeaderConfig());
}

export function processUpdate(body) {
  return axios.put(`${BASE_URL}/process`, body, getHeaderConfig());
}

export function processDuplicate(body) {
  return axios.post(`${BASE_URL}/process/duplicate`, body, getHeaderConfig());
}

export function getAllProcessByOwner() {
  return axios.get(`${BASE_URL}/process/owner`, getHeaderConfig());
}

export function getProcessWithAllAtributes(processId) {
  return axios.get(`${BASE_URL}/process/${processId}`, getHeaderConfig());
}

export function deleteProcess(body) {
  return axios.delete(`${BASE_URL}/process`, {
    headers: headerConfig.headers,
    data: body,
  });
}

/* USERS */
export function storeUser(body) {
  return axios.post(`${BASE_URL}/users`, body, getHeaderConfig());
}

export function updateUserProfile(body) {
  return axios.post(`${BASE_URL}/users/updateProfile`, body, getHeaderConfig());
}

export function inviteUser(body) {
  return axios.post(`${BASE_URL}/users/add`, body, getHeaderConfig());
}

export function getAllUsersByOwnerUser() {
  return axios.get(`${BASE_URL}/users/owner`, getHeaderConfig());
}

export function deleteUser(id) {
  return axios.delete(`${BASE_URL}/users/${id}`, getHeaderConfig());
}

export function getUser() {
  return axios.get(`${BASE_URL}/users`, getHeaderConfig());
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
  return axios.post(`${BASE_URL}/organizations`, body, getHeaderConfig());
}

export function getAllOrganizationsByOwner() {
  return axios.get(`${BASE_URL}/organizations/owner`, getHeaderConfig());
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
    getHeaderConfig()
  );
}

export function getOrganizationProcessies(organizationId) {
  return axios.get(
    `${BASE_URL}/organizations/organization/${organizationId}/organizationProcessies`,
    getHeaderConfig()
  );
}

export function addProcessForOrganization(organizationId, body) {
  return axios.post(
    `${BASE_URL}/organizations/organization/${organizationId}/addProcessies`,
    body,
    getHeaderConfig()
  );
}

export function deleteOrganization(organizationId) {
  return axios.delete(
    `${BASE_URL}/organizations/${organizationId}`,
    getHeaderConfig()
  );
}

export function deleteUserFromOrganization(organizationId, userId) {
  return axios.delete(
    `${BASE_URL}/organizations/organization/${organizationId}/user/${userId}`,
    getHeaderConfig()
  );
}

export function deleteProcessFromOrganization(organizationId, processId) {
  return axios.delete(
    `${BASE_URL}/organizations/organization/${organizationId}/process/${processId}`,
    getHeaderConfig()
  );
}
