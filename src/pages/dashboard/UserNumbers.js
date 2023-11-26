import { TbShare, TbUser, TbUsers, TbUsersGroup } from "react-icons/tb";
import ReactApexChart from "react-apexcharts";
import "./UserNumbers.css";

const chartData = {
  series: [12, 18],
  options: {
    chart: { type: "donut" },
    legend: { show: false },
    tooltip: { enabled: false },
    fill: { colors: ["#ff8a95", "#83d9d2"] },
    states: {
      hover: { filter: { type: "lighten", value: 0.2 } },
      active: { filter: { type: "none", value: 0 } },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: { show: false },
            total: {
              show: true,
              showAlways: true,
            },
          },
        },
      },
    },
  },
};

function UserNumbers() {
  return (
    <div className="user-number-widget">
      <div className="user-number-widget-top-container">
        <div className="user-number-widget-icon">
          <TbUsers style={{ fontSize: "40px" }} />
        </div>
        <div className="user-number-widget-header">Number of users</div>
      </div>
      <div className="user-number-widget-content-container">
        <div className="user-number-widget-content-chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
          />
        </div>
        <div className="user-number-widget-content-tag-container">
          <div className="user-number-widget-content-tag">
            <div className="user-number-widget-content-tag-total">
              Total: 30
            </div>
          </div>
          <div className="user-number-widget-content-tag">
            <div className="user-number-widget-content-tag-orange-dot" />
            <div style={{ color: "#ff8a95", marginLeft: "10px" }}>
              Offline: 12
            </div>
          </div>
          <div className="user-number-widget-content-tag">
            <div className="user-number-widget-content-tag-green-dot" />
            <div style={{ color: "#83d9d2", marginLeft: "10px" }}>
              Online: 18
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNumbers;
