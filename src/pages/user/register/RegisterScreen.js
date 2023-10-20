import "./RegisterScreen.css";
import Logo from "../../../assets/logo-white.png";
import { Input } from "antd";
import { withTranslation } from "react-i18next";
import DarkButtonLarge from "../../../components/UI/Buttons/DarkButtonLarge";
import { useState } from "react";
import CircleLoading from "../../../components/UI/Loading/LoadingBar";
import { registerUser } from "../../../services/http";
import { useEffect } from "react";
import LoginScreen from "../login/LoginScreen";

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
      <div className="register-screen-body">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="login-screen-tab-menu">
            <div className="login-screen-tab-item" onClick={loginTab}>
              {props.t("Sign In")}
            </div>
            <div className="login-screen-tab-item-active">
              {props.t("Sign Up")}
            </div>
          </div>
          <form
            className="register-screen-form-container"
            onSubmit={handleSubmit}
          >
            <div className="register-screen-form-header">
              {props.t("Sign Up")}
            </div>
            <div className="register-screen-form-body">
              <div className="register-row">
                <div
                  className="register-screen-input-container"
                  style={{ width: "40%" }}
                >
                  <div className="register-screen-input-label">
                    {props.t("First name")}
                  </div>
                  <Input
                    className="register-screen-input"
                    placeholder="Please enter your firstname"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div
                  className="register-screen-input-container"
                  style={{ width: "60%" }}
                >
                  <div className="register-screen-input-label">
                    {props.t("Last name")}
                  </div>
                  <Input
                    className="register-screen-input"
                    placeholder="Please enter your lastname"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="register-screen-input-container">
                <div className="register-screen-input-label">
                  {props.t("Username")}
                </div>
                <Input
                  className="register-screen-input"
                  placeholder="Please enter your username"
                  name="username"
                  value={values.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="register-screen-input-container">
                <div className="register-screen-input-label">
                  {props.t("Email address")}
                </div>
                <Input
                  className="register-screen-input"
                  placeholder="Please enter your email address"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="register-row">
                <div className="register-screen-input-container">
                  <div className="register-screen-input-label">
                    {props.t("Your password")}
                  </div>
                  <Input.Password
                    className="register-screen-input"
                    placeholder="Please enter your email address"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="register-screen-input-container">
                  <div className="register-screen-input-label">
                    {props.t("Your password repeat")}
                  </div>
                  <Input.Password
                    className="register-screen-input"
                    placeholder="Please enter your email address"
                    name="passwordRepeat"
                    value={values.passwordRepeat}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
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
              <div className="register-screen-button-container">
                <DarkButtonLarge
                  text={props.t("Sign Up")}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const RegisterScreenWithTransation = withTranslation()(RegisterScreen);
export default RegisterScreenWithTransation;
