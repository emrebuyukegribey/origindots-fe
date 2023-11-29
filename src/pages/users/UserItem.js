import { Col, Row } from "antd";

function UserItem({ label, content }) {
  return (
    <Row className="user-management-show-user-item">
      <Col span={8} className="user-management-show-user-item-label">
        {label}
      </Col>
      <Col span={12} className="user-management-show-user-item-content">
        {content}
      </Col>
    </Row>
  );
}

export default UserItem;
