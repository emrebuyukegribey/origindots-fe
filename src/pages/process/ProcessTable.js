import { Table } from "antd";
import "./ProcessTable.css";
import ProcessIcons from "../../components/Process/ProcessIcons";
import { LuCopyPlus } from "react-icons/lu";

interface DataType {
  icon: number;
  type: string;
  type: string;
  createdDate: string;
}

function ProcessTable(props) {
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
      render: (_, record) => (
        <>
          {!record.deleted ? (
            <div style={{ display: "flex" }}>
              <div className="process-table-action-show ">
                <a
                  className="process-table-action-show-link"
                  onClick={() => props.showProcessInformations(record)}
                >
                  {props.t("Show User")}
                </a>
              </div>
              <div className="process-table-action-edit ">
                <a
                  className="process-table-action-edit-link"
                  onClick={() => props.updateProcess(record)}
                >
                  {props.t("Edit")}
                </a>
              </div>
              <div className="process-table-action-delete ">
                <a
                  className="process-table-action-delete-link"
                  onClick={() => {
                    props.deleteProcess(record);
                  }}
                >
                  {props.t("Delete")}
                </a>
              </div>
              <div className="process-table-action-duplicate">
                <a
                  className="process-table-action-duplicate-link"
                  onClick={() => {
                    props.duplicateProcess(record);
                  }}
                >
                  {props.t("Duplicate")}
                </a>
              </div>
            </div>
          ) : (
            <div style={{ color: "red" }}>Deleted</div>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="process-table-container">
      <div style={{ marginBottom: "15px" }}></div>
      <Table
        rowKey={(u) => u.id}
        columns={columns}
        dataSource={props.allProcess.data || []}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
}

export default ProcessTable;
