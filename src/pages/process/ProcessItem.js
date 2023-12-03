import { Col, Row } from "antd";

function ProcessItem({ label, content }) {
  return (
    <Row className="process-management-show-process-item">
      <Col span={10} className="process-management-show-process-item-label">
        {label} :
      </Col>
      <Col span={12} className="process-management-show-process-item-content">
        {content}
      </Col>
    </Row>
  );
}

export default ProcessItem;
