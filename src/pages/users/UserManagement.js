import { Input, Modal, message, notification } from "antd";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import { MainContext, useContext } from "../../context";
import "./UserManagementStyles.css";
import { IoSearchOutline } from "react-icons/io5";
import NewUser from "./NewUser";
import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import {
  deleteUser,
  getAllUsersByOwnerUser,
  inviteUser,
} from "../../services/http";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CircleLoading from "../../components/UI/Loading/LoadingBar";
import UserItemCard from "./UserItemCard";
import confirm from "antd/es/modal/confirm";
import { CiCircleAlert } from "react-icons/ci";
import { withTranslation } from "react-i18next";
import PageHeaderMenu from "../../components/UI/PageHeaderMenu";

function UserManagement(props) {
  const { activeLeftBar } = useContext(MainContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (showNewUserForm && !user.id) {
      props.setNavbarHeaderText(props.t("User Management > Create New User"));
    } else if (showNewUserForm && user.id) {
      props.setNavbarHeaderText(props.t("User Management > Edit User"));
    } else if (showUserModal && user.id) {
      props.setNavbarHeaderText(props.t("User Management > User Information"));
    } else {
      props.setNavbarHeaderText(props.t("User Management"));
    }
  });

  const getAllUsers = async () => {
    setLoading(true);
    const usersByOwner = await getAllUsersByOwnerUser();
    setUsers(usersByOwner.data);
    setSearchedUsers(usersByOwner.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const showMessage = (type, content) => {
    setTimeout(() => {
      messageApi.open({
        type: type,
        content: content,
      });
    }, 500);
  };

  const openErrorNotification = (type, message, description) => {
    setTimeout(() => {
      notificationApi[type]({
        message: message,
        description: description,
      });
    }, 500);
  };

  const showUserInformations = (user) => {
    setUser(user);
    setShowUserModal(true);
  };

  const cancelShowUserInformations = () => {
    setUser({});
    setShowUserModal(false);
  };

  const showUserEdit = (user) => {
    setUser(user);
    setShowNewUserForm(true);
  };

  const submitNewUser = async (user) => {
    setUser({});
    try {
      setLoading(true);
      const response = await inviteUser(user);
      if (response.status === 200) {
        navigate("/user-management");
        showMessage(
          "success",
          props.t(user.id ? "Updated user" : "Created new user")
        );
        setShowNewUserForm(false);
      } else {
        openErrorNotification(
          "error",
          props.t("Creating new user error"),
          response.data.message
        );
      }
    } catch (err) {
      openErrorNotification(
        "error",
        props.t("Creating new user error"),
        err.response.data.message
      );
    } finally {
      // setShowNewUserForm(true);
      await getAllUsers();
      setLoading(false);
    }
  };

  const cancelNewUser = () => {
    setUser({});
    setShowNewUserForm(false);
  };

  const handleDeleteUser = async (user) => {
    try {
      setLoading(true);
      const response = await deleteUser(user.id);
      if (response.status === 200) {
        showMessage("error", props.t("Deleted user"));
      } else {
        openErrorNotification(
          "error",
          props.t("Deleting the user error"),
          response.data.message
        );
      }
    } catch (err) {
      openErrorNotification(
        "error",
        props.t("Deleting the user error"),
        err.response.data.message
      );
    } finally {
      setLoading(false);
      // window.location.reload();
      await getAllUsers();
    }
  };

  const deleteUserWarning = (user) => {
    Modal.confirm({
      title: props.t("Are you sure delete the user"),
      icon: <CiCircleAlert size={20} color="red" />,
      content: "",
      onOk() {
        handleDeleteUser(user);
      },

      onCancel() {},
      okType: "danger",
    });
  };

  const searchUsers = (e) => {
    const value = e.target.value;
    const filteredUsers = searchedUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(value.toLowerCase()) ||
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const newUserCreate = () => {
    setUser({});
    setShowNewUserForm(true);
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
        <div className="user-management-container">
          <div className="user-management-header-container">
            {!showNewUserForm && (
              <PageHeaderMenu
                buttonText={props.t("Create User")}
                buttonOnClick={newUserCreate}
                searchOnChange={searchUsers}
                searchPlaceholder={props.t(
                  "Please enter something about the user"
                )}
              />
            )}
          </div>
          {!showNewUserForm && <div className="user-management-divider" />}
          {showNewUserForm ? (
            <div
              className="user-management-new-user"
              style={{ marginLeft: "50px" }}
            >
              <NewUser
                setNavbarHeaderText={props.setNavbarHeaderText}
                submit={submitNewUser}
                cancel={cancelNewUser}
                user={user}
                t={props.t}
              />
            </div>
          ) : (
            <div style={{ marginLeft: "50px" }}>
              <UserTable
                setNavbarHeaderText={props.setNavbarHeaderText}
                users={users}
                submit={submitNewUser}
                cancel={cancelNewUser}
                showUserInformations={showUserInformations}
                showUserEdit={showUserEdit}
                deleteUser={deleteUserWarning}
                t={props.t}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        title={props.t("User Informations")}
        open={showUserModal}
        onOk={cancelShowUserInformations}
        onCancel={cancelShowUserInformations}
      >
        <div>
          <div className="user-management-divider" />
          <UserItemCard user={user} t={props.t} />
        </div>
      </Modal>
    </>
  );
}

const UserManagementWithTranslation = withTranslation()(UserManagement);
export default UserManagementWithTranslation;
