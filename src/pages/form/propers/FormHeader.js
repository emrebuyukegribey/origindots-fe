import "./FormHeader.css";

function FormHeader({ proper }) {
  return (
    <>
      <div className="form-header-text">{proper.title}</div>
    </>
  );
}

export default FormHeader;
