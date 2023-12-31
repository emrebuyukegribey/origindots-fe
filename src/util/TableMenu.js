import { Menu } from "antd";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import {
  IoDuplicateOutline,
  IoFlagSharp,
  IoShareSocialOutline,
} from "react-icons/io5";
import "./TableMenu.css";
import { MdPostAdd } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { IoMdShareAlt } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";

export const getProcessMenuItems = ({
  record,
  showProcessInformations,
  updateProcess,
  deleteProcess,
  duplicateProcess,
  shareProcess,
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

  items.push(
    <Menu.Item key="share">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <LuShare2 />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              shareProcess(record);
            }}
          >
            {t("Share")}
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
  showOrganizationInformations,
  deleteOrganization,
  openAddUserOnOrganization,
  openAddProcessOnOrganization,
  showOrganizationEdit,
  t,
}) => {
  const items = [];

  items.push(
    <Menu.Item key="showOrganization">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineEye />
        </div>
        <div className="menu-item-link">
          <a onClick={() => showOrganizationInformations(record)}>
            {t("Show User")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="editOrganization">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <BiSolidEdit />
        </div>
        <div className="menu-item-link">
          <a onClick={() => showOrganizationEdit(record)}>{t("Edit")}</a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="deleteOrganization">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <AiOutlineDelete />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              deleteOrganization(record);
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
    <Menu.Item key="addUserOrganization">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <FiUserPlus />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              openAddUserOnOrganization(record);
            }}
          >
            {t("Add User")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  items.push(
    <Menu.Item key="addProcessOrganization">
      <div className="menu-item-container">
        <div className="menu-item-icon">
          <MdPostAdd />
        </div>
        <div className="menu-item-link">
          <a
            onClick={() => {
              openAddProcessOnOrganization(record);
            }}
          >
            {t("Add Process")}
          </a>
        </div>
      </div>
    </Menu.Item>
  );

  return items;
};
