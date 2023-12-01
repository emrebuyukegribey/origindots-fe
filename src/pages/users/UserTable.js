import { Table } from "antd";
import "./UserTable.css";
import { useEffect } from "react";

interface DataType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  active: string;
  createdDate: string;
}

function UserTable(props) {
  const columns: ColumnsType<DataType> = [
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
            justifyContent: "center",
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
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <div className="user-table-action-invite ">
            <a
              className="user-table-action-invite-link"
              onClick={() => props.showUserInformations(record)}
            >
              {props.t("Show User")}
            </a>
          </div>
          <div className="user-table-action-edit ">
            <a
              className="user-table-action-edit-link"
              onClick={() => props.showUserEdit(record)}
            >
              {props.t("Edit")}
            </a>
          </div>
          <div className="user-table-action-delete ">
            <a
              className="user-table-action-delete-link"
              onClick={() => {
                props.deleteUser(record);
              }}
            >
              {props.t("Delete")}
            </a>
          </div>
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
