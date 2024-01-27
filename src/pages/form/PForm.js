import { useEffect, useState } from "react";
import "./PForm.css";
import { useParams } from "react-router-dom";

import { Button, Divider, Form, Input, Steps } from "antd";
import { getProcessWithAllAtributes } from "../../services/http";
import ProcessIcons from "../../components/Process/ProcessIcons";
import { FormRender } from "./FormRender";
import BackButtonBorder from "../../components/UI/Buttons/BackButtonBorder";
import ReturnButtonBorder from "../../components/UI/Buttons/ReturnButtonBorder";
import { FaFacebook, FaUserCheck } from "react-icons/fa";
import DarkButtonBorder from "../../components/UI/Buttons/DarkButtonBorder";
import GoogleButtonBorder from "../../components/UI/Buttons/GoogleButtonBorder";
import AppleButtonBorder from "../../components/UI/Buttons/AppleButtonBorder";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import InstagramButtonBorder from "../../components/UI/Buttons/InstagramButtonBorder";
import ReactFacebookLogin from "react-facebook-login";
import { InstagramLogin } from "@amraneze/react-instagram-login";
import { BsFacebook } from "react-icons/bs";

function PForm() {
  const { id } = useParams();

  const [process, setProcess] = useState([]);
  const [processIcon, setProcessIcon] = useState();
  const [properList, setProperList] = useState([]);
  const [properValueList, setProperValueList] = useState([]);
  const [tempProperList, setTempProperList] = useState([]);
  const [tempProperValueList, setTempProperValueList] = useState([]);
  const [currentStep, setCurrentStep] = useState(2);

  const [formValues, setFormValues] = useState([]);

  const [selected, setSelected] = useState();

  const [authEmail, setAuthEmail] = useState();
  const [authEmailError, setAuthEmailError] = useState();

  const [authUser, setAuthUser] = useState();
  const getProcess = async () => {
    try {
      const response = await getProcessWithAllAtributes(id);
      if (response.status === 200) {
        setProcess(response.data?.process);
        setProperList(response.data?.properList);
        setTempProperList(response.data?.properList);
        setProperValueList(response.data?.properValueList);
        setTempProperValueList(response.data?.properValueList);
        const icon = ProcessIcons.filter(
          (i) => i.id.toString() === response.data.process.icon
        )[0].icon;
        setProcessIcon(icon);
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    setProperList(tempProperList);
    getProcess();
    removeProperValuesInStorage();
  }, []);

  const removeProperValuesInStorage = () => {
    for (let [key, value] of Object.entries(localStorage)) {
      if (key.includes("prp-") || key.toLocaleLowerCase().includes("value")) {
        localStorage.removeItem(key);
      }
    }
  };

  const addValueOnFormValues = (properObject) => {
    const formValuesTemp = [...formValues];
    const properIndex = formValuesTemp.findIndex((p) => {
      return p.properId === properObject.properId;
    });

    if (properIndex >= 0) {
      formValuesTemp[properIndex] = properObject;
    } else {
      formValuesTemp.push(properObject);
    }
    setFormValues(formValuesTemp);
  };

  const checkRequiredPropers = () => {
    const requiredFields = [];
    const requiredPropers = properList.filter(
      (proper) => proper.required === true
    );
    requiredPropers.forEach((proper) => {
      const requiredField = formValues.find(
        (formValue) => formValue.properId === proper.id
      );
      if (!proper.parentId && !requiredField) {
        requiredFields.push(proper);
      }
      if (!proper.parentId && requiredField && !requiredField.properValue) {
        requiredFields.push(proper);
      }
      if (proper.parentId && requiredField && requiredField.properValue) {
        const parentProper = formValues.find(
          (formValue) => formValue.properId === proper.parentId
        );
        if (parentProper && parentProper.properValue) {
          requiredFields.push(proper);
        }
      }
    });

    if (requiredFields && requiredFields.length > 0) {
      console.log("requiredFields : ", requiredFields);
    }
  };

  const onFinish = (values) => {
    // checkRequiredPropers();
    console.log("values : ", values);
    console.log("formValues : ", formValues);
    let newArr = [...formValues];
    if (values) {
      const objectKeys = Object.keys(values);
      objectKeys.map((key) => {
        const value = { [key]: values[key] };
        const valueIndex = newArr.findIndex((v) => Object.keys(v)[0] === key);
        if (valueIndex >= 0) {
          newArr[valueIndex] = value;
        } else {
          newArr.push(value);
        }
      });
      setFormValues(
        newArr.filter((v) => {
          return Object.values(v)[0] !== undefined;
        })
      );
    }
    if (selected) {
      goBack();
    } else {
      removeProperValuesInStorage();
    }
  };

  const onChangeForParent = (val) => {
    setProperList(tempProperList);
    setSelected(val);
    // const childPropers = properList.filter((p) => p.parentId === val.id);
    // setProperList(childPropers);
  };

  const goBack = () => {
    let newSelected = null;
    setProperList(tempProperList);
    if (selected.parentId || selected.properId) {
      if (selected.id.includes("value")) {
        const tempNewSelected = properList.filter(
          (p) => p.id === selected.properId
        )[0];
        newSelected = properList.filter(
          (proper) => proper.id === tempNewSelected.parentId
        )[0];
        if (!newSelected) {
          newSelected = properValueList.filter(
            (v) => v.id === tempNewSelected.parentId
          )[0];
        }
      } else {
        let tempNewSelected = properList.filter(
          (p) => p.id === selected.parentId
        )[0];
        if (!tempNewSelected) {
          tempNewSelected = properList.filter(
            (p) => p.id === selected.properId
          )[0];
        }
        if (!tempNewSelected) {
          tempNewSelected = properValueList.filter(
            (v) => v.id === selected.parentId
          )[0];
        }
        newSelected = tempNewSelected;
        if (!newSelected) {
          newSelected = properValueList.filter(
            (v) => v.id === tempNewSelected.parentId
          )[0];
        }
      }
      setSelected(newSelected);
    } else {
      setSelected(null);
      setProperList(tempProperList);
      setProperValueList(tempProperValueList);
    }
  };

  const goReturn = () => {
    setSelected(null);
    setProperList(tempProperList);
    setProperValueList(tempProperValueList);
  };

  const validateAuthEmail = (email) => {
    const pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const result = pattern.test(email);
    return result;
  };

  const onChangeAuthEmail = (e) => {
    const value = e.target.value;
    setAuthEmail(value);
  };

  const onSubmitAuthEmail = () => {
    if (!validateAuthEmail(authEmail)) {
      setAuthEmailError("Please enter valid email address");
    } else if (!authEmail) {
      setAuthEmailError("Please enter your email address");
    } else {
      console.log("submit");
    }
  };

  const properListForm = properList.filter((proper) =>
    selected ? proper.parentId === selected.id : proper.parentId === null
  );

  const steps = [
    {
      title: "Authentication",
      content: "Authentication",
    },
    {
      title: "Location",
      content: "Location",
    },
    {
      title: "Form",
      content: "Form",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

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
      const loggedUser = {
        name: res.data.name,
        email: res.data.email,
        picture: res.data.picture,
      };
      console.log("loggedUser : ", loggedUser);
      setAuthUser(loggedUser);
      if (loggedUser && loggedUser.name) {
        setCurrentStep(1);
      }
    },
  });

  const loginWithFacebook = (response) => {
    const loggedUser = {
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    };
    console.log("loggedUser : ", loggedUser);
    setAuthUser(loggedUser);
    if (loggedUser && loggedUser.name) {
      setCurrentStep(2);
    }
  };

  const loginWithInstagram = (response) => {
    console.log("response : ", response);
  };

  return (
    <div className="pf-container">
      <div className="pf-step-container">
        <Steps current={currentStep} items={items} />
      </div>
      {currentStep === 0 && (
        <div>
          <div className="pf-auth-container">
            <div className="pf-auth-icon">
              <FaUserCheck />
            </div>
            <div className="pf-auth-header">AUTHENTICATION</div>
          </div>
          <div className="pf-divider" />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div className="pf-auth-body">
              {/*
              <div className="pf-auth-email-container">
                <Input
                  className="pf-auth-email-input"
                  size="large"
                  placeholder="Please enter your email"
                  value={authEmail}
                  onChange={onChangeAuthEmail}
                />
                <div>{authEmailError}</div>

                <DarkButtonBorder
                  text="Continue with email"
                  style={{ height: "80px" }}
                  onClick={onSubmitAuthEmail}
                />
              </div>
              <Divider className="divider">OR</Divider>
      */}

              <GoogleButtonBorder
                text="Continue With Google"
                onClick={() => loginWithGoogle()}
              />
              {/*
              <InstagramButtonBorder
                text="Continue With Instagram"
                onClick={() => loginWithGoogle()}
              />
    */}
              <div style={{ marginLeft: "80px", width: "100%" }}>
                <ReactFacebookLogin
                  appId="3148320675410866"
                  autoLoad
                  fields="name,email,picture"
                  callback={loginWithFacebook}
                  icon={
                    <BsFacebook
                      size={24}
                      color="#fff"
                      style={{ marginRight: "60px" }}
                    />
                  }
                  cssClass="facebook-button-border-container facebook-button-border-text"
                  textButton="Continue With Facebook"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="facebook-button-border-text"
                    ></button>
                  )}
                />
              </div>
              <InstagramLogin
                clientId="176752001538012"
                redirectUri="https://www.google.com"
                onSuccess={loginWithInstagram}
                onFailure={loginWithInstagram}
                cssClass="ins-button-border-container"
              >
                <InstagramButtonBorder
                  text="Continue With Instagram"
                  onClick={() => loginWithInstagram()}
                />
              </InstagramLogin>
              {/*
              <AppleButtonBorder text="Continue With Apple" />
                  */}
            </div>
          </div>
        </div>
      )}
      {currentStep === 1 && <div>Step2 AuthUser: {authUser.name}</div>}
      {currentStep === 2 && (
        <div>
          <div className="pf-process-container">
            <div className="pf-process-icon">{processIcon}</div>
            <div className="pf-process-name">{process.name}</div>
          </div>
          <div className="pf-divider" />
          <Form layout="vertical" onFinish={onFinish}>
            <div className="pf-body-container">
              {properListForm.map((p) => (
                <FormRender
                  addValueOnFormValues={addValueOnFormValues}
                  formValues={formValues}
                  proper={p}
                  properList={properList.filter((v) => v.parentId === p.id)}
                  allProperList={properList}
                  properValueList={properValueList.filter(
                    (v) => v.properId === p.id
                  )}
                  key={p.id}
                  onChangeForParent={onChangeForParent}
                />
              ))}
            </div>
            <div className="pf-divider" />
            <div
              className="pf-button-container"
              style={{ justifyContent: selected ? "" : "flex-end" }}
            >
              {selected && (
                <div className="pf-back-buttons">
                  <BackButtonBorder onClick={goBack} />
                  <ReturnButtonBorder onClick={goReturn} />
                </div>
              )}
              <div className="pg-submit-button">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="pf-submit-button"
                >
                  KAYDET
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default PForm;
