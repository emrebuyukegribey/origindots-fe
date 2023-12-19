import { Form, Upload, message } from "antd";
import { HiOutlinePhoto } from "react-icons/hi2";
import "./FormItem.css";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

function FormPhoto(props) {
  const [imageUrl, setImageUrl] = useState();
  const [file, setFile] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
        localStorage.setItem(props.proper.id, url);
        // localStorage.setItem("file", JSON.stringify(info.file));
        setFile(info.file);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
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

  const onRemove = () => {
    localStorage.removeItem(props.proper.id);
    setFile(null);
    setImageUrl(null);
    console.log("onRemove ");
  };

  useEffect(() => {
    setFile(JSON.parse(localStorage.getItem("file")));
    setImageUrl(localStorage.getItem(props.proper.id));
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
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          size="large"
          onRemove={onRemove}
        >
          <div className="form-photo-container ">
            <HiOutlinePhoto className="photo-field-upload-icon" />
            <div>{props.proper.placeholder}</div>
          </div>
        </Upload>
        {imageUrl && (
          <div className="form-photo-image-container">
            <img src={imageUrl} className="form-photo-image" />
            <div onClick={onRemove} style={{ cursor: "pointer" }}>
              <MdClose className="form-photo-close-icon" />
            </div>
          </div>
        )}
      </Form.Item>
    </>
  );
}

export default FormPhoto;
