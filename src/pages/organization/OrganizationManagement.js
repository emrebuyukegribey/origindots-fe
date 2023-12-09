import { withTranslation } from "react-i18next";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import PageHeaderMenu from "../../components/UI/PageHeaderMenu";
import { MainContext, useContext } from "../../context";
import "./OrganizationManagementStyles.css";
import { useState } from "react";
import { Modal, Select, message, notification } from "antd";
import OrganizationForm from "./OrganizationForm";
import CircleLoading from "../../components/UI/Loading/LoadingBar";
import {
  getAllOrganizationsByOwner,
  getAllUsersByOwnerUser,
  getOrganizationUsers,
  storeOrganization,
} from "../../services/http";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import OrganizationTable from "./OrganizationTable";
import { useEffect } from "react";

const { Option } = Select;

function OrganizationManagement(props) {
  const { activeLeftBar, loginUser, token } = useContext(MainContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const [showOrganizationForm, setShowOrganizationForm] = useState(false);
  const [organization, setOrganization] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [organizationsTemp, setOrganizationsTemp] = useState([]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [searchedOrganizations, setSearchedOrganizations] = useState([]);
  const [tableExpandedKeys, setTableExpandedKeys] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [users, setUsers] = useState([]);

  const cancelShowAddUserModal = () => {
    setShowAddUserModal(false);
  };

  const newOrganizationCreate = () => {
    setShowOrganizationForm(true);
  };

  const cancelOrganizationForm = () => {
    setShowOrganizationForm(false);
  };

  const showMessage = (type, content) => {
    setTimeout(() => {
      messageApi.open({
        type: type,
        content: content,
      });
    }, 300);
  };

  const openErrorNotification = (type, message, description) => {
    setTimeout(() => {
      notificationApi[type]({
        message: message,
        description: description,
      });
    }, 300);
  };

  function flattenOrganizations(orgs) {
    let flatList = [];
    orgs.forEach((org) => {
      flatList.push({
        id: org.id,
        name: org.name,
        description: org.description,
        createdDate: org.createdDate,
      });
      if (org.children) {
        flatList = flatList.concat(flattenOrganizations(org.children));
      }
    });
    return flatList;
  }

  useEffect(() => {
    const flatOrganizations = flattenOrganizations(organizations);
    setSearchedOrganizations(flatOrganizations);
  }, []);

  const getAllOrganizations = async () => {
    setLoading(true);
    try {
      const response = await getAllOrganizationsByOwner();
      if (response.status === 200) {
        // navigate("/organization-management");
        setShowOrganizationForm(false);
        setOrganizations(response.data);
        setOrganizationsTemp(response.data);
        const flatOrganizations = flattenOrganizations(response.data);
        setSearchedOrganizations(flatOrganizations);
      } else {
        openErrorNotification(
          "error",
          props.t("Creating new organization error"),
          response.data.message
        );
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsersByOwnerUser();
      console.log("response : ", response);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        openErrorNotification(
          "error",
          props.t("Getting Userserror"),
          response.data.message
        );
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const searchOrganization = (e) => {
    const value = e.target ? e.target.value : e;
    if (value && value.length > 0) {
      const filteredOrganizations = searchedOrganizations.filter(
        (organization) =>
          organization.name.toLowerCase().includes(value.toLowerCase()) ||
          organization.description.toLowerCase().includes(value.toLowerCase())
      );
      setOrganizations(filteredOrganizations);
    } else {
      setOrganizations(organizationsTemp);
    }
  };

  useEffect(() => {
    getAllOrganizations();
    getAllUsers();
  }, []);

  const addUserOnOrganization = (organization, users) => {};

  const openAddUserOnOrganization = (organizationId) => {
    console.log("openAddUserOnOrganization");
    try {
      const organizationUsersResponse = getOrganizationUsers(organizationId);
      if (organizationUsersResponse.status === 200) {
        try {
          const allUsersResponse = getAllUsers();
          if (allUsersResponse.status === 200) {
            const availableUsers = [];
            allUsersResponse.data.forEach((user) => {
              organizationUsersResponse.data.forEach((organizationUser) => {
                if (user.id === organizationUser.id) {
                  availableUsers.push(user);
                }
              });
            });
          } else {
            openErrorNotification(
              "error",
              props.t("Getting owner users error"),
              allUsersResponse.data.message
            );
          }
        } catch (err) {
          console.log("Getting owner users error : ", err);
        }
      } else {
        openErrorNotification(
          "error",
          props.t("Getting organization users error"),
          organizationUsersResponse.data.message
        );
      }
    } catch (err) {
      console.log("Getting organizaiton users error : ", err);
    } finally {
    }
    const organizationUsers = getOrganizationUsers(organizationId);
    setShowAddUserModal(true);
  };

  const submitOrganization = async (organization) => {
    setLoading(true);
    setOrganization({});
    try {
      const response = await storeOrganization(organization);
      if (response.status === 200) {
        navigate("/organization-management");
        showMessage("success", props.t("Created new organization"));
        setShowOrganizationForm(false);
        getAllOrganizations();
      } else {
        openErrorNotification(
          "error",
          props.t("Creating new organization error"),
          response.data.message
        );
      }
    } catch (err) {
      openErrorNotification(
        "error",
        props.t("Creating new organization error"),
        err.response.data.message
      );
    } finally {
      // setShowNewUserForm(true);
      // await getAllUsers();
      setLoading(false);
    }
  };

  const showOrganizationInformations = () => {
    console.log("showOrganizationInformations");
  };

  const editOrganizaton = () => {
    console.log("editOrganization");
  };

  const deleteOrganization = () => {
    console.log("deleteOrganization");
  };

  const addUser = () => {
    console.log("addUser");
  };

  const addProcess = () => {
    console.log("addProcess");
  };

  if (loading) {
    return <CircleLoading />;
  }

  return (
    <>
      <Navbar />
      <LeftBar />
      {contextHolder}
      {notificationContextHolder}
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        <div className="organization-management-container">
          <div className="user-management-header-container">
            {!showOrganizationForm && (
              <PageHeaderMenu
                buttonText={props.t("Create Organization")}
                buttonOnClick={newOrganizationCreate}
                searchOnChange={searchOrganization}
                searchPlaceholder={props.t(
                  "Please enter something about the user"
                )}
              />
            )}
          </div>
          {!showOrganizationForm && (
            <div className="organization-management-divider" />
          )}
          {showOrganizationForm ? (
            <div
              className="organization-management-form"
              style={{ marginLeft: "50px" }}
            >
              <OrganizationForm
                setNavbarHeaderText={props.setNavbarHeaderText}
                submit={submitOrganization}
                cancel={cancelOrganizationForm}
                organizations={organizations}
                organization={organization}
                t={props.t}
              />
            </div>
          ) : (
            <OrganizationTable
              setNavbarHeaderText={props.setNavbarHeaderText}
              organizations={organizations}
              openAddUserOnOrganization={openAddUserOnOrganization}
              t={props.t}
              expandedKeys={tableExpandedKeys}
              searchValue={searchValue}
              autoExpandParent={autoExpandParent}
              showOrganizationInformations={showOrganizationInformations}
              editOrganizaton={editOrganizaton}
              deleteOrganization={deleteOrganization}
              addUser={addUser}
              addProcess={addProcess}
            />
          )}
        </div>
      </div>
      <Modal
        title={props.t("Add User on Organization")}
        open={showAddUserModal}
        onOk={addUserOnOrganization}
        onCancel={cancelShowAddUserModal}
      >
        <div>
          <div className="user-management-divider" />
          {console.log("users : ", users)}
          <div>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              defaultValue={[users[0]]}
              // onChange={handleChange}
            >
              {users.map((user) => (
                <Option key={user.id}>
                  {user.firstName} {user.lastName} - ({user.email} -{" "}
                  {user.username})
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
}

const OrganizationManagementWithTranslation = withTranslation()(
  OrganizationManagement
);
export default OrganizationManagementWithTranslation;
