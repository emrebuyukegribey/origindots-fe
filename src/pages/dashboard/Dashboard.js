import { Badge, Tag } from "antd";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import { MainContext, useContext } from "../../context";
import "./Dashboard.css";
import DailyRecords from "./DailyRecords";
import DailyShares from "./DailyShares";
import UserNumbers from "./UserNumbers";
import RecordTable from "./RecordTable";
import ShareTable from "./ShareTable";
import UserTable from "./UserTable";
import { Helmet } from "react-helmet";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import { useEffect } from "react";

function Dashboard(props) {
  const { activeLeftBar } = useContext(MainContext);

  useEffect(() => {
    props.setNavbarHeaderText("Dashboard");
  });

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
        <div className="dashboard-container">
          <div className="dashboard-widget-container">
            <DailyRecords />
            <DailyShares />
            <UserNumbers />
          </div>

          <div className="dashboard-table-container">
            <RecordTable />
            <ShareTable />
            <UserTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
