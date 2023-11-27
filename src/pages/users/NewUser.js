import { Button, Form, Input } from "antd";
import "./NewUser.css";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import RedButtonBorder from "../../components/UI/Buttons/RedButtonBorder";
import SubmitButtonBorder from "../../components/UI/Buttons/SubmitButtonBorder";

function NewUser(props) {
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const onFinish = (values) => {
    console.log("values : ", values);
  };

  return (
    <>
      <h3>Add New User</h3>
      <div className="new-user-divider" />
      <Form onFinish={onFinish}>
        <Form.Item
          label="Ad"
          name="firstName"
          {...formItemLayout}
          rules={[]}
          className="new-user-label"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Soyad"
          name="lastName"
          {...formItemLayout}
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          {...formItemLayout}
          rules={[]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Email" name="email" {...formItemLayout} rules={[]}>
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Parola" name="parola" {...formItemLayout} rules={[]}>
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          label="Parola Tekrar"
          name="parola"
          {...formItemLayout}
          rules={[]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <div className="new-user-button-container">
          <SubmitButtonBorder text="Kaydet" />
          <div style={{ marginRight: "20px" }}>
            <DarkButtonBorder text="Kaydet" onClick={props.submit} />
          </div>
          <div>
            <RedButtonBorder text="Vazgeç" onClick={onFinish} />
          </div>
        </div>
      </Form>
    </>
  );
}

export default NewUser;
