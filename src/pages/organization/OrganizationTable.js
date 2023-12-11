import { Dropdown, Menu, Table } from "antd";
import "./OrganizationTable.css";
import { useEffect } from "react";
import { getOrganizationMenuItems } from "../../util/TableMenu";
import { IoCaretDownOutline } from "react-icons/io5";

interface DataType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  active: string;
  createdDate: string;
}

function OrganizationTable(props) {
  const {
    showOrganizationInformations,
    editOrganizaton,
    deleteOrganization,
    openAddUserOnOrganization,
    openAddProcessOnOrganization,
    showOrganizationEdit,
    t,
  } = props;
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
        <div>{new Date(record.createdDate).toLocaleString()}</div>
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
                {getOrganizationMenuItems({
                  record,
                  showOrganizationInformations,
                  editOrganizaton,
                  deleteOrganization,
                  openAddUserOnOrganization,
                  openAddProcessOnOrganization,
                  showOrganizationEdit,
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
        rowKey={(o) => o.id}
        columns={columns}
        dataSource={props.organizations || []}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}

export default OrganizationTable;
