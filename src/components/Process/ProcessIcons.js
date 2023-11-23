import { BsCardList, BsListCheck } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { GoTasklist } from "react-icons/go";
import { RiFileList3Line, RiListSettingsLine } from "react-icons/ri";
import { PiListPlusBold } from "react-icons/pi";

const ProcessIcons = [
  { id: 1, name: "Card List Proces Icon", icon: <BsCardList /> },
  { id: 2, name: "List Check Process Icon", icon: <BsListCheck /> },
  { id: 3, name: "View List Process Icon", icon: <CiViewList /> },
  { id: 4, name: "Task List Process Icon", icon: <GoTasklist /> },
  {
    id: 5,
    name: "Task List Process Icon",
    icon: <RiFileList3Line />,
  },
  {
    id: 6,
    name: "Settings List Process Icon",
    icon: <RiListSettingsLine />,
  },
  {
    id: 7,
    name: "Plus List Bold Process Icon",
    icon: <PiListPlusBold />,
  },
];

export default ProcessIcons;
