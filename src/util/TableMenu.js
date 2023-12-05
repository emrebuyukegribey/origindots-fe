import { Menu } from "antd";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoDuplicateOutline } from "react-icons/io5";
import "./TableMenu.css";

export const getProcessMenuItems = ({
  record,
  showProcessInformations,
  updateProcess,
  deleteProcess,
  duplicateProcess,
  t,
}) => {
  const items = [];

  items.push(
    <Menu.Item key="show">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineEye />
        </div>
        <div className="menu-item-link">
          <a onClick={() => showProcessInformations(record)}>
            {t("Show User")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="edit">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <BiSolidEdit />
        </div>
        <div className="menu-item-link">
          <a onClick={() => updateProcess(record)}>{t("Edit")}</a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="delete">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineDelete />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              deleteProcess(record);
            }}
          >
            {t("Delete")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <div key="divider" style={{ borderBottom: "1px solid #dddde3" }}></div>
  );

  items.push(
    <Menu.Item key="duplicate">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <IoDuplicateOutline />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              duplicateProcess(record);
            }}
          >
            {t("Duplicate")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  return items;
};

export const getUserMenuItems = ({
  record,
  showUserInformations,
  showUserEdit,
  deleteUser,
  t,
}) => {
  const items = [];
  items.push(
    <Menu.Item key="show">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineEye />
        </div>
        <div className="menu-item-link">
          <a onClick={() => showUserInformations(record)}>{t("Show User")}</a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="edit">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <BiSolidEdit />
        </div>
        <div className="menu-item-link">
          <a onClick={() => showUserEdit(record)}>{t("Edit")}</a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="delete">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineDelete />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              deleteUser(record);
            }}
          >
            {t("Delete")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );
  return items;
};

export const getOrganizationMenuItems = ({
  record,
  showProcessInformations,
  updateProcess,
  deleteProcess,
  duplicateProcess,
  t,
}) => {
  const items = [];

  items.push(
    <Menu.Item key="show">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineEye />
        </div>
        <div className="menu-item-link">
          <a onClick={() => showProcessInformations(record)}>
            {t("Show User")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="edit">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <BiSolidEdit />
        </div>
        <div className="menu-item-link">
          <a onClick={() => updateProcess(record)}>{t("Edit")}</a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="delete">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineDelete />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              deleteProcess(record);
            }}
          >
            {t("Delete")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(<div style={{ borderBottom: "1px solid #dddde3" }}></div>);

  items.push(
    <Menu.Item key="duplicate">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <IoDuplicateOutline />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              duplicateProcess(record);
            }}
          >
            {t("Duplicate")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  return items;
};
