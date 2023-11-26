import { TbClockRecord, TbShare, TbUser, TbUsers } from "react-icons/tb";
import "./UserTable.css";
import { Space, Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    firstName: "John",
    lastName: "Brown",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "5",
    firstName: "Jim",
    lastName: "Green",
    address: "London No. 1 Lake Park",
  },
];

function UserTable() {
  return (
    <div style={{ marginRight: "40px" }}>
      <div className="user-table-header-container">
        <div>
          <TbUsers className="user-table-header-icon" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="user-table-header-text">User Table</div>
          <a href="#" style={{ fontSize: "14px" }}>
            Show All
          </a>
        </div>
      </div>
      <Table dataSource={data}>
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <div>
              <a style={{ color: "" }}>Add</a>
              <a>Delete</a>
            </div>
          )}
        />
      </Table>
    </div>
  );
}

export default UserTable;
