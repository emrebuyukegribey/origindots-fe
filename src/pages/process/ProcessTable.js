import { Dropdown, Menu, Space, Table } from "antd";
import "./ProcessTable.css";
import ProcessIcons from "../../components/Process/ProcessIcons";
import { LuCopyPlus } from "react-icons/lu";
import { getProcessMenuItems } from "../../util/TableMenu";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { IoCaretDownOutline } from "react-icons/io5";

interface DataType {
  icon: number;
  type: string;
  type: string;
  createdDate: string;
}

function ProcessTable(props) {
  const {
    showProcessInformations,
    updateProcess,
    deleteProcess,
    duplicateProcess,
    shareProcess,
    t,
  } = props;
  const columns: ColumnsType<DataType> = [
    {
      title: props.t(""),
      dataIndex: "icon",
      key: "icon",
      render: (text, record) => (
        <div className="process-table-icon-container">
          {
            ProcessIcons.filter((icon) => icon.id === Number(record.icon))[0]
              .icon
          }
        </div>
      ),
    },
    {
      title: props.t("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: props.t("Type"),
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <div>
          {record.type === "STATIC_LOCATION"
            ? "Static Location"
            : "Dynamic Location"}
        </div>
      ),
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
              <Menu key={record.id}>
                {getProcessMenuItems({
                  record,
                  showProcessInformations,
                  updateProcess,
                  deleteProcess,
                  duplicateProcess,
                  shareProcess,
                  t,
                })}
              </Menu>
            }
          >
            <div
              key={record.id}
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

  return (
    <div className="process-table-container">
      <div style={{ marginBottom: "15px" }}></div>
      <Table
        rowKey={(p) => p.id}
        columns={columns}
        dataSource={props.allProcess || []}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}

export default ProcessTable;
