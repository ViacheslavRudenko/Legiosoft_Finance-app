import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import "./index.scss";

export default function CustomErrorMessage({ name }) {
  return (
    <ErrorMessage name={name}>
      {(message) => (
        <div className="error">
          <i>{message}</i>
        </div>
      )}
    </ErrorMessage>
  );
}

CustomErrorMessage.propTypes = {
  name: PropTypes.string,
};
