import { Space, Table } from "antd";
import "./UserTable.css";

interface DataType {
  key: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: string;
}

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
    title: "Is Active?",
    dataIndex: "isActive",
    key: "isActive",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div style={{ display: "flex" }}>
        <div className="user-table-action-invite ">
          <a className="user-table-action-invite-link">Invite </a>
        </div>
        <div className="user-table-action-edit ">
          <a className="user-table-action-edit-link">Edit </a>
        </div>
        <div className="user-table-action-delete ">
          <a className="user-table-action-delete-link">Delete </a>
        </div>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    username: "JohnBrown",
    email: "johnbrown@gmail.com",
    isActive: "Yes",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    username: "JimGreen",
    email: "jimgreen@gmail.com",
    isActive: "No",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    username: "JoeBlack",
    email: "joeblack@gmail.com",
    isActive: "Yes",
  },
];

function UserTable() {
  return (
    <div className="user-table-container">
      <div style={{ marginBottom: "15px" }}>
        <h3>Users Table</h3>
      </div>
      <Table columns={columns} dataSource={data} />;
    </div>
  );
}

export default UserTable;
