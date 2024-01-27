import "./FormExplanation.css";

function FormExplanation({ proper }) {
  return (
    <>
      <div className="form-explanation-text">{proper.title}</div>
    </>
  );
}

export default FormExplanation;
