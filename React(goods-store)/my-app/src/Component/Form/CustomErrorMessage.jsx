import { ErrorMessage } from "formik";

export default function CustomErrorMessage({ name }) {
  return (
    <ErrorMessage name={name}>
      {(message) => (
        <div className="item__error">
          <i>{message}</i>
        </div>
      )}
    </ErrorMessage>
  );
}
