import { Form, Input, Radio } from "antd";
import "./NewUser.css";
import SubmitButtonBorder from "../../components/UI/Buttons/SubmitButtonBorder";
import CancelButtonBorder from "../../components/UI/Buttons/CancelButtonBorder";
import { useState } from "react";
import { useEffect } from "react";

function NewUser(props) {
  const [form] = Form.useForm();
  const [active, setActive] = useState(1);

  useEffect(() => {
    props.setNavbarHeaderText("User Management > Create New User");
  });

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  };

  const onChangeActive = (e) => {
    form.setFieldsValue({ active: e.target.value });
    setActive(e.target.value);
  };

  const onFinish = async (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      active: values.active == 1 ? true : false,
      password: values.password,
    };
    props.submit(user);
    window.location.reload();
  };

  return (
    <>
      <h3>Create New User</h3>
      <div className="new-user-divider" />
      <Form form={form} name="new-user" onFinish={onFinish}>
        <Form.Item
          label="Ad"
          name="firstName"
          {...formItemLayout}
          rules={[{ required: true, message: "First Name is required" }]}
          className="new-user-label"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Soyad"
          name="lastName"
          {...formItemLayout}
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          {...formItemLayout}
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          {...formItemLayout}
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Active"
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
        <Form.Item
          label="Parola"
          name="password"
          {...formItemLayout}
          rules={[{ required: true, message: "Password  is required" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <div className="new-user-button-container">
          <div style={{ marginRight: "20px" }}>
            <SubmitButtonBorder text="Kaydet" />
          </div>
          <div>
            <CancelButtonBorder onClick={props.cancel} text="Cancel" />
          </div>
        </div>
      </Form>
    </>
  );
}

export default NewUser;
