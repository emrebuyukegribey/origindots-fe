import { Dropdown, Menu, Table } from "antd";
import "./UserTable.css";
import { useEffect } from "react";
import { getProcessMenuItems, getUserMenuItems } from "../../util/TableMenu";
import { IoCaretDownOutline } from "react-icons/io5";

interface DataType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  active: string;
  createdDate: string;
}

function UserTable(props) {
  const { showUserInformations, showUserEdit, deleteUser, t } = props;

  const columns: ColumnsType<DataType> = [
    {
      title: props.t(""),
      dataIndex: "profilePhoto",
      key: "profilePhoto",
      render: (text, record) => (
        <div className="user-table-isActive-container">
          {console.log("record : ", record)}
          <div
            className="user-table-isActive"
            style={{
              backgroundColor: record.active ? "#18bd5b" : "#f45c52",
              color: "#fff",
            }}
          >
            {record.active === true ? props.t("YES") : props.t("NO")}
          </div>
        </div>
      ),
    },
    {
      title: props.t("First Name"),
      dataIndex: "firstName",
      key: "firsname",
    },
    {
      title: props.t("Last Name"),
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: props.t("Username"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: props.t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: props.t("Active"),
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <div className="user-table-isActive-container">
          <div
            className="user-table-isActive"
            style={{
              backgroundColor: record.active ? "#18bd5b" : "#f45c52",
              color: "#fff",
            }}
          >
            {record.active === true ? props.t("YES") : props.t("NO")}
          </div>
        </div>
      ),
    },
    {
      title: props.t("Created Date"),
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {new Date(record.createdDate).toLocaleString()}
        </div>
      ),
    },

    {
      title: props.t("Actions"),
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <Dropdown
            overlay={
              <Menu>
                {getUserMenuItems({
                  record,
                  showUserInformations,
                  showUserEdit,
                  deleteUser,
                  t,
                })}
              </Menu>
            }
          >
            <div
              onClick={(e) => e.preventDefault()}
              className="process-table-menu"
            >
              <div className="process-table-menu-text">
                {props.t("Actions")}
              </div>{" "}
              <div className="process-table-menu-icon">
                <IoCaretDownOutline />
              </div>
            </div>
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    props.setNavbarHeaderText("User Management > Users");
  });

  return (
    <div className="user-table-container">
      <div style={{ marginBottom: "15px" }}></div>
      <Table
        rowKey={(u) => u.id}
        columns={columns}
        dataSource={props.users || []}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}

export default UserTable;
