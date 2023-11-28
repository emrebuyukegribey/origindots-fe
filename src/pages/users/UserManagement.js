import { Input } from "antd";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import { MainContext, useContext } from "../../context";
import "./UserManagementStyles.css";
import { IoSearchOutline } from "react-icons/io5";
import NewUser from "./NewUser";
import { useState } from "react";
import UserTable from "./UserTable";

function UserManagement() {
  const { activeLeftBar, setNavbarHeaderText } = useContext(MainContext);
  setNavbarHeaderText("User Management");

  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const submitNewUser = () => {
    setShowNewUserForm(false);
  };

  const cancelNewUser = () => {
    setShowNewUserForm(false);
  };

  return (
    <>
      <Navbar />
      <LeftBar />
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
              <UserTable submit={submitNewUser} cancel={cancelNewUser} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserManagement;
