import "./LoginScreen.css";

import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircleLoading from "../../../components/UI/Loading/LoadingBar";
import { useEffect } from "react";
import {
  loginUser,
  sendUserLoginCode,
  socialLoginUser,
  verifyUser,
} from "../../../services/http";
import RegisterScreen from "../register/RegisterScreen";
import { Col, Row, Input, Divider } from "antd";
import { BsFacebook, BsGoogle, BsInstagram } from "react-icons/bs";
import LoginButton from "../../../components/UI/Buttons/LoginButton";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import ReactFacebookLogin from "react-facebook-login";
import { InstagramLogin } from "@amraneze/react-instagram-login";
import InstagramButtonBorder from "../../../components/UI/Buttons/InstagramButtonBorder";

function LoginScreen(props) {
  /*
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
  };
  */

  const [fastLogin, setFastLogin] = useState();
  const [resendCode, setResendCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [error, setError] = useState();
  const [activeTabSection, setActiveTabSection] = useState("login");
  const auth = useAuth();
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
  };

  /*
  const checkError = () => {
    if (!values.email || !values.email.length <= 0) {
      setError(props.t("Email field is required"));
      return;
    }

    setError("");
    return;
  };
  */

  /*
  const registerTab = () => {
    setActiveTabSection("register");
  };
  */

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
            setTimeout(() => {
              setResendCode(true);
            }, 10000);
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
    if (!values.code && !values.password) {
      setError(props.t("The login code / password is required"));
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
            const { token, user } = response.data;
            user.token = token;
            localStorage.setItem("token", response.data.token);
            //  props.setToken(response.data?.token);
            auth.login(user);
            navigate("/");
          }
        }
      } catch (e) {
        if (e.response?.data) {
          {
            setTimeout(() => {
              setError(e.response.data.message);
            }, 300);
          }
        }
      } finally {
        setLoading(false);
        setTimeout(() => {
          if (localStorage.getItem("token")) {
            // window.location.href = "/";
            setLoading(false);
          }
        }, 100);
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      );
      const socialUser = {
        firstName: res.data.name.split(" ")[0],
        lastName: res.data.name.split(" ")[1],
        email: res.data.email,
        picture: res.data.picture,
      };
      if (socialUser && socialUser.email) {
        try {
          const response = await socialLoginUser(socialUser);
          if (response.status === 200) {
            if (response.data) {
              const { token, user } = response.data;
              user.token = token;
              localStorage.setItem("token", response.data.token);
              auth.login(user);
              navigate("/");
            }
          }
        } catch (e) {
          console.log("Google login error : ", e);
        }
      }
    },
  });

  const loginWithFacebook = async (response) => {
    const socialUser = {
      firstName: response.name.split(" ")[0],
      lastName: response.name.split(" ")[1],
      email: response.email,
      picture: response.picture,
    };

    if (socialUser && socialUser.email) {
      try {
        const response = await socialLoginUser(socialUser);
        if (response.status === 200) {
          if (response.data) {
            const { token, user } = response.data;
            user.token = token;
            localStorage.setItem("token", response.data.token);
            auth.login(user);
            navigate("/");
          }
        }
      } catch (e) {
        console.log("Google login error : ", e);
      }
    }
  };

  const loginWithInstagram = async (response) => {
    console.log("response 1 : ", response);
  };

  if (loading) {
    return <CircleLoading />;
  }

  const sendLoginCode = async (e) => {
    e.preventDefault();
    try {
      //setLoading(true);
      const response = await sendUserLoginCode(values.email);
      if (response.status === 200) {
        setResendCode(false);
        setTimeout(() => {
          setResendCode(true);
        }, 10000);
      }
    } catch (e) {
      console.log("Sending user login code error : ", e);
      setTimeout(() => {
        setResendCode(true);
      }, 1000);
    } finally {
      //setLoading(false);
    }
  };

  /*
  if (localStorage.getItem("token")) {
    return <Navigate replace to="/" />;
  }
  */

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
                {fastLogin === "code" && (
                  <div>
                    <Input
                      className="login-screen-input"
                      placeholder={props.t("Please enter login code")}
                      name="code"
                      onChange={handleInputChange}
                    />
                    {resendCode && (
                      <div
                        className="login-screen-resend-container"
                        onClick={(e) => sendLoginCode(e)}
                      >
                        {props.t("Re-send login code")}
                      </div>
                    )}
                  </div>
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
                  <div
                    className="login-screen-social-button-container"
                    onClick={loginWithGoogle}
                  >
                    <BsGoogle
                      className="login-screen-login-button"
                      color="#fff"
                    />
                  </div>

                  <ReactFacebookLogin
                    appId="3148320675410866"
                    autoLoad
                    fields="name,email,picture"
                    callback={() => loginWithFacebook()}
                    textButton=""
                    icon={<BsFacebook size={24} color="#fff" />}
                    cssClass="login-screen-social-button-container"
                  />

                  <InstagramLogin
                    clientId="176752001538012"
                    redirectUri="https://www.google.com"
                    onSuccess={loginWithInstagram}
                    onFailure={loginWithInstagram}
                    cssClass="login-screen-social-button-container"
                  >
                    <BsInstagram size={24} color="#fff" />
                  </InstagramLogin>
                  {/*
                    <BsFacebook
                      size={28}
                      className="login-screen-login-button"
                      color="#fff"
                    />
                */}

                  {/*
                  <div className="login-screen-social-button-container">
                    <BsInstagram
                      size={28}
                      className="login-screen-login-button"
                      color="#fff"
                    />
                  </div>
              */}
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
                        <img src={AppleIcon} width={'36px'} height={'36px'} alt="apple" />
                        
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
