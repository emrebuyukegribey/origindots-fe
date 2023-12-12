import { Col, Row } from "antd";

function OrganizationItem({ label, content }) {
  return (
    <Row className="organization-management-show-user-item">
      <Col span={10} className="organization-management-show-user-item-label">
        {label} :
      </Col>
      <Col span={12} className="organization-management-show-user-item-content">
        {content}
      </Col>
    </Row>
  );
}

export default OrganizationItem;
