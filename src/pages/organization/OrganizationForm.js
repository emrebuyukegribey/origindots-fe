import { Form, Input, Select, Space } from "antd";
import SubmitButtonBorder from "../../components/UI/Buttons/SubmitButtonBorder";
import CancelButtonBorder from "../../components/UI/Buttons/CancelButtonBorder";

import "./OrganizationForm.css";

function OrganizationForm(props) {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const onFinish = async (values) => {
    const body = {
      id: props.organization.id ? props.organization.id : null,
      name: values.name,
      description: values.description,
      organizationUser: [],
      organizationProcess: [],
    };
    props.submit(body);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const options = [
    {
      label: "China",
      value: "china",
      emoji: "🇨🇳",
      desc: "China (中国)",
    },
    {
      label: "USA",
      value: "usa",
      emoji: "🇺🇸",
      desc: "USA (美国)",
    },
    {
      label: "Japan",
      value: "japan",
      emoji: "🇯🇵",
      desc: "Japan (日本)",
    },
    {
      label: "Korea",
      value: "korea",
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
  ];

  return (
    <>
      <h3>
        {props.organization && !props.organization.id
          ? props.t("Create New Organization")
          : props.t("Update Organization")}
      </h3>
      <div className="organization-form-divider" />
      <Form form={form} name="new-organization" onFinish={onFinish}>
        <Form.Item
          label={props.t("Select Parent Organization")}
          name="Parent Organization"
          value={props.organization.name ? props.organization.name : ""}
          {...formItemLayout}
          className="new-user-label"
        >
          <Select
            size="large"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select one country"
            onChange={handleChange}
            optionLabelProp="label"
            options={options}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </Form.Item>
        <Form.Item
          label={props.t("Organization name")}
          name="name"
          value={props.organization.name ? props.organization.name : ""}
          {...formItemLayout}
          rules={[{ required: true, message: "Organization Name is required" }]}
          className="new-user-label"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={props.t("Organization Description")}
          name="description"
          value={
            props.organization.description ? props.organization.description : ""
          }
          {...formItemLayout}
          {...formItemLayout}
          rules={[
            { required: true, message: "Organization Description is required" },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <div className="organization-form-button-container">
          <div style={{ marginRight: "20px" }}>
            <SubmitButtonBorder text={props.t("Save")} />
          </div>
          <div>
            <CancelButtonBorder
              onClick={props.cancel}
              text={props.t("Cancel")}
            />
          </div>
        </div>
      </Form>
    </>
  );
}

export default OrganizationForm;
