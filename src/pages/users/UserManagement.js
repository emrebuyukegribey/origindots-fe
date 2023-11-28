import { Input, message, notification } from "antd";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import { MainContext, useContext } from "../../context";
import "./UserManagementStyles.css";
import { IoSearchOutline } from "react-icons/io5";
import NewUser from "./NewUser";
import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { getAllUsersByOwnerUser, inviteUser } from "../../services/http";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserManagement() {
  const { activeLeftBar, setNavbarHeaderText } = useContext(MainContext);
  setNavbarHeaderText("User Management");

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    const usersByOwner = await getAllUsersByOwnerUser(user.sub);
    setUsers(usersByOwner);
  };

  getAllUsers();

  useEffect(() => {}, [users]);

  const showMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const openErrorNotification = (type, message, description) => {
    notificationApi[type]({
      message: message,
      description: description,
    });
  };

  const submitNewUser = async (user) => {
    try {
      const response = await inviteUser(user);
      console.log("response : ", response);
      if (response.status === 200) {
        navigate("/user-management");
        showMessage("success", "Created new user");
        setShowNewUserForm(false);
      } else {
        openErrorNotification("error", "Creating new user error", "asdasdad");
      }
    } catch (err) {
      openErrorNotification(
        "error",
        "Creating new user error",
        err.response.data.message
      );
      setShowNewUserForm(true);
    }
  };

  const cancelNewUser = () => {
    setShowNewUserForm(false);
  };

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
              <div className="user-management-menu-container">
                <div style={{ marginRight: "40px" }}>
                  <DarkButtonBorder
                    text="Create User"
                    onClick={() => {
                      setShowNewUserForm(true);
                    }}
                  />
                </div>
                <div class="user-management-menu-search-container">
                  <Input
                    className="user-management-menu-search-input"
                    placeholder="Please enter name, email or anythink of user"
                  />
                  <div className="user-management-menu-search-icon-container">
                    <IoSearchOutline className="user-management-menu-search-icon" />
                  </div>
                </div>
              </div>
            )}
          </div>
          {!showNewUserForm && <div class="user-management-divider" />}
          {showNewUserForm ? (
            <div
              className="user-management-new-user"
              style={{ marginLeft: "50px" }}
            >
              <NewUser submit={submitNewUser} cancel={cancelNewUser} />
            </div>
          ) : (
            <div style={{ marginLeft: "50px" }}>
              <UserTable
                users={users}
                submit={submitNewUser}
                cancel={cancelNewUser}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserManagement;
