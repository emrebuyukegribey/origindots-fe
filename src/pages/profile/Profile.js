import { useEffect } from "react";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import { MainContext, useContext } from "../../context";
import { Form, Input, Upload } from "antd";
import { withTranslation } from "react-i18next";
import "./Profile.css";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import { HiOutlinePhoto } from "react-icons/hi2";

function Profile(props) {
  const { activeLeftBar } = useContext(MainContext);

  const [form] = Form.useForm();

  useEffect(() => {
    props.setNavbarHeaderText("Profile");
  });

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  console.log("props : ", props);
  return (
    <>
      <Navbar />
      <LeftBar />
      <div
        className="right-container"
        style={{
          width: activeLeftBar ? "calc(100% - 275px)" : "calc(100% - 70px)",
          marginLeft: activeLeftBar ? "275px" : "70px",
        }}
      >
        <div className="profile-body">
          <div className="profile-header-container">
            <div className="profile-header">Edit Profile</div>
          </div>
          <Form className="profile-form">
            <Form.Item
              style={{ width: "100%" }}
              label={props.t("Profile Picture")}
              name="profilePicture"
              {...formItemLayout}
            >
              <Upload
                maxCount={1}
                listType="picture-card"
                name="file"
                showUploadList={{ showRemoveIcon: true }}
                accept=".png, .jpg, .jpeg"
                beforeUpload={() => false}
                //onChange={(e) => onChange(e)}
                /// onRemove={(e) => fileRemoved(e)}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="profile-image-container">
                    <HiOutlinePhoto className="photo-field-upload-icon" />
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label={props.t("First name")}
              name="firstName"
              {...formItemLayout}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label={props.t("Last name")}
              name="lastName"
              {...formItemLayout}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label={props.t("Username")}
              name="username"
              {...formItemLayout}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label={props.t("Password")}
              name="password"
              {...formItemLayout}
            >
              <Input.Password size="large" />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              label={props.t("Password Repeat")}
              name="passwordRepeat"
              {...formItemLayout}
            >
              <Input.Password size="large" />
            </Form.Item>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ width: "150px" }}>
                <DarkButtonBorder text={props.t("Save")} />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

const ProfileWithTransation = withTranslation()(Profile);
export default ProfileWithTransation;
