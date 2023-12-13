import { Badge, Tag } from "antd";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import { MainContext, useContext } from "../../context";
import "./Dashboard.css";
import MapBoard from "./MapBoard";
import DailyRecords from "./DailyRecords";
import DailyShares from "./DailyShares";
import UserNumbers from "./UserNumbers";
import RecordTable from "./RecordTable";
import ShareTable from "./ShareTable";
import UserTable from "./UserTable";
import { Helmet } from "react-helmet";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import { useEffect } from "react";
import { Tabs, Input, Row, Col } from 'antd';
import { SearchOutlined, AppstoreAddOutlined, EnterOutlined, FilterOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip} from 'antd';
import { Switch, Space } from 'antd';
function Dashboard(props) {
  const { activeLeftBar } = useContext(MainContext);
  const items = [
    {
      key: '1',
      label: 'Harita',
      children: <MapBoard />,
    },
    {
      key: '2',
      label: 'Listeler',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Grafikler',
      children: 'Content of Tab Pane 3',
    }
  ];
  useEffect(() => {
    props.setNavbarHeaderText("Dashboard");
  });

  const onChange = (key) => {
    console.log(key);
  };


  return (
    <>
      <Navbar />
      <LeftBar />
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        <div className="dashboard-container">
          <div className="dashboard-toolbar">
            <Row >
              <Col span={8}><Input placeholder="Hızlı Arama" /></Col>
              <Col span={16}>
                <Button icon={<EnterOutlined />} style={{ marginLeft: '5px' }} />
                <Button type="dashed" style={{ marginLeft: '5px' }} icon={<FilterOutlined />}>
                  Arama Filitreleri
                </Button>
                <Button type="dashed" style={{ marginLeft: '5px' }} icon={<SearchOutlined />}>
                  Adres Bul
                </Button>
                <Button type="dashed" style={{ marginLeft: '5px' }} icon={<AppstoreAddOutlined />}>
                  Yeni Kayıt
                </Button>
                
                <Switch style={{ marginLeft: '5px' }} checkedChildren="Mobil Kullanıcıları Gizle" unCheckedChildren="Mobil Kullanıcıları Göster"  />
                <Switch style={{ marginLeft: '5px' }} checkedChildren="Süreçleri Gizle" unCheckedChildren="Süreçleri Göster"  />
                <Switch style={{ marginLeft: '5px' }} checkedChildren="Paylaşımları Gizle" unCheckedChildren="Paylaşımları Göster"  />

              </Col>
            </Row>
          </div>
          <Tabs
            className="dashboard-tab-container"
            size="large"
            tabPosition='right'
            defaultActiveKey="1"
            items={items}
            onChange={onChange} />
          {/*
          <div className="dashboard-widget-container">
            <DailyRecords />
            <DailyShares />
            <UserNumbers />
          </div>

          <div className="dashboard-table-container">
            <RecordTable />
            <ShareTable />
            <UserTable />
          </div>
      */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
