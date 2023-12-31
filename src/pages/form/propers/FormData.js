import { Button, Form, Upload, message } from "antd";
import "./FormItem.css";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { HiOutlinePhoto } from "react-icons/hi2";
import { AiOutlineUpload } from "react-icons/ai";

function FormData({ proper }) {
  const [fileUrl, setFileUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readdAsText(img);
  };
  const beforeUpload = (file) => {
    const isAvailableFile =
      file.type === "application/pdf" ||
      file.type === "application/xls" ||
      file.type === "application/xlsx";

    if (!isAvailableFile) {
      message.error("You can only upload PDF/XLS/XLSX file!");
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isAvailableFile && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        localStorage.setItem(proper.id, url);
        setFileUrl(url);
      });
    }
  };

  const onRemove = () => {
    setFileUrl(null);
    localStorage.removeItem(proper.id);
  };

  const [files, setFiles] = useState([]);

  const uploadChanged = (event) => {
    setFiles(event.fileList);
    console.log("files : ", files);
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
          accept=".xls, .xlsx, .pdf"
          beforeUpload={() => false}
          onChange={(e) => uploadChanged(e)}
          onRemove={(e) => fileRemoved(e)}
        >
          <div className="form-photo-container ">
            <AiOutlineUpload className="photo-field-upload-icon" />
            <div>{proper.placeholder}</div>
          </div>
        </Upload>
        {fileUrl && <div>file</div>}
      </Form.Item>
    </>
  );
}

export default FormData;
