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

  useEffect(() => { }, [error, setError]);

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

      <Row align="middle" style={{ height: '100%', width: '100%' }} >
        <Col span={24}>
          <Row justify="center" >
            <Col xs={20} sm={16} md={12} lg={4} className="register-screen-row-container">
              <Row justify="center" align="middle" style={{ padding: '5px' }} >
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
              <Row justify="center" align="middle" style={{ padding: '5px' }} >
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
              <Row justify="center" align="middle" style={{ padding: '5px' }} >
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
              <Row justify="center" align="middle" style={{ padding: '5px' }} >
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
              <Row justify="center" align="middle" style={{ padding: '5px' }} >
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
              <Row justify="center" align="middle" style={{ padding: '5px' }} >
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
              <Row justify="center" align="middle" style={{ padding: '5px' }} >
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

          <Row justify="center"  >
            <Col xs={20} sm={16} md={12} lg={4}  >
              <Row>
                <Col span={18} push={6}>
                  <DarkButton type="primary" text={props.t("Go on")} size="small" onClick={handleSubmit}>
                  </DarkButton>
                </Col>
                <Col span={6} pull={18}>
                  <BackButton type="danger" text={props.t("Back")} size="small" onClick={loginTab}>
                  </BackButton>
                </Col>
              </Row>
            </Col>
          </Row>

        </Col>
      </Row>



    </div>
  );
}

const RegisterScreenWithTransation = withTranslation()(RegisterScreen);
export default RegisterScreenWithTransation;
