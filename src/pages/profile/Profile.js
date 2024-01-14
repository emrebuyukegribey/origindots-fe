import { useEffect, useState } from "react";
import LeftBar from "../../components/LeftBar/LeftBar";
import Navbar from "../../components/Navbar/Navbar";
import { MainContext, useContext } from "../../context";
import { Form, Image, Input, Switch, Upload } from "antd";
import { withTranslation } from "react-i18next";
import "./Profile.css";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import { HiOutlinePhoto } from "react-icons/hi2";
import {
  getProfilePhoto,
  getUser,
  storeUser,
  updateUser,
  updateUserProfile,
  uploadProfilePhoto,
} from "../../services/http";
import CircleLoading from "../../components/UI/Loading/LoadingBar";
import { MdClose } from "react-icons/md";
import SubmitButtonBorder from "../../components/UI/Buttons/SubmitButtonBorder";
import { useAuth } from "../../contexts/AuthContext";

function Profile(props) {
  const { activeLeftBar } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [picture, setPicture] = useState();
  const [picturePreview, setPicturePreview] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [profilePhotoId, setProfilePhotoId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [fastLogin, setFastLogin] = useState();
  const [fastLoginPassive, setFastLoginPassive] = useState(false);
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);

  const [form] = Form.useForm();

  const auth = useAuth();

  useEffect(() => {
    props.setNavbarHeaderText("Profile");
  });

  useEffect(() => {
    async function loggedUser() {
      await handleLoggedUser();

      if (profilePhoto) {
        setPicturePreview("data:image/png;base64, " + profilePhoto);
      }
    }
    loggedUser();
  }, [firstName, lastName, username]);

  const handleLoggedUser = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      if (response.status === 200) {
        setId(response.data.id);
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setUsername(response.data.username);
        setProfilePhoto(response.data.profilePhotoFile);
        setProfilePhotoId(response.data.profilePhotoId);
        if (response.data.password) {
          setFastLogin(true);
          setPassword(response.data.password);
          setFastLoginPassive(true);
          setShowPassword(false);
        }
      }
    } catch (e) {
      console.log("Error getting logged user : ", e);
    } finally {
      setLoading(false);
    }
  };

  const onChangePicture = (info) => {
    setTimeout(() => {
      let file = info.fileList[0];
      setPicture(file);
      setPicturePreview(file.thumbUrl);
    }, 100);
  };

  const onRemovePicture = () => {
    setPicture(null);
    setPicturePreview(null);
    setProfilePhotoId(null);
  };

  const onChangeFastLogin = (e) => {
    setFastLogin(e);
  };

  const onFinish = async (values) => {
    setLoading(true);
    let uploadedProfilePhotoId;
    try {
      if (picture && picture.originFileObj) {
        const formData = new FormData();
        formData.append("profilePhoto", picture.originFileObj);
        const uploadResponse = await uploadProfilePhoto(formData);
        if (uploadResponse.status === 200) {
          uploadedProfilePhotoId = uploadResponse.data.id;
          setPicturePreview(
            "data:image/png;base64, " + uploadResponse.data.file
          );
        }
      }
    } catch (e) {
      console.log("Uploading profile photo error : ", e);
    }

    const user = {
      id: id,
      profilePhotoId: uploadedProfilePhotoId
        ? uploadedProfilePhotoId
        : profilePhotoId,
      email: email,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password,
    };
    try {
      const response = await updateUserProfile(user);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (e) {
      console.log("Storing user error : ", e);
    } finally {
      setLoading(false);
    }
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  if (loading) {
    return <CircleLoading />;
  }

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
        <div className="profile-header-container">
          <div className="profile-header">Edit Profile</div>
        </div>
        <div className="profile-body">
          <div style={{ maxWidth: "1000px" }}>
            <Form form={form} onFinish={onFinish} className="profile-form">
              <Form.Item
                style={{ width: "100%" }}
                label={props.t("Profile Picture")}
                name="profilePicture"
                {...formItemLayout}
              >
                {!picturePreview && (
                  <Upload
                    maxCount={1}
                    listType="picture-card"
                    name="file"
                    showUploadList={{ showRemoveIcon: true }}
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => onChangePicture(e)}
                  >
                    <div className="profile-image-icon-container">
                      <HiOutlinePhoto className="photo-field-upload-icon" />
                    </div>
                  </Upload>
                )}
                {console.log("picturePreview : ", picturePreview)}
                {picturePreview && (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={picturePreview ? picturePreview : picture}
                      className="profile-image"
                    />
                    <div
                      className="profile-remove-icon-container"
                      onClick={() => onRemovePicture()}
                    >
                      <MdClose className="profile-remove-icon" />
                    </div>
                  </div>
                )}
              </Form.Item>
              <Form.Item
                initialValue={firstName}
                style={{ width: "100%" }}
                label={props.t("First name")}
                name="firstName"
                {...formItemLayout}
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                initialValue={lastName}
                style={{ width: "100%" }}
                label={props.t("Last name")}
                name="lastName"
                {...formItemLayout}
                rules={[{ required: true, message: "Last Name is required" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                initialValue={username}
                style={{ width: "100%" }}
                label={props.t("Username")}
                name="username"
                {...formItemLayout}
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label={props.t("Fast Login")}
                name="fastLogin"
                {...formItemLayout}
              >
                <Switch
                  style={{ marginLeft: "5px" }}
                  checkedChildren="Evet"
                  unCheckedChildren="Hayır"
                  checked={fastLogin}
                  onChange={onChangeFastLogin}
                  disabled={fastLoginPassive}
                />
              </Form.Item>
              {fastLogin && showPassword && (
                <Form.Item
                  // initialValue={password}
                  style={{ width: "100%" }}
                  label={props.t("Password")}
                  name="password"
                  {...formItemLayout}
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password size="large" />
                </Form.Item>
              )}
              {fastLogin && showPassword && (
                <div
                  onClick={() => setShowPassword(false)}
                  className="profile-close-password"
                >
                  Close password
                </div>
              )}
              {fastLogin && !showPassword && (
                <div
                  onClick={() => setShowPassword(true)}
                  className="profile-create-password"
                >
                  Create new password
                </div>
              )}
              {/*
            {fastLogin && (
              <Form.Item
                style={{ width: "100%" }}
                label={props.t("Password Repeat")}
                name="passwordRepeat"
                {...formItemLayout}
                rules={[
                  { required: true, message: "Password repeat is required" },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
            )}
            */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{}}>
                  <SubmitButtonBorder text={props.t("Save")} />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

const ProfileWithTransation = withTranslation()(Profile);
export default ProfileWithTransation;
