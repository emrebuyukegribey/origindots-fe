import { Col, DatePicker, Radio, Switch } from "antd";
import "./ShareItemCard.css";

import moment from "moment";
import { useState } from "react";

function ShareItemCard(props) {
  const [locationType, setLocationType] = useState(1);

  const onChangeAuthentication = (checked) => {
    props.setShareAuthentication(checked);
  };

  const onChangeLocation = (checked) => {
    props.setShareLocation(checked);
  };

  const onChangeLocationType = (e) => {
    const value = e.target.value;

    props.setShareLocationType(value);
  };

  const onChangeDate = (checked) => {
    props.setShareDate(checked);
  };

  const onChangeStartDate = (date, dateString) => {
    props.setShareStartDate(dateString);
  };

  const onChangeEndDate = (date, dateString) => {
    props.setShareEndDate(dateString);
  };

  const disabledStartDate = (current) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  };

  const disabledEndDate = (current) => {
    let customDate = moment().format("YYYY-MM-DD");
    const date = moment(props.shareStartDate, "YYYY-MM-DD");
    return props.shareStartDate
      ? current && current < date
      : current && current < moment(customDate, "YYYY-MM-DD");
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
      {props.shareLocation && (
        <Col span={18}>
          <div className="share-location-container">
            <Radio.Group
              onChange={onChangeLocationType}
              value={props.shareLocationType}
            >
              <Radio value={1}>Belirli noktalar</Radio>
              <Radio value={2}>Kullanıcı belirleyecek</Radio>
            </Radio.Group>
          </div>
        </Col>
      )}
      {props.shareLocation && props.shareLocationType === 1 && (
        <div className="share-location-map-container">Harita burada olacak</div>
      )}
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
                <DatePicker
                  value={
                    props.shareStartDate ? moment(props.shareStartDate) : ""
                  }
                  disabledDate={disabledStartDate}
                  onChange={onChangeStartDate}
                />
              </div>
              <div style={{ marginRight: "10px" }}>Bitiş tarihi: </div>
              <div>
                <DatePicker
                  value={props.shareEndDate ? moment(props.shareEndDate) : ""}
                  disabledDate={disabledEndDate}
                  onChange={onChangeEndDate}
                />
              </div>
            </div>
          </div>
        </Col>
      )}
    </>
  );
}

export default ShareItemCard;
