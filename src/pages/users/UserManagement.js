import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import { MainContext, useContext } from "../../context";
import "./UserManagementStyles.css";

function UserManagement() {
  const { activeLeftBar, setNavbarHeaderText } = useContext(MainContext);
  setNavbarHeaderText("User Management");

  return (
    <>
      <Navbar />
      <LeftBar />
      <div>
        <div>User Management</div>
      </div>
    </>
  );
}

export default UserManagement;
