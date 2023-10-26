import "./LoginScreen.css";
import Logo from "../../../assets/logo-white.png";
import { Input } from "antd";
import DarkButton from "../../../components/UI/Buttons/DarkButton";
import { withTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import CircleLoading from "../../../components/UI/Loading/LoadingBar";
import { useEffect } from "react";
import { loginUser } from "../../../services/http";
import { MainContext, useContext } from "../../../context";
import RegisterScreen from "../register/RegisterScreen";

function LoginScreen(props) {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
  };

  const { token, setToken } = useContext(MainContext);
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

  useEffect(() => {}, [token]);

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
            setToken(response.data.token);
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
        {/*
        <div style={{ display: "flex", width: "100%", marginTop: "100px" }}>
          <div className="login-screen-tab-menu">
            <div
              className={
                activeTabSection === "login"
                  ? "login-screen-tab-item-active"
                  : "login-screen-tab-item"
              }
            >
              {props.t("Sign In")}
            </div>
            <div
              className={
                activeTabSection === "register"
                  ? "login-screen-tab-itemi-active"
                  : "login-screen-tab-item"
              }
              onClick={registerTab}
            >
              {props.t("Sign Up")}
            </div>
          </div>
        </div>
            */}
        <div className="login-screen-body">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="login-screen-tab-menu">
              <div
                className={
                  activeTabSection === "login"
                    ? "login-screen-tab-item-active"
                    : "login-screen-tab-item"
                }
              >
                {props.t("Sign In")}
              </div>
              <div
                className={
                  activeTabSection === "register"
                    ? "login-screen-tab-itemi-active"
                    : "login-screen-tab-item"
                }
                onClick={registerTab}
              >
                {props.t("Sign Up")}
              </div>
            </div>
            <div className="login-screen-form-container">
              <div className="login-screen-form-header">
                {props.t("Sign In")}
              </div>
              <div className="login-screen-form-body">
                <div className="login-screen-input-container">
                  <div className="login-screen-input-label">
                    {props.t("Your email address or Username")}
                  </div>
                  <Input
                    className="login-screen-input"
                    placeholder="Please enter your email / username"
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="login-screen-input-container">
                  <div className="login-screen-input-label">
                    {props.t("Your password")}
                  </div>
                  <Input.Password
                    className="login-screen-input"
                    placeholder="Please enter your password"
                    name="password"
                    onChange={handleInputChange}
                  />
                </div>
                {error && (
                  <div className="login-screen-error-container">
                    <div>{error}</div>
                  </div>
                )}
                <div className="login-screen-button-container">
                  <DarkButton
                    text={props.t("Sign In")}
                    onClick={handleSubmit}
                  />
                  {props.t("I forgot my password")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <RegisterScreen />;
  }
}

const LoginScreenWithTransation = withTranslation()(LoginScreen);
export default LoginScreenWithTransation;
