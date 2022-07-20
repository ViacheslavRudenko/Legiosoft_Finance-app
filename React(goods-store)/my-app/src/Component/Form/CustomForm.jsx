import NumberFormat from "react-number-format";
import { Field } from "formik";
import CustomErrorMessage from "./CustomErrorMessage";

export default function CustomForm({ formName, text, updateData }) {
  const renderSwitch = () => {
    switch (formName) {
      case "phoneNumber":
        return (
          <NumberFormat
            name={formName}
            id={formName}
            format="(###)###-##-##"
            onValueChange={(values) => {
              updateData(values.value);
            }}
            //allowEmptyFormatting
            mask="_"
            className={"form__input"}
          />
        );
      default:
        return (
          <Field name={formName} id={formName} className={"form__input"} />
        );
    }
  };

  return (
    <>
      <label htmlFor={formName}>{text}</label>
      {renderSwitch()}
      <CustomErrorMessage name={formName} />
    </>
  );
}
