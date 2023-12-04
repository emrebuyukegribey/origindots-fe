import { withTranslation } from "react-i18next";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import PageHeaderMenu from "../../components/UI/PageHeaderMenu";
import { MainContext, useContext } from "../../context";
import "./OrganizationManagementStyles.css";
import { useState } from "react";
import { Modal, message, notification } from "antd";
import OrganizationForm from "./OrganizationForm";
import CircleLoading from "../../components/UI/Loading/LoadingBar";
import {
  getAllOrganizationsByOwner,
  storeOrganization,
} from "../../services/http";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import OrganizationTable from "./OrganizationTable";
import { useEffect } from "react";

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

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [organizationUsers, setOrganizationUsers] = useState([]);

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

  const getAllOrganizations = async () => {
    try {
      const response = await getAllOrganizationsByOwner();
      if (response.status === 200) {
        // navigate("/organization-management");
        setShowOrganizationForm(false);
        setOrganizations(response.data);
      } else {
        openErrorNotification(
          "error",
          props.t("Creating new organization error"),
          response.data.message
        );
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    getAllOrganizations();
  }, []);

  const addUserOnOrganizaiton = () => {
    console.log("organization : ", organization);
    console.log("addUserOnOrganizaiton");
  };

  const openAddUserOnOrganization = () => {
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
                // searchOnChange={searchUsers}
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
            <div style={{ marginLeft: "50px" }}>
              <OrganizationTable
                setNavbarHeaderText={props.setNavbarHeaderText}
                organizations={organizations}
                openAddUserOnOrganization={openAddUserOnOrganization}
                t={props.t}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        title={props.t("Add User on Organization")}
        open={showAddUserModal}
        onOk={addUserOnOrganizaiton}
        onCancel={cancelShowAddUserModal}
      >
        <div>
          <div className="user-management-divider" />
          <div>Add User</div>
        </div>
      </Modal>
    </>
  );
}

const OrganizationManagementWithTranslation = withTranslation()(
  OrganizationManagement
);
export default OrganizationManagementWithTranslation;
