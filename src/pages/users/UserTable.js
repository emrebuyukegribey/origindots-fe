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
      title: "First Name",
      dataIndex: "firstName",
      key: "firsname",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <div className="user-table-isActive-container">
          <div
            className="user-table-isActive"
            style={{
              color: record.active ? "#18bd5b" : "#f45c52",
            }}
          >
            {record.active === true ? "yes" : "no"}
          </div>
        </div>
      ),
    },
    {
      title: "Created Date",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <div className="user-table-action-invite ">
            <a
              className="user-table-action-invite-link"
              onClick={() => props.showUserInformations(record)}
            >
              Show User
            </a>
          </div>
          <div className="user-table-action-edit ">
            <a
              className="user-table-action-edit-link"
              onClick={() => props.showUserEdit(record)}
            >
              Edit{" "}
            </a>
          </div>
          <div className="user-table-action-delete ">
            <a
              className="user-table-action-delete-link"
              onClick={() => {
                props.deleteUser(record);
              }}
            >
              Delete{" "}
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
