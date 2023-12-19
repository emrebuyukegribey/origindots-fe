import { Form, Upload, message } from "antd";
import { HiOutlinePhoto } from "react-icons/hi2";
import "./FormItem.css";
import { useEffect, useState } from "react";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  if (file) {
    localStorage.setItem("file", JSON.stringify(file));
  }

  if (!file && localStorage.getItem("file")) {
    file = JSON.parse(localStorage.getItem("file"));
    console.log("file : ", file);
  }

  console.log("file : ", file);

  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
    return;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function FormPhoto(props) {
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
        localStorage.setItem("imageUrl", imageUrl);
      });
    }
  };

  useEffect(() => {
    beforeUpload();
  }, []);

  return (
    <>
      <Form.Item
        className="form-input-container"
        label={props.proper.title}
        extra={props.proper.description}
        name={props.proper.id}
        rules={[
          {
            required: props.proper.required,
            message: props.proper.title + " is required",
          },
        ]}
      >
        <Upload
          maxCount={1}
          listType="picture"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          size="large"
        >
          <div className="form-photo-container ">
            <HiOutlinePhoto className="photo-field-upload-icon" />
            <div>{props.proper.placeholder}</div>
          </div>
        </Upload>
      </Form.Item>
    </>
  );
}

export default FormPhoto;
