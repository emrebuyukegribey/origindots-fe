import { Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Logo from "../../../assets/logo-white.png";
import DarkButton from "../../../components/UI/Buttons/DarkButton";
import BackButton from "../../../components/UI/Buttons/BackButton";

import CircleLoading from "../../../components/UI/Loading/LoadingBar";
import { registerUser } from "../../../services/http";
import LoginScreen from "../login/LoginScreen";
import "./RegisterScreen.css";
import DarkButtonBorder from "../../../components/UI/Buttons/DarkButtonBorder";
import GoogleIcon from "../../../assets/icons/google.svg";
import FacebookIcon from "../../../assets/icons/facebook.svg";
import TwitterXIcon from "../../../assets/icons/twitterx.svg";

function RegisterScreen(props) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState();
  const [isSubmitted, setSubmitted] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState("register");

  useEffect(() => {}, [error, setError]);

  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
  };

  const loginTab = () => {
    setActiveTabSection("login");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const checkError = () => {
    if (!values.firstName) {
      setError(props.t("First name field is required"));
    } else if (!values.lastName) {
      setError(props.t("Last name field is required"));
    } else if (!values.username) {
      setError(props.t("Username field is required"));
    } else if (!values.email) {
      setError(props.t("Email field is required"));
    } else if (!values.password) {
      setError(props.t("Password field is required"));
    } else if (!values.passwordRepeat) {
      setError(props.t("Password repeat field is required"));
    } else if (values.password !== values.passwordRepeat) {
      setError(props.t("Password fields do not match"));
    } else {
      setError("");
      return;
    }
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage();
    checkError();
    if (error === "") {
      setLoading(true);
      try {
        const response = await registerUser({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
        });
        if (response.status === 200) {
          setSuccessMessage("Created user");
        }
      } catch (e) {
        if (e.response?.data) {
          setError(e.response.data.message);
        }
      } finally {
        setLoading(false);
        setSubmitted(false);
      }
    }
  };

  if (loading) {
    return <CircleLoading />;
  }

  if (activeTabSection === "login") {
    return <LoginScreen />;
  }

  return (
    <div className="register-screen-container">
      {/*
      <div className="register-screen-logo-container">
        <img src={Logo} />
        <div className="register-screen-language-container">
          <select
            onChange={(e) => onChangeLanguage(e.target.value)}
            className="register-screen-language-selector"
          >
            <option value="tr" onClick={() => onChangeLanguage("tr")}>
              TR
            </option>
            <option value="en" onClick={() => onChangeLanguage("en")}>
              EN
            </option>
          </select>
        </div>
      </div>
  */}

      <Row align="middle" style={{ height: "100%", width: "100%" }}>
        <Col span={14} className="register-screen-left-container">
          1
        </Col>

        <Col span={10} className="register-screen-right-container">
          <Col span={24}>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <h1>Sign Up</h1>
            </Row>
            <Row justify="center">
              <Col
                xs={20}
                sm={16}
                md={12}
                lg={16}
                className="register-screen-row-container"
              >
                <Row justify="center" align="middle" style={{ padding: "5px" }}>
                  <Col flex={1}>
                    <Input
                      className="register-screen-input success"
                      placeholder={props.t("First name")}
                      name="firstName"
                      value={values.firstName}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row justify="center" align="middle" style={{ padding: "5px" }}>
                  <Col flex={1}>
                    <Input
                      className="register-screen-input"
                      placeholder={props.t("Last name")}
                      name="lastName"
                      value={values.lastName}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row justify="center" align="middle" style={{ padding: "5px" }}>
                  <Col flex={1}>
                    <Input
                      className="register-screen-input"
                      placeholder={props.t("Username")}
                      name="username"
                      value={values.username}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row justify="center" align="middle" style={{ padding: "5px" }}>
                  <Col flex={1}>
                    <Input
                      className="register-screen-input"
                      placeholder={props.t("Email address")}
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row justify="center" align="middle" style={{ padding: "5px" }}>
                  <Col flex={1}>
                    <Input.Password
                      className="register-screen-input"
                      placeholder={props.t("Your password")}
                      name="password"
                      value={values.password}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row justify="center" align="middle" style={{ padding: "5px" }}>
                  <Col flex={1}>
                    <Input.Password
                      className="register-screen-input"
                      placeholder={props.t("Your password repeat")}
                      name="passwordRepeat"
                      value={values.passwordRepeat}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row justify="center" align="middle" style={{ padding: "5px" }}>
                  <Col flex={1}>
                    {error && (
                      <div className="register-screen-error-container">
                        <div>{error}</div>
                      </div>
                    )}
                    {successMessage && (
                      <div className="register-screen-success-message-container">
                        <div>{successMessage}</div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row justify="center">
              <Col xs={20} sm={16} md={12} lg={16}>
                <Row className="register-screen-row">
                  <Col span={8}>
                    <h2 onClick={loginTab} className="register-screen-signIn">
                      Sign In
                    </h2>
                  </Col>
                  <Col span={16}>
                    <DarkButtonBorder
                      type="primary"
                      text={props.t("Go on")}
                      size="small"
                      onClick={handleSubmit}
                    />
                  </Col>
                </Row>
                <Row
                  className="register-screen-row"
                  style={{ marginTop: "30px" }}
                >
                  <div className="register-screen-divider" />
                  <h3>OR</h3>
                  <div className="register-screen-divider" />
                </Row>
                <Row
                  className="register-screen-row"
                  style={{ marginTop: "40px", justifyContent: "space-around" }}
                >
                  <img src={GoogleIcon} alt="google" />
                  <img src={FacebookIcon} alt="facebook" />
                  <img src={TwitterXIcon} alt="twitterX" />
                </Row>
              </Col>
            </Row>
          </Col>
        </Col>

        {/*
        <Col span={24}>
          <Row justify="center">
            <Col
              xs={20}
              sm={16}
              md={12}
              lg={4}
              className="register-screen-row-container"
            >
              <Row justify="center" align="middle" style={{ padding: "5px" }}>
                <Col flex={1}>
                  <Input
                    className="register-screen-input"
                    placeholder={props.t("First name")}
                    name="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row justify="center" align="middle" style={{ padding: "5px" }}>
                <Col flex={1}>
                  <Input
                    className="register-screen-input"
                    placeholder={props.t("Last name")}
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row justify="center" align="middle" style={{ padding: "5px" }}>
                <Col flex={1}>
                  <Input
                    className="register-screen-input"
                    placeholder={props.t("Username")}
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row justify="center" align="middle" style={{ padding: "5px" }}>
                <Col flex={1}>
                  <Input
                    className="register-screen-input"
                    placeholder={props.t("Email address")}
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row justify="center" align="middle" style={{ padding: "5px" }}>
                <Col flex={1}>
                  <Input.Password
                    className="register-screen-input"
                    placeholder={props.t("Your password")}
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row justify="center" align="middle" style={{ padding: "5px" }}>
                <Col flex={1}>
                  <Input.Password
                    className="register-screen-input"
                    placeholder={props.t("Your password repeat")}
                    name="passwordRepeat"
                    value={values.passwordRepeat}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row justify="center" align="middle" style={{ padding: "5px" }}>
                <Col flex={1}>
                  {error && (
                    <div className="register-screen-error-container">
                      <div>{error}</div>
                    </div>
                  )}
                  {successMessage && (
                    <div className="register-screen-success-message-container">
                      <div>{successMessage}</div>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={20} sm={16} md={12} lg={4}>
              <Row>
                <Col span={18} push={6}>
                  <DarkButton
                    type="primary"
                    text={props.t("Go on")}
                    size="small"
                    onClick={handleSubmit}
                  ></DarkButton>
                </Col>
                <Col span={6} pull={18}>
                  <BackButton
                    type="danger"
                    text={props.t("Back")}
                    size="small"
                    onClick={loginTab}
                  ></BackButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
                  */}
      </Row>
    </div>
  );
}

const RegisterScreenWithTransation = withTranslation()(RegisterScreen);
export default RegisterScreenWithTransation;
