import { Form, Upload, message } from "antd";
import { HiOutlinePhoto } from "react-icons/hi2";
import "./FormItem.css";
import { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { getCurrentDate } from "../PFormUtil";

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

function FormVideo({ proper, addValueOnFormValues, formValues }) {
  const [files, setFiles] = useState([]);

  let defaultFileList = [];

  const properFormValue = formValues.filter(
    (fv) => fv.properId === proper.id
  )[0];

  if (
    properFormValue &&
    properFormValue.properValue &&
    properFormValue.properValue.length > 0
  ) {
    defaultFileList = properFormValue.properValue;
  }

  const onChange = (e) => {
    setFiles(e.fileList);
    const properObject = {
      properId: proper.id,
      properParenId: proper.parentId,
      properName: proper.title,
      properValue: e.fileList,
      properType: proper.type,
      createdDate: getCurrentDate(),
    };
    addValueOnFormValues(properObject);
  };

  const fileRemoved = (event) => {
    const filteredFiles = files.filter((file) => file !== event);
    setFiles(filteredFiles);
  };

  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
        extra={proper.description}
        name={proper.id}
        rules={[
          { required: proper.required, message: proper.title + " is required" },
        ]}
      >
        <Upload
          name="file"
          showUploadList={{ showRemoveIcon: true }}
          accept=".dat, .mp3, .mp4, .wmv, .wm, .mov, avi, flv, f4v, swf, mkv, webm"
          beforeUpload={() => false}
          onChange={(e) => onChange(e)}
          onRemove={(e) => fileRemoved(e)}
          listType="picture"
          defaultFileList={defaultFileList}
        >
          <div className="form-photo-container ">
            <AiOutlineVideoCameraAdd className="photo-field-upload-icon" />
            <div>{proper.placeholder}</div>
          </div>
        </Upload>
      </Form.Item>
    </>
  );
}

export default FormVideo;
