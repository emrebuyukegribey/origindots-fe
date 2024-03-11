import { Button, Form, Upload, message } from "antd";
import "./FormItem.css";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { HiOutlinePhoto } from "react-icons/hi2";
import { AiOutlineUpload } from "react-icons/ai";
import { getCurrentDate } from "../PFormUtil";

function FormData({ proper, addValueOnFormValues, formValues }) {
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

  const fileRemoved = (event) => {
    const filteredFiles = files.filter((file) => file !== event);
    setFiles(filteredFiles);
  };

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

  return (
    <>
      <Form.Item
        className="form-input-container"
        label={proper.title}
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
          onChange={(e) => onChange(e)}
          onRemove={(e) => fileRemoved(e)}
          defaultFileList={defaultFileList}
        >
          <div className="form-photo-container ">
            <AiOutlineUpload className="photo-field-upload-icon" />
            <div>{proper.placeholder}</div>
          </div>
          <div className="form-data-description">{proper.description}</div>
        </Upload>
      </Form.Item>
    </>
  );
}

export default FormData;
