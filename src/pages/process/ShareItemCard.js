import { Col, DatePicker, Switch } from "antd";
import "./ShareItemCard.css";

function ShareItemCard(props) {
  const onChangeAuthentication = (checked) => {
    props.setShareAuthentication(checked);
  };

  const onChangeLocation = (checked) => {
    props.setShareLocation(checked);
  };

  const onChangeDate = (checked) => {
    props.setShareDate(checked);
  };

  return (
    <>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Col span={16}>
          <div style={{ fontSize: "16px", fontWeight: "400" }}>
            Kimlik doğrulama isteniyor mu?
          </div>
        </Col>
        <Col span={8}>
          <Switch
            style={{ marginLeft: "5px" }}
            checkedChildren="Evet"
            unCheckedChildren="Hayır"
            checked={props.shareAuthentication}
            onChange={onChangeAuthentication}
          />
        </Col>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Col span={16}>
          <div style={{ fontSize: "16px", fontWeight: "400" }}>
            Lokasyon Bilgileri isteniyor mu?
          </div>
        </Col>
        <Col span={8}>
          <Switch
            style={{ marginLeft: "5px" }}
            checkedChildren="Evet"
            unCheckedChildren="Hayır"
            checked={props.shareLocation}
            onChange={onChangeLocation}
          />
        </Col>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Col span={16}>
          <div style={{ fontSize: "16px", fontWeight: "400" }}>
            Süreç paylaşım geçerlilik tarihi var mı?
          </div>
        </Col>
        <Col span={8}>
          <Switch
            style={{ marginLeft: "5px" }}
            checkedChildren="Evet"
            unCheckedChildren="Hayır"
            checked={props.shareDate}
            onChange={onChangeDate}
          />
        </Col>
      </div>
      {props.shareDate && (
        <Col span={18}>
          <div className="share-date-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>Başlangıç tarihi: </div>
              <div style={{ marginRight: "20px" }}>
                <DatePicker />
              </div>
              <div style={{ marginRight: "10px" }}>Bitiş tarihi: </div>
              <div>
                <DatePicker />
              </div>
            </div>
          </div>
        </Col>
      )}
    </>
  );
}

export default ShareItemCard;
