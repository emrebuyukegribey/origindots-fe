import "./LoginScreen.css";

import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import CircleLoading from "../../../components/UI/Loading/LoadingBar";
import { useEffect } from "react";
import { loginUser, verifyUser } from "../../../services/http";
import RegisterScreen from "../register/RegisterScreen";

import { Col, Row, Input, Divider } from "antd";

import GoogleIcon from "../../../assets/icons/google.svg";
import FacebookIcon from "../../../assets/icons/facebook.svg";
import TwitterXIcon from "../../../assets/icons/twitterx.svg";
import RedButtonBorder from "../../../components/UI/Buttons/RedButtonBorder";
import DarkButtonBorder from "../../../components/UI/Buttons/DarkButtonBorder";
import { BsFacebook, BsGoogle, BsInstagram } from "react-icons/bs";
import { RiFacebookCircleLine, RiFacebookFill } from "react-icons/ri";
import { FiFacebook } from "react-icons/fi";
import LoginButton from "../../../components/UI/Buttons/LoginButton";

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

  const [fastLogin, setFastLogin] = useState();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [error, setError] = useState();
  const [activeTabSection, setActiveTabSection] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {}, [error, setError]);

  const handleInputChange = (e) => {
    setError(null);
    e.preventDefault();
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
    console.log("values : ", values);
  };

  const checkError = () => {
    if (!values.email || !values.email.length <= 0) {
      setError(props.t("Email field is required"));
      return;
    }

    setError("");
    return;
  };

  const registerTab = () => {
    setActiveTabSection("register");
  };

  const loginVerify = async () => {
    if (!values.email) {
      setError(props.t("Email field is required"));
      setLoading(false);
      return;
    }
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        values.email
      ) === false
    ) {
      setError(props.t("Please enter a valid email address"));
      setLoading(false);
      return;
    }

    if (values.email && !error) {
      try {
        const response = await verifyUser({
          email: values.email,
          code: values.code,
        });
        if (response.status === 200) {
          if (response.data === false) {
            setFastLogin("code");
          } else {
            setFastLogin("password");
          }
        }
      } catch (e) {
        console.log("Error verifying email : ", e);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // checkError();
    if (!values.email) {
      setError(props.t("Email field is required"));
      setLoading(false);
      return;
    }
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        values.email
      ) === false
    ) {
      setError(props.t("Please enter a valid email address"));
      setLoading(false);
      return;
    }
    if (values.email && !error) {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
          code: values.code,
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
          <div className="login-screen-left-container">
            <Col span={20} style={{ borderRadius: "30px" }}></Col>
          </div>
          <div className="login-screen-right-container">
            <div className="login-screen-right-header-container">
              <div className="login-screen-right-welcome-header">
                {props.t("Welcome")}
              </div>
              <div className="login-screen-welcome-text">
                {props.t("We are glad to see you back with us")}
              </div>
            </div>
            <Row justify="center" style={{ width: "85%" }}>
              <Col span={24} className="login-screen-row-container">
                <Input
                  className="login-screen-input"
                  placeholder={props.t("Your email address")}
                  name="email"
                  onChange={handleInputChange}
                />
                {console.log("fastLogin : ", fastLogin)}
                {fastLogin === "code" && (
                  <Input
                    className="login-screen-input"
                    placeholder={props.t("Please enter login code")}
                    name="code"
                    onChange={handleInputChange}
                  />
                )}

                {fastLogin === "password" && (
                  <Input.Password
                    className="login-screen-input"
                    placeholder={props.t("Your password")}
                    name="password"
                    onChange={handleInputChange}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    {error && (
                      <div className="login-screen-error-container">
                        <div>{error}</div>
                      </div>
                    )}
                    <LoginButton
                      type="primary"
                      text={props.t("Go on")}
                      size="small"
                      onClick={fastLogin ? handleSubmit : loginVerify}
                    />
                  </div>
                </div>
                <Divider style={{ borderColor: "#000", margin: "40px 0px" }}>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "17px",
                      fontWeight: "500",
                    }}
                  >
                    Login with others
                  </span>
                </Divider>
                <Row
                  className="register-screen-row"
                  style={{
                    marginTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="login-screen-social-button-container">
                    <BsGoogle
                      className="login-screen-login-button"
                      color="#fff"
                    />
                  </div>
                  <div className="login-screen-social-button-container">
                    <BsFacebook
                      size={28}
                      className="login-screen-login-button"
                      color="#fff"
                    />
                  </div>
                  <div className="login-screen-social-button-container">
                    <BsInstagram
                      size={28}
                      className="login-screen-login-button"
                      color="#fff"
                    />
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    );
    /*
    return (
      <div className="login-screen-container">
        <Row align="middle" style={{ height: "100%", width: "100%" }}>
          <div className="login-screen-left-container">
            <Carousel autoplay>
              <div>
                <h3>1asdasd</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
            </Carousel>
          </div>
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

                  <Row style={{ margin: "20px 10px 10px 10px" }}>
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignContent: "center",
                      }}
                    >
                      <h3>Şifremi unuttum</h3>  
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
                        
                        <Col
                          span={24}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          
                          <DarkButtonBorder
                            type="primary"
                            text={props.t("Go on")}
                            size="small"
                            onClick={handleSubmit}
                          />
                      
                          <LoginButton />
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
    */
  } else {
    return <RegisterScreen />;
  }
}

const LoginScreenWithTransation = withTranslation()(LoginScreen);
export default LoginScreenWithTransation;
