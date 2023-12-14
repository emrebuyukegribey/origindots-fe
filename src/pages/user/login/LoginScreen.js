import "./LoginScreen.css";
import Logo from "../../../assets/logo-white.png";
import DarkButton from "../../../components/UI/Buttons/DarkButton";
import { withTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import CircleLoading from "../../../components/UI/Loading/LoadingBar";
import { useEffect } from "react";
import { loginUser } from "../../../services/http";
import RegisterScreen from "../register/RegisterScreen";

import { Button, Col, Row, Form, Input } from "antd";

import GoogleIcon from "../../../assets/icons/google.svg";
import FacebookIcon from "../../../assets/icons/facebook.svg";
import TwitterXIcon from "../../../assets/icons/twitterx.svg";
import DarkButtonBorder from "../../../components/UI/Buttons/DarkButtonBorder";

function LoginScreen(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
  };

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [activeTabSection, setActiveTabSection] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {}, [error, setError]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const checkError = () => {
    if (!values.email) {
      setError(props.t("Email field is required"));
    } else if (!values.password) {
      setError(props.t("Password field is required"));
    } else {
      setError("");
      return;
    }
    return;
  };

  const registerTab = () => {
    setActiveTabSection("register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    checkError();
    if (error !== null) {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        });
        if (response.status === 200) {
          if (response.data) {
            localStorage.setItem("token", response.data.token);
            props.setToken(response.data?.token);
          }
        }
      } catch (e) {
        if (e.response?.data) {
          setError(e.response.data.message);
        }
        setLoading(false);
      } finally {
        setTimeout(() => {
          if (localStorage.getItem("token")) {
            window.location.href = "/";
            setLoading(false);
          }
        }, 100);
      }
    }
  };

  if (loading) {
    return <CircleLoading />;
  }

  if (activeTabSection === "login") {
    return (
      <div className="login-screen-container">
        <Row align="middle" style={{ height: "100%", width: "100%" }}>
          <div className="login-screen-left-container">1</div>
          <div className="login-screen-right-container">
            <Col span={24}>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <h1>Sign In</h1>
              </Row>
              <Row justify="center">
                <Col span={24} className="login-screen-row-container">
                  <Row justify="center" align="middle">
                    <Col flex={1}>
                      <Input
                        className="login-screen-input"
                        placeholder={props.t("Your email address or Username")}
                        name="email"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row justify="center" align="middle">
                    <Col flex={1}>
                      <Input.Password
                        className="login-screen-input"
                        placeholder={props.t("Your password")}
                        name="password"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row justify="center" align="middle">
                    <Col span={24}>
                      {error && (
                        <div className="login-screen-error-container">
                          <div>{error}</div>
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row
                    justify="center"
                    align="middle"
                    style={{ marginTop: "20px" }}
                  >
                    <Col span={24}>
                      <Row className="login-screen-row">
                        <Col span={8}>
                          <h2
                            onClick={registerTab}
                            className="login-screen-signUp"
                          >
                            Sign Up
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
                        className="login-screen-row"
                        style={{ marginTop: "30px" }}
                      >
                        <div className="register-screen-divider" />
                        <h3>OR</h3>
                        <div className="register-screen-divider" />
                      </Row>
                      <Row
                        className="register-screen-row"
                        style={{
                          marginTop: "40px",
                          justifyContent: "space-around",
                        }}
                      >
                        <img src={GoogleIcon} alt="google" />
                        <img src={FacebookIcon} alt="facebook" />
                        <img src={TwitterXIcon} alt="twitterX" />
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </div>
        </Row>
      </div>
    );
  } else {
    return <RegisterScreen />;
  }
}

const LoginScreenWithTransation = withTranslation()(LoginScreen);
export default LoginScreenWithTransation;
