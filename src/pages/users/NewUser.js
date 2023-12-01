import { Form, Input, Radio } from "antd";
import "./NewUser.css";
import SubmitButtonBorder from "../../components/UI/Buttons/SubmitButtonBorder";
import CancelButtonBorder from "../../components/UI/Buttons/CancelButtonBorder";
import { useState } from "react";
import { useEffect } from "react";

function NewUser(props) {
  const [form] = Form.useForm();
  const [active, setActive] = useState(1);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  };

  const onChangeActive = (e) => {
    form.setFieldsValue({ active: e.target.value });
    setActive(e.target.value);
  };

  useEffect(() => {
    const defaultValues = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      username: props.user.username,
      email: props.user.email,
      active: props.user.active === true ? 1 : 2,
    };
    form.setFieldsValue(defaultValues);
  }, []);

  const onFinish = async (values) => {
    const body = {
      id: props.user.id ? props.user.id : null,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      active: values.active == 1 ? true : false,
      password: props.user.password ? props.user.password : values.password,
    };
    props.submit(body);
  };

  return (
    <>
      <h3>
        {props.user && !props.user.id
          ? props.t("Create New User")
          : props.t("Update User")}
      </h3>
      <div className="new-user-divider" />
      <Form form={form} name="new-user" onFinish={onFinish}>
        <Form.Item
          label={props.t("First name")}
          name="firstName"
          value={props.user.firstName ? props.user.firstName : ""}
          {...formItemLayout}
          rules={[{ required: true, message: "First Name is required" }]}
          className="new-user-label"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={props.t("Last Name")}
          name="lastName"
          {...formItemLayout}
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={props.t("Username")}
          name="username"
          {...formItemLayout}
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={props.t("Email")}
          name="email"
          {...formItemLayout}
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label={props.t("Active")}
          name="active"
          initialValue={1}
          {...formItemLayout}
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Radio.Group onChange={onChangeActive} value={active}>
            <Radio value={1}>Yes</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </Form.Item>
        {!props.user.id && (
          <Form.Item
            label={props.t("Password")}
            name="password"
            {...formItemLayout}
            rules={[{ required: true, message: "Password  is required" }]}
          >
            <Input.Password size="large" />
          </Form.Item>
        )}

        <div className="new-user-button-container">
          <div style={{ marginRight: "20px" }}>
            <SubmitButtonBorder text="Kaydet" />
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

export default NewUser;
