import { Field } from "formik";
import CustomErrorMessage from "./CustomErrorMessage";

export default function CustomForm({ form }) {
  const { formName, text, typeName } = form;
  return (
    <>
      <label htmlFor={formName}>{text}</label>
      <Field
        type={typeName}
        name={formName}
        id={formName}
        className={"form__input"}
      />
      <CustomErrorMessage name={formName} />
    </>
  );
}
