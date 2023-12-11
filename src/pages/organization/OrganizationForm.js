import { Form, Input, Select, Space } from "antd";
import SubmitButtonBorder from "../../components/UI/Buttons/SubmitButtonBorder";
import CancelButtonBorder from "../../components/UI/Buttons/CancelButtonBorder";

import "./OrganizationForm.css";
import { useEffect } from "react";

function OrganizationForm(props) {
  console.log("props : ", props);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  useEffect(() => {
    const defaultValues = {
      name: props.organization.name,
      description: props.organization.description,
    };
    form.setFieldsValue(defaultValues);
  }, []);

  const onFinish = async (values) => {
    const body = {
      id: props.organization.id ? props.organization.id : null,
      name: values.name,
      description: values.description,
      parentId: values.parentId,
      organizationUser: [],
      organizationProcess: [],
    };
    props.submit(body);
  };

  function flattenOrganizations(orgs) {
    let flatList = [];
    orgs.forEach((org) => {
      flatList.push({ id: org.id, name: org.name });
      if (org.children) {
        flatList = flatList.concat(flattenOrganizations(org.children));
      }
    });
    return flatList;
  }

  const options =
    flattenOrganizations(props.organizations)
      .filter((org) => org.id !== props.organization.id)
      .map((org) => ({
        label: org.name,
        value: org.id,
      })) || [];

  useEffect(() => {
    props.setNavbarHeaderText("Organization Management > New Organization");
  });

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
          name="parentId"
          value={props.organization.name ? props.organization.name : ""}
          {...formItemLayout}
          className="new-user-label"
        >
          <Select
            size="large"
            mode="single"
            style={{ width: "100%" }}
            placeholder="Please select parent organization"
            optionLabelProp="label"
            options={options}
            optionRender={(option) => <Space>{option.data.desc}</Space>}
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
