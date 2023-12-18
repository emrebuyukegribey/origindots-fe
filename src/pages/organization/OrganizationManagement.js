import { withTranslation } from "react-i18next";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import PageHeaderMenu from "../../components/UI/PageHeaderMenu";
import { MainContext, useContext } from "../../context";
import "./OrganizationManagementStyles.css";
import { useState } from "react";
import {
  Modal,
  Select,
  Table,
  Tabs,
  Transfer,
  message,
  notification,
} from "antd";
import OrganizationForm from "./OrganizationForm";
import CircleLoading from "../../components/UI/Loading/LoadingBar";
import {
  addProcessForOrganization,
  addUserForOrganization,
  deleteOrganization,
  deleteProcessFromOrganization,
  deleteUserFromOrganization,
  getAllOrganizationsByOwner,
  getAllProcessByOwner,
  getAllUsersByOwnerUser,
  getOrganizationProcessies,
  getOrganizationUsers,
  storeOrganization,
} from "../../services/http";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import OrganizationTable from "./OrganizationTable";
import { useEffect } from "react";
import OrganizationItemCard from "./OrganizationItemCard";
import { CiCircleAlert } from "react-icons/ci";

const { Option } = Select;

let selectedUsersForOrganization = [];
let selectedProcessiesForOrganization = [];

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
  const [showAddProcessModal, setShowAddProcessModal] = useState(false);
  const [showOrganizationModal, setShowOrganizationModal] = useState(false);
  const [showOrganizationTabItems, setShowOrganizationTabItems] = useState([]);

  const [searchedOrganizations, setSearchedOrganizations] = useState([]);
  const [tableExpandedKeys, setTableExpandedKeys] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [users, setUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);

  const [processies, setProcessies] = useState([]);
  const [availableProcessies, setAvailableProcessies] = useState([]);

  const [selectedOrganization, setSelectedOrganization] = useState();

  const [defaultTabKey, setDefaultTabKey] = useState("1");

  const cancelShowAddUserModal = () => {
    setShowAddUserModal(false);
  };

  const cancelShowAddProcessModal = () => {
    setShowAddProcessModal(false);
  };

  const cancelShowOrganizationModal = () => {
    setShowOrganizationModal(false);
  };

  const newOrganizationCreate = () => {
    setOrganization({});
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
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        openErrorNotification(
          "error",
          props.t("Getting Users error"),
          response.data.message
        );
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const getAllProcess = async () => {
    setLoading(true);
    try {
      const response = await getAllProcessByOwner();
      if (response.status === 200) {
        setProcessies(response.data);
      } else {
        openErrorNotification(
          "error",
          props.t("Getting Processies error"),
          response.data.message
        );
      }
    } catch (err) {
      console.log("Getting Processies error : ", err);
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
    getAllProcess();
  }, []);

  const addProcessOnOrganization = async () => {
    setLoading(true);
    try {
      const response = await addProcessForOrganization(
        selectedOrganization.id,
        selectedProcessiesForOrganization
      );
      if (response.status === 200) {
        showMessage("success", "Added process/s on organization");
        setLoading(false);
        setShowAddProcessModal(false);
      } else {
        openErrorNotification(
          "error",
          props.t("Adding process on organization error"),
          response.data.message
        );
      }
    } catch (err) {
      console.log("Adding process on organization error : ", err);
    } finally {
      setLoading(false);
    }
  };

  const addUserOnOrganization = async () => {
    setLoading(true);
    try {
      const response = await addUserForOrganization(
        selectedOrganization.id,
        selectedUsersForOrganization
      );
      if (response.status === 200) {
        showMessage("success", "Added user/s on organization");
        setLoading(false);
        setShowAddUserModal(false);
      } else {
        openErrorNotification(
          "error",
          props.t("Adding user on organization error"),
          response.data.message
        );
      }
    } catch (err) {
      console.log("Adding user on organization error : ", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddProcessOnOrganization = async (organization) => {
    try {
      const organizationProcessiesResponse = await getOrganizationProcessies(
        organization.id
      );
      if (organizationProcessiesResponse.status === 200) {
        const notSavedProcessies = processies.filter(
          (process1) =>
            !organizationProcessiesResponse.data.some(
              (process2) => process2.processId === process1.id
            )
        );

        setSelectedOrganization(organization);
        setAvailableProcessies(notSavedProcessies);
        setShowAddProcessModal(true);
      }
    } catch (err) {
      console.log("Getting organization processies error : ", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddUserOnOrganization = async (organization) => {
    setLoading(true);

    try {
      const organizationUsersResponse = await getOrganizationUsers(
        organization.id
      );
      if (organizationUsersResponse.status === 200) {
        const notSavedUsers = users.filter(
          (user1) =>
            !organizationUsersResponse.data.some(
              (user2) => user2.userId === user1.id
            )
        );
        setSelectedOrganization(organization);
        setAvailableUsers(notSavedUsers);
        setShowAddUserModal(true);
      }
    } catch (err) {
      console.log("Getting organization users error : ", err);
    } finally {
      setLoading(false);
    }
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

  const showOrganizationInformations = async (organization) => {
    setLoading(true);
    setOrganization(organization);
    setDefaultTabKey("1");
    // setSelectedOrganization(organization);

    try {
      const usersResponse = await getOrganizationUsers(organization.id);
      if (usersResponse.status === 200) {
        try {
          const processiesResponse = await getOrganizationProcessies(
            organization.id
          );

          const userTableColumns = [
            {
              title: "Username",
              dataIndex: "username",
            },
            {
              title: "First Name",
              dataIndex: "firstName",
            },
            {
              title: "Last Name",
              dataIndex: "lastName",
            },
            {
              title: "Email",
              dataIndex: "email",
            },
            {
              title: "Created Date",
              dataIndex: "createdDate",
              render: (text, record) => (
                <div>{new Date(record.createdDate).toLocaleString()}</div>
              ),
            },
            {
              title: "Actions",
              dataIndex: "actions",
              render: (text, record) => (
                <div
                  onClick={() => deleteUserWarning(record)}
                  style={{ color: "#EF4136", cursor: "pointer" }}
                >
                  Delete
                </div>
              ),
            },
          ];

          const processTableColumns = [
            {
              title: "Name",
              dataIndex: "processName",
            },

            {
              title: "Created Date",
              dataIndex: "createdDate",
              render: (text, record) => (
                <div>{new Date(record.createdDate).toLocaleString()}</div>
              ),
            },
            {
              title: "Actions",
              dataIndex: "actions",
              render: (text, record) => (
                <div
                  onClick={() => deleteProcessWarning(record)}
                  style={{ color: "#EF4136", cursor: "pointer" }}
                >
                  Delete
                </div>
              ),
            },
          ];

          if (processiesResponse.status === 200) {
            const tabItems = [
              {
                key: "1",
                label: "Show Organization Users",
                children: (
                  <Table
                    columns={userTableColumns}
                    dataSource={usersResponse.data}
                    size="small"
                  />
                ),
              },
              {
                key: "2",
                label: "Show Organization Processies",
                children: (
                  <Table
                    columns={processTableColumns}
                    dataSource={processiesResponse.data}
                    size="small"
                  />
                ),
              },
            ];
            setShowOrganizationTabItems(tabItems);
          }
        } catch (err) {
          console.log(
            "Getting processies for organization (show) error : ",
            err
          );
        } finally {
        }
      }
    } catch (err) {
      console.log("Getting users for organization (show) error : ", err);
    } finally {
      setLoading(false);
    }

    setShowOrganizationModal(true);
  };

  const showOrganizationEdit = (organization) => {
    setOrganization(organization);
    setShowOrganizationForm(true);
  };

  const deleteOrganizationWarning = (organization) => {
    Modal.confirm({
      title: props.t(
        "Are you sure delete the organization and its all sub organizations"
      ),
      icon: <CiCircleAlert size={20} color="red" />,
      content: "",
      onOk() {
        deleteOrganizationAndChilds(organization);
      },

      onCancel() {},
      okType: "danger",
    });
  };

  const deleteOrganizationAndChilds = async (organization) => {
    setLoading(true);
    try {
      const response = await deleteOrganization(organization.id);
      if (response.status === 200) {
        showMessage(
          "success",
          "Deleted organization and its all sub organizations"
        );
        getAllOrganizations();
      } else {
        openErrorNotification(
          "error",
          props.t("Deleting organization error"),
          response.data.message
        );
      }
    } catch (err) {
      console.log("Deleting organization error : ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserWarning = (organizationUser) => {
    Modal.confirm({
      title: props.t(
        "Are you sure delete the organization and  from organization"
      ),
      icon: <CiCircleAlert size={20} color="red" />,
      content: "",
      onOk() {
        deleteUser(organizationUser);
      },

      onCancel() {},
      okType: "danger",
    });
  };

  const deleteProcessWarning = (organizationProcess) => {
    Modal.confirm({
      title: props.t("Are you sure delete the process from organization"),
      icon: <CiCircleAlert size={20} color="red" />,
      content: "",
      onOk() {
        deleteProcess(organizationProcess);
      },
      onCancel() {},
      okType: "danger",
    });
  };

  const deleteUser = async (organizationUser) => {
    setLoading(true);
    try {
      const response = await deleteUserFromOrganization(
        organizationUser.organizationId,
        organizationUser.userId
      );
      if (response.status === 200) {
        showMessage("success", "Deleted user from organization");
        setShowOrganizationModal(false);
        setDefaultTabKey("1");
        await showOrganizationInformations(organization);
      } else {
        openErrorNotification(
          "error",
          props.t("Deleting user from organization error"),
          response.data.message
        );
      }
    } catch (err) {
      console.log("Deleting user from organization error : ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProcess = async (organizationProcess) => {
    setLoading(true);
    try {
      const response = await deleteProcessFromOrganization(
        organizationProcess.organizationId,
        organizationProcess.processId
      );
      if (response.status === 200) {
        showMessage("success", "Delete process from organization");
        setShowOrganizationModal(false);
        await showOrganizationInformations(organization);
        setDefaultTabKey("2");
      } else {
        openErrorNotification(
          "error",
          props.t("Deleting process from organization error"),
          response.data.message
        );
      }
    } catch (err) {
      console.log("Deleting process from organization error : ", err);
    } finally {
      setLoading(false);
    }
  };

  const editOrganizaton = () => {
    console.log("editOrganization");
  };

  const handleChangeUsers = (value) => {
    selectedUsersForOrganization = value;
  };

  const handleChangeProcessies = (value) => {
    selectedProcessiesForOrganization = value;
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
              openAddProcessOnOrganization={openAddProcessOnOrganization}
              t={props.t}
              expandedKeys={tableExpandedKeys}
              searchValue={searchValue}
              autoExpandParent={autoExpandParent}
              showOrganizationInformations={showOrganizationInformations}
              editOrganizaton={editOrganizaton}
              deleteOrganization={deleteOrganizationWarning}
              showOrganizationEdit={showOrganizationEdit}
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
          <div>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChangeUsers}
            >
              {availableUsers.map((user, index) => (
                <Option key={user.id} value={user.id}>
                  {user.username}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      <Modal
        title={props.t("Add Process on Organization")}
        open={showAddProcessModal}
        onOk={addProcessOnOrganization}
        onCancel={cancelShowAddProcessModal}
      >
        <div>
          <div className="user-management-divider" />
          <div>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChangeProcessies}
            >
              {availableProcessies.map((process, index) => (
                <Option key={process.id} value={process.id}>
                  {process.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      <Modal
        title={props.t("Organization Information")}
        open={showOrganizationModal}
        onOk={cancelShowOrganizationModal}
        onCancel={cancelShowOrganizationModal}
        width={850}
      >
        <div>
          <div className="user-management-divider" />
          <OrganizationItemCard organization={organization} />
          <div style={{ margin: "20px 10px" }}>
            <Tabs
              defaultActiveKey={defaultTabKey}
              items={showOrganizationTabItems}
            />
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
