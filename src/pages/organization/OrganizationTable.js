import { Table } from "antd";
import "./OrganizationTable.css";
import { useEffect } from "react";

interface DataType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  active: string;
  createdDate: string;
}

function OrganizationTable(props) {
  const columns: ColumnsType<DataType> = [
    {
      title: props.t("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: props.t("Description"),
      dataIndex: "description",
      key: "description",
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
              // onClick={() => props.showUserInformations(record)}
            >
              {props.t("Show User")}
            </a>
          </div>
          <div className="user-table-action-edit ">
            <a
              className="user-table-action-edit-link"
              // onClick={() => props.showUserEdit(record)}
            >
              {props.t("Edit")}
            </a>
          </div>
          <div className="organization-table-action-delete ">
            <a
              className="organization-table-action-delete-link"
              onClick={() => {
                // props.deleteUser(record);
              }}
            >
              {props.t("Delete")}
            </a>
          </div>
          <div className="organization-table-action-addUser ">
            <a
              className="organization-table-action-addUser-link"
              onClick={() => {
                props.openAddUserOnOrganization(record);
              }}
            >
              {props.t("Add User")}
            </a>
          </div>
        </div>
      ),
    },
  ];

  function assignKeys(nodes, key) {
    let counter = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].parentId === null) {
        nodes[i].key = `${counter}`;
        counter++;
      } else {
        nodes[i].key = `${key}-${counter}`;
        counter++;
      }
      if (nodes[i].children && nodes[i].children.length > 0) {
        assignKeys(nodes[i].children, nodes[i].key);
      }
    }
  }

  useEffect(() => {
    assignKeys(props.organizations, null);
  }, []);

  useEffect(() => {
    props.setNavbarHeaderText("Organization Management > Organizations");
  }, []);

  return (
    <div className="organization-table-container">
      <div style={{ marginBottom: "15px" }}></div>
      <Table
        rowKey={(u) => u.id}
        columns={columns}
        dataSource={props.organizations || []}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}

export default OrganizationTable;
