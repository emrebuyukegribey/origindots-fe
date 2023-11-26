import { TbClockRecord } from "react-icons/tb";
import ReactApexChart from "react-apexcharts";
import "./DailyRecords.css";

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

function DailyRecords() {
  return (
    <div className="daily-record-widget">
      <div className="daily-record-widget-top-container">
        <div className="daily-record-widget-icon">
          <TbClockRecord style={{ fontSize: "40px" }} />
        </div>
        <div className="daily-record-widget-header">Records of the day</div>
      </div>
      <div className="daily-record-widget-content-container">
        <div className="daily-record-widget-content-chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
          />
        </div>
        <div className="daily-record-widget-content-tag-container">
          <div className="daily-record-widget-content-tag">
            <div className="daily-record-widget-content-tag-total">
              Total: 30
            </div>
          </div>
          <div className="daily-record-widget-content-tag">
            <div className="daily-record-widget-content-tag-orange-dot" />
            <div style={{ color: "#ff8a95", marginLeft: "10px" }}>
              Waiting: 12
            </div>
          </div>
          <div className="daily-record-widget-content-tag">
            <div className="daily-record-widget-content-tag-green-dot" />
            <div style={{ color: "#83d9d2", marginLeft: "10px" }}>
              Completed: 18
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyRecords;
