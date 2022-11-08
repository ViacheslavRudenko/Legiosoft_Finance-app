import PropTypes from "prop-types";
import "./index.scss";

export default function CustomInput({
  name,
  formName,
  register,
  formType,
  err,
}) {
  return (
    <>
      <label>{name}</label>
      <input
        className={"form__input"}
        type={formType && formType}
        {...register(formName, err)}
      />
    </>
  );
}

CustomInput.propTypes = {
  name: PropTypes.string,
  formName: PropTypes.string,
  register: PropTypes.func,
  formType: PropTypes.string,
  err: PropTypes.object,
};
