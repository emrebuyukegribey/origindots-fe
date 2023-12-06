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

import { Button, Col, Row, Form, Input } from 'antd';


function LoginScreen(props) {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

  useEffect(() => { }, [error, setError]);

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
        <div className="login-screen-logo-container">
          <img src={Logo} />
          <div className="logo-screen-language-container">
            <select
              onChange={(e) => onChangeLanguage(e.target.value)}
              className="logo-screen-language-selector"
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


        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col xs={2} sm={4} md={6} lg={8} >

          </Col>
          <Col xs={20} sm={16} md={12} lg={8} className="login-screen-row-container">
            <Row justify="center" align="middle" style={{ padding: '5px' }} >
              <Col flex={1}> <Input
                className="login-screen-input"
                placeholder={props.t("Your email address or Username")}
                name="email"
                onChange={handleInputChange}
              /></Col>
            </Row>
            <Row justify="center" align="middle" style={{ padding: '5px' }} >
              <Col flex={1} > <Input.Password
                className="login-screen-input"
                placeholder={props.t("Your password")}
                name="password"
                onChange={handleInputChange}
              /></Col>
            </Row>
            <Row justify="center" align="middle" style={{ padding: '5px' }}>
              <Col span={24}>
                {error && (
                  <div className="login-screen-error-container">
                    <div>{error}</div>
                  </div>
                )}
              </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ padding: '5px' }} >
              <Col flex={2} ><Button type="text" className="sign-up" onClick={registerTab} >
                {props.t("Sign Up")}
              </Button></Col>
              <Col flex={2} style={{ textAlign: 'end' }}><DarkButton type="primary" text={props.t("Go on")} onClick={handleSubmit}>
                
              </DarkButton></Col>
            </Row>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8}>

          </Col>
        </Row>

      </div>
    );
  } else {
    return <RegisterScreen />;
  }
}

const LoginScreenWithTransation = withTranslation()(LoginScreen);
export default LoginScreenWithTransation;
