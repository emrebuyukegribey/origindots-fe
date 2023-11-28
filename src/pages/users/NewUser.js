import { Button, Form, Input } from "antd";
import "./NewUser.css";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import RedButtonBorder from "../../components/UI/Buttons/RedButtonBorder";
import SubmitButtonBorder from "../../components/UI/Buttons/SubmitButtonBorder";
import CancelButtonBorder from "../../components/UI/Buttons/CancelButtonBorder";
import { MainContext, useContext } from "../../context";
import { useState } from "react";
import { useEffect } from "react";

function NewUser(props) {
  const { activeLeftBar, setNavbarHeaderText } = useContext(MainContext);
  setNavbarHeaderText("User Management > Create New User");

  const [isPasswordMatch, setPasswordMatch] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const password = form.getFieldValue("password");
    const passwordRepeat = form.getFieldValue("passwordRepeat");

    setPasswordMatch(password === passwordRepeat);
  }, [isPasswordMatch]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  };

  const onFinish = (values) => {
    if (values.password !== values.passwordRepeat) {
      setPasswordMatch(false);
      return;
    }
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
    };
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
          label="Parola"
          name="password"
          {...formItemLayout}
          rules={[{ required: true, message: "Password  is required" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Parola Tekrar"
          name="passwordRepeat"
          {...formItemLayout}
          rules={[
            {
              required: isPasswordMatch,
              message: "Password fields does not match",
            },
          ]}
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
